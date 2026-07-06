// Message Variant Engine — Editorial OS Module 1
// One message. Multiple audiences. Zero inconsistency.

// ============================================
// STATE
// ============================================

const state = {
  apiKey: '',
  campaignType: '',
  masterContent: '',
  hasLockedSections: false,
  lockedContent: '',
  mode: 'persona',
  selectedProfiles: [],
  isGenerating: false,
  variants: [],
  error: null
};

// Profile presets by adaptation mode.
// These are audience archetypes, not brand assumptions — the master
// message you provide is the only source of brand or product context.
const PROFILES = {
  persona: [
    { id: 'gen-z', name: 'Gen Z', description: 'Casual, authentic, meme-aware. Values transparency and social impact.' },
    { id: 'business-exec', name: 'Business Exec', description: 'Time-pressed, ROI-focused. Wants clarity and bottom-line impact.' },
    { id: 'remote-professional', name: 'Remote Professional', description: 'Location-independent, tech-savvy. Values flexibility and autonomy.' },
    { id: 'enterprise-buyer', name: 'Enterprise Buyer', description: 'Risk-averse, process-driven. Needs proof points and compliance.' },
    { id: 'creative-pro', name: 'Creative Pro', description: 'Design-minded, trend-aware. Appreciates craft and originality.' }
  ],
  region: [
    { id: 'apac', name: 'APAC', description: 'Asia-Pacific market. Respectful tone, relationship-focused.' },
    { id: 'latam', name: 'LATAM', description: 'Latin America. Warm, personal, community-oriented.' },
    { id: 'eu-corporate', name: 'EU Corporate', description: 'European Union. GDPR-aware, formal, multilingual considerations.' },
    { id: 'us-press', name: 'US Press', description: 'American media. Direct, news-style, quotable.' },
    { id: 'mena', name: 'MENA', description: 'Middle East & North Africa. Culturally sensitive, formal respect.' }
  ],
  channel: [
    { id: 'internal-comms', name: 'Internal Comms', description: 'Employee audience. Transparent, motivating, context-rich.' },
    { id: 'external-press', name: 'External Press', description: 'Media and journalists. Newsworthy, quotable, factual.' },
    { id: 'employee-update', name: 'Employee Update', description: 'Team announcements. Clear, actionable, supportive tone.' },
    { id: 'customer-facing', name: 'Customer Facing', description: 'End users and clients. Benefit-focused, approachable.' },
    { id: 'investor-relations', name: 'Investor Relations', description: 'Shareholders and analysts. Data-driven, forward-looking.' }
  ]
};

const CAMPAIGN_TYPES = [
  { value: '', label: 'Select campaign type…' },
  { value: 'launch', label: 'Product Launch' },
  { value: 'policy-update', label: 'Policy Update' },
  { value: 'crisis-comms', label: 'Crisis Communications' },
  { value: 'announcement', label: 'Company Announcement' },
  { value: 'internal-update', label: 'Internal Update' },
  { value: 'feature-release', label: 'Feature Release' },
  { value: 'event-promotion', label: 'Event Promotion' },
  { value: 'other', label: 'Other / Custom' }
];

const API_MODEL = 'claude-sonnet-4-6';

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  loadApiKey();
  render();
});

// API key lives in chrome.storage.local only — never synced, never sent
// anywhere except directly to the Anthropic API.
function loadApiKey() {
  chrome.storage.local.get(['claudeApiKey'], (result) => {
    if (result.claudeApiKey) {
      state.apiKey = result.claudeApiKey;
      render();
    }
  });
}

function saveApiKey(key) {
  state.apiKey = key.trim();
  chrome.storage.local.set({ claudeApiKey: state.apiKey });
}

// ============================================
// ACTIONS
// ============================================

function toggleProfile(profileId) {
  const index = state.selectedProfiles.indexOf(profileId);
  if (index > -1) {
    state.selectedProfiles.splice(index, 1);
  } else if (state.selectedProfiles.length < 3) {
    state.selectedProfiles.push(profileId);
  }
  render();
}

function setMode(mode) {
  state.mode = mode;
  state.selectedProfiles = [];
  render();
}

async function copyToClipboard(text, btnId) {
  try {
    await navigator.clipboard.writeText(text);
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.classList.add('copied');
      btn.textContent = 'Copied';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.textContent = 'Copy';
      }, 2000);
    }
  } catch (err) {
    console.error('Copy failed:', err);
  }
}

function downloadVariant(content, profileName) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `variant-${profileName.toLowerCase().replace(/\s+/g, '-')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ============================================
// GENERATION
// ============================================

async function generateVariants() {
  if (!state.apiKey) {
    state.error = 'Add your Anthropic API key to generate variants.';
    render();
    return;
  }
  if (!state.campaignType) {
    state.error = 'Select a campaign type.';
    render();
    return;
  }
  if (!state.masterContent.trim()) {
    state.error = 'Enter your master message.';
    render();
    return;
  }
  if (state.selectedProfiles.length === 0) {
    state.error = 'Select at least one target profile.';
    render();
    return;
  }

  state.isGenerating = true;
  state.error = null;
  state.variants = [];
  render();

  try {
    const profiles = PROFILES[state.mode].filter(p =>
      state.selectedProfiles.includes(p.id)
    );

    const campaignLabel = CAMPAIGN_TYPES.find(c => c.value === state.campaignType)?.label || state.campaignType;
    const modeLabel = state.mode.charAt(0).toUpperCase() + state.mode.slice(1);

    const prompt = buildPrompt(campaignLabel, modeLabel, profiles);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': state.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: API_MODEL,
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    state.variants = parseVariants(content, profiles);
  } catch (error) {
    console.error('Generation error:', error);
    state.error = error.message || 'Generation failed. Check your API key and try again.';
  }

  state.isGenerating = false;
  render();
}

function buildPrompt(campaignType, mode, profiles) {
  const lockedSection = state.hasLockedSections && state.lockedContent
    ? `\n\nLOCKED CONTENT (must appear verbatim in all variants):\n"${state.lockedContent}"`
    : '';

  const profileList = profiles.map(p => `- ${p.name}: ${p.description}`).join('\n');

  return `You are an expert communications strategist. Generate message variants for a ${campaignType} campaign.

MASTER MESSAGE:
"${state.masterContent}"${lockedSection}

VARIANT MODE: ${mode}

TARGET PROFILES:
${profileList}

INSTRUCTIONS:
1. Generate one variant for each target profile listed above
2. Each variant must adapt the master message for that specific ${mode.toLowerCase()}
3. Maintain the core message and facts while adjusting:
   - Tone and voice
   - Emphasis and framing
   - Cultural/contextual references (if regional)
   - Channel-appropriate formatting (if channel mode)
4. ${state.hasLockedSections ? 'IMPORTANT: Include the locked content EXACTLY as written in each variant.' : 'Ensure consistency of key facts across all variants.'}
5. Each variant should be 1-3 paragraphs, ready to use.

OUTPUT FORMAT:
For each profile, output:
[PROFILE_NAME]
[Adapted variant content]

---

Generate the variants now:`;
}

function parseVariants(content, profiles) {
  const variants = [];

  for (const profile of profiles) {
    const regex = new RegExp(`\\[?${profile.name}\\]?[:\\s]*([\\s\\S]*?)(?=\\[?(?:${profiles.map(p => p.name).join('|')})\\]?[:\\s]|------|$)`, 'i');
    const match = content.match(regex);

    if (match && match[1]) {
      variants.push({
        id: profile.id,
        name: profile.name,
        mode: state.mode,
        content: match[1].trim()
      });
    }
  }

  // Fallback: split by delimiters if profile-name parsing failed
  if (variants.length === 0) {
    const sections = content.split(/---+|\n\n\n/);
    profiles.forEach((profile, index) => {
      if (sections[index]) {
        variants.push({
          id: profile.id,
          name: profile.name,
          mode: state.mode,
          content: sections[index].replace(/^\[.*?\]\s*/, '').trim()
        });
      }
    });
  }

  return variants;
}

// ============================================
// RENDER
// ============================================

function render() {
  const root = document.getElementById('root');

  root.innerHTML = `
    <div class="masthead">
      <div class="eyebrow">Editorial OS · Module 1</div>
      <h1>Message Variant Engine</h1>
      <div class="dek">One message. Multiple audiences. Zero inconsistency.</div>
    </div>

    <div class="container">
      <div class="api-section">
        <label for="api-key">Anthropic API key (stored locally on this device)</label>
        <input
          type="password"
          id="api-key"
          placeholder="sk-ant-…"
          value="${escapeAttr(state.apiKey)}"
        >
      </div>

      <div class="section">
        <div class="section-title">Campaign Context <span class="req">required</span></div>
        <label for="campaign-type">Campaign type</label>
        <select id="campaign-type">
          ${CAMPAIGN_TYPES.map(c => `
            <option value="${c.value}" ${state.campaignType === c.value ? 'selected' : ''}>
              ${c.label}
            </option>
          `).join('')}
        </select>
      </div>

      <div class="section">
        <div class="section-title">Master Message</div>
        <label for="master-content">Your core message to adapt</label>
        <textarea
          id="master-content"
          placeholder="Enter your master message. It will be adapted for each selected profile while key facts stay consistent."
        >${escapeHtml(state.masterContent)}</textarea>

        <div class="toggle-row">
          <span class="toggle-label">Has locked sections (legal, compliance)?</span>
          <label class="toggle">
            <input type="checkbox" id="locked-toggle" ${state.hasLockedSections ? 'checked' : ''}>
            <span class="toggle-slider"></span>
          </label>
        </div>

        ${state.hasLockedSections ? `
          <div class="locked-content">
            <label for="locked-content">Locked content (appears verbatim in every variant)</label>
            <textarea
              id="locked-content"
              placeholder="Legal disclaimers, pricing, dates, or compliance text…"
            >${escapeHtml(state.lockedContent)}</textarea>
          </div>
        ` : ''}
      </div>

      <div class="section">
        <div class="section-title">Variant Mode &amp; Targets</div>

        <label>Adaptation mode</label>
        <div class="mode-selector">
          <button class="mode-btn ${state.mode === 'persona' ? 'active' : ''}" data-mode="persona">Persona</button>
          <button class="mode-btn ${state.mode === 'region' ? 'active' : ''}" data-mode="region">Region</button>
          <button class="mode-btn ${state.mode === 'channel' ? 'active' : ''}" data-mode="channel">Channel</button>
        </div>

        <label>Target profiles (up to 3)</label>
        <div class="profile-tags">
          ${PROFILES[state.mode].map(profile => {
            const isSelected = state.selectedProfiles.includes(profile.id);
            const isDisabled = !isSelected && state.selectedProfiles.length >= 3;
            return `
              <button
                class="profile-tag ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}"
                data-profile="${profile.id}"
                title="${escapeAttr(profile.description)}"
                ${isDisabled ? 'disabled' : ''}
              >
                ${profile.name}
              </button>
            `;
          }).join('')}
        </div>
        <div class="hint">${state.selectedProfiles.length}/3 selected · Hover a profile for its description</div>
      </div>

      ${state.error ? `<div class="error-message">${escapeHtml(state.error)}</div>` : ''}

      <button class="generate-btn" id="generate-btn" ${state.isGenerating ? 'disabled' : ''}>
        ${state.isGenerating ? `<span class="spinner"></span> Generating variants…` : `Generate variants`}
      </button>

      ${state.variants.length > 0 ? `
        <div class="results-section">
          <div class="results-header">
            <span class="results-title">Generated Variants</span>
            <span class="results-count">${state.variants.length} variant${state.variants.length > 1 ? 's' : ''}</span>
          </div>

          ${state.variants.map((variant, index) => `
            <div class="variant-card">
              <div class="variant-header">
                <span class="variant-name">${escapeHtml(variant.name)}</span>
                <span class="variant-mode">${escapeHtml(variant.mode)} mode</span>
              </div>
              <div class="variant-content">${escapeHtml(variant.content)}</div>
              <div class="variant-actions">
                <button class="action-btn" id="copy-${index}" data-copy="${index}">Copy</button>
                <button class="action-btn" data-download="${index}">Download</button>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>

    <div class="footer">
      <div class="footer-text">
        Editorial OS · Uses your own Anthropic API key
      </div>
    </div>
  `;

  attachEventListeners();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeAttr(text) {
  return String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

// ============================================
// EVENTS
// ============================================

function attachEventListeners() {
  const apiKeyInput = document.getElementById('api-key');
  if (apiKeyInput) {
    apiKeyInput.addEventListener('change', (e) => saveApiKey(e.target.value));
  }

  const campaignSelect = document.getElementById('campaign-type');
  if (campaignSelect) {
    campaignSelect.addEventListener('change', (e) => {
      state.campaignType = e.target.value;
      state.error = null;
    });
  }

  const masterTextarea = document.getElementById('master-content');
  if (masterTextarea) {
    masterTextarea.addEventListener('input', (e) => {
      state.masterContent = e.target.value;
      state.error = null;
    });
  }

  const lockedToggle = document.getElementById('locked-toggle');
  if (lockedToggle) {
    lockedToggle.addEventListener('change', (e) => {
      state.hasLockedSections = e.target.checked;
      render();
    });
  }

  const lockedTextarea = document.getElementById('locked-content');
  if (lockedTextarea) {
    lockedTextarea.addEventListener('input', (e) => {
      state.lockedContent = e.target.value;
    });
  }

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      setMode(e.target.closest('.mode-btn').dataset.mode);
    });
  });

  document.querySelectorAll('.profile-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      const el = e.target.closest('.profile-tag');
      if (el.dataset.profile && !el.disabled) {
        toggleProfile(el.dataset.profile);
      }
    });
  });

  const generateBtn = document.getElementById('generate-btn');
  if (generateBtn) {
    generateBtn.addEventListener('click', generateVariants);
  }

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.closest('[data-copy]').dataset.copy);
      const variant = state.variants[index];
      if (variant) copyToClipboard(variant.content, `copy-${index}`);
    });
  });

  document.querySelectorAll('[data-download]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.closest('[data-download]').dataset.download);
      const variant = state.variants[index];
      if (variant) downloadVariant(variant.content, variant.name);
    });
  });
}
