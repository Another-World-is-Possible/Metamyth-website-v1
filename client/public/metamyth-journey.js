// --- GLOBAL STATE & UI MAP ---
let journeyData = {};
let llmResponses = {};
let validationConfig = {};
let contentData = {};
let stageIdToTitleMap = new Map();
let compassChart;

const stages = [
    { id: 'intro', title: 'Awaken', arc: 'Preamble', icon: '✨' }, { id: 'origin', title: 'The Origin Story', arc: 'Preamble', icon: '🌱' },
    { id: 'arc1', title: 'ARC I Intro', arc: 'ARC I', icon: '🔔' }, { id: 'dragon', title: 'The Dragon', arc: 'ARC I', icon: '🐉' },
    { id: 'threshold', title: 'The Threshold', arc: 'ARC I', icon: '🌀' }, { id: 'shield', title: 'The Shield', arc: 'ARC I', icon: '🛡️' },
    { id: 'pearl', title: 'The Pearl', arc: 'ARC I', icon: '⚪' }, { id: 'calling_synthesis', title: 'The Calling', arc: 'ARC I', icon: '📣' },
    { id: 'arc2', title: 'ARC II Intro', arc: 'ARC II', icon: '🗺️' }, { id: 'star', title: 'The Star', arc: 'ARC II', icon: '⭐' },
    { id: 'character', title: 'The Character', arc: 'ARC II', icon: '👤' }, { id: 'banner', title: 'The Banner', arc: 'ARC II', icon: '🚩' },
    { id: 'sword', title: 'The Sword', arc: 'ARC II', icon: '⚔️' }, { id: 'quest_synthesis', title: 'The Quest', arc: 'ARC II', icon: '📜' },
    { id: 'arc3', title: 'ARC III Intro', arc: 'ARC III', icon: '🌌' }, { id: 'looking_glass', title: 'The Looking Glass', arc: 'ARC III', icon: '🔮' },
    { id: 'transformation', title: 'The Transformation', arc: 'ARC III', icon: '🦋' }, { id: 'globe', title: 'The Globe', arc: 'ARC III', icon: '🌍' },
    { id: 'map', title: 'The Map', arc: 'ARC III', icon: '🗺️' }, { id: 'vision_synthesis', title: 'The Vision', arc: 'ARC III', icon: '🔭' },
    { id: 'arc4', title: 'ARC IV Intro', arc: 'ARC IV', icon: '👣' }, { id: 'fountain', title: 'The Fountain', arc: 'ARC IV', icon: '⛲' },
    { id: 'ethos', title: 'The Ethos', arc: 'ARC IV', icon: '📜' }, { id: 'plot', title: 'The Road', arc: 'ARC IV', icon: '🛤️' },
    { id: 'compass', title: 'The Compass', arc: 'ARC IV', icon: '🧭' }, { id: 'mission_synthesis', title: 'The Journey', arc: 'ARC IV', icon: '🎯' },
    { id: 'arc5', title: 'ARC V Intro', arc: 'ARC V', icon: '🏡' }, { id: 'grail', title: 'The Grail', arc: 'ARC V', icon: '🏆' },
    { id: 'initiation', title: 'The Initiation', arc: 'ARC V', icon: '🌉' }, { id: 'campfire', title: 'The Campfire', arc: 'ARC V', icon: '🔥' },
    { id: 'message', title: 'The Message', arc: 'ARC V', icon: '📢' }, { id: 'kindred_synthesis', title: 'The Request', arc: 'ARC V', icon: '🌟' },
    { id: 'my_story', title: 'My Story', arc: 'Synthesis', icon: '📖' }, { id: 'legacy', title: 'The Legacy', arc: 'Legacy', icon: '🌅' },
    { id: 'wizard', title: 'The Wizard', arc: 'Integration', icon: '🧙' }, { id: 'activate_wizard', title: 'Activate AI', arc: 'Integration', icon: '🤖' }
];
window.stages = stages;
const STORAGE_KEY = 'metamythProgress';

async function initializeApp() {
    try {
        // Check if config data is injected via window object (for iframe usage)
        if (window.METAMYTH_VALIDATION_CONFIG && window.METAMYTH_JOURNEY_DATA) {
            validationConfig = window.METAMYTH_VALIDATION_CONFIG;
            contentData = window.METAMYTH_JOURNEY_DATA;
        } else {
            // Fallback: fetch from server (for standalone usage)
            const [validationResponse, journeyResponse] = await Promise.all([
                fetch('/metamyth-stage-validation.json'),
                fetch('/metamyth-journey.json')
            ]);
            if (!validationResponse.ok) throw new Error(`Failed to load validation config: ${validationResponse.statusText}`);
            validationConfig = await validationResponse.json();
            if (!journeyResponse.ok) throw new Error(`Failed to load journey content: ${journeyResponse.statusText}`);
            contentData = await journeyResponse.json();
        }
    } catch (error) {
        console.error("Fatal Error: Could not load configuration files.", error);
        document.getElementById('content-container').innerHTML = `<div class="content-card"><h2>Error</h2><p>Could not load journey content.</p></div>`;
        return;
    }
    stageIdToTitleMap = new Map(stages.map(s => [s.id, s.title]));
    finalizeSetup();
}

function finalizeSetup() {
    const navContainer = document.getElementById('nav-container');
    const contentContainer = document.getElementById('content-container');
    let currentArc = '';
    stages.forEach((stage, index) => {
        if (stage.arc && stage.arc !== currentArc) {
            currentArc = stage.arc;
            const arcHeader = document.createElement('h3');
            arcHeader.className = 'nav-arc-header text-lg uppercase mt-6 mb-2 px-4 glow-arc';
            arcHeader.textContent = currentArc;
            navContainer.appendChild(arcHeader);
        }
        const navLink = document.createElement('a');
        navLink.href = '#';
        navLink.id = `nav-${stage.id}`;
        navLink.className = 'nav-link flex items-center rounded-md';
        navLink.innerHTML = `<span class="mr-3">${stage.icon}</span> ${stage.title}`;
        navLink.onclick = (e) => { e.preventDefault(); window.showStage(index); };
        navContainer.appendChild(navLink);
        const stageDiv = document.createElement('div');
        stageDiv.id = stage.id;
        stageDiv.className = 'stage-content';
        stageDiv.innerHTML = generateStageHTML(stage, contentData[stage.id]);
        contentContainer.appendChild(stageDiv);
    });
    
    // Attach main button handlers
    document.querySelectorAll('.stage-continue-button').forEach(button => button.addEventListener('click', handleStageContinue));
    document.querySelectorAll('.measure-resonance-button').forEach(button => button.addEventListener('click', handleMeasureResonance));
    
    // Attach story button handlers
    const storyBtnAction = () => {
        const storyIndex = stages.findIndex(s => s.id === 'my_story');
        if (storyIndex > -1) window.showStage(storyIndex);
    };
    const viewStoryBtn = document.getElementById('view-story-btn');
    if (viewStoryBtn) viewStoryBtn.addEventListener('click', storyBtnAction);
    
    const debouncedSave = debounce(saveProgress, 500);
    document.querySelectorAll('textarea[data-field-index]').forEach(input => input.addEventListener('input', debouncedSave));
    
    // Initialize mobile navigation
    setupMobileNavigation();
    
    if (!loadProgress()) {
        window.showStage(0);
    }
}

// --- CORE LOGIC & EVENT HANDLERS ---
function handleStageContinue(event) {
    const stageId = event.target.dataset.stageId;
    const stageContainer = document.getElementById(stageId);
    if (stageContainer) {
        const responses = [];
        stageContainer.querySelectorAll('textarea[data-field-index]').forEach(input => {
            const index = parseInt(input.dataset.fieldIndex, 10);
            responses[index] = input.value;
        });
        if (responses.length > 0) journeyData[stageId] = responses;
    }
    const currentIndex = stages.findIndex(s => s.id === stageId);
    if (currentIndex !== -1 && currentIndex < stages.length - 1) {
        window.showStage(currentIndex + 1);
        saveProgress();
    }
}
async function handleMeasureResonance(event) {
    const button = event.target;
    const stageId = button.dataset.stageId;
    const stageContainer = document.getElementById(stageId);
    if (!stageContainer) return;
    stageContainer.querySelectorAll('.field-feedback-display').forEach(el => { el.style.display = 'none'; el.textContent = ''; });
    const overallFeedbackEl = stageContainer.querySelector(`#overall-feedback-${stageId}`);
    if (overallFeedbackEl) { overallFeedbackEl.style.display = 'none'; overallFeedbackEl.textContent = ''; }
    showLoadingOverlay();
    button.disabled = true;
    const inputs = Array.from(stageContainer.querySelectorAll('textarea[data-field-index]'));
    const numInputs = inputs.length;
    const currentStageResponses = inputs.map(input => input.value);
    const fullJourneyContext = { ...journeyData, [stageId]: currentStageResponses };
    const userInputForAI = formatContextForAI(fullJourneyContext, stageId, stageIdToTitleMap);
    const modelToUse = validationConfig.model;
    const promptObject = validationConfig.promptTemplates[stageId];
    if (!promptObject || !promptObject.prompt || !modelToUse) {
        displayOverallFeedback(stageContainer, "Validation Error: A prompt for this stage is missing.");
        hideLoadingOverlay();
        button.disabled = false;
        return;
    }
    const systemPrompt = promptObject.prompt;
    const examples = promptObject.examples || [];
    const payload = { stageId, userInput: userInputForAI, systemPrompt, examples, model: modelToUse };
    try {
        const result = await sendJsonRequest(VALIDATE_STAGE_ENDPOINT, payload);
        llmResponses[stageId] = result;
        if (result.overallFeedback) displayOverallFeedback(stageContainer, result.overallFeedback);
        const aiFeedback = result.fieldFeedback || [];
        for (let i = 0; i < numInputs; i++) {
            const fieldEl = stageContainer.querySelector(`#feedback-${stageId}-${i}`);
            let feedbackText = "";
            if (currentStageResponses[i].trim() === '') {
                feedbackText = "This is a space for your reflection. What comes to mind?";
            } else {
                feedbackText = (aiFeedback[i] && typeof aiFeedback[i] === 'string') ? aiFeedback[i] : "MythOS is still reflecting on this point.";
            }
            if (fieldEl) {
                fieldEl.textContent = feedbackText;
                fieldEl.style.display = 'block';
            }
        }
    } catch (error) {
        displayOverallFeedback(stageContainer, `An API error occurred: ${error.message}`);
    } finally {
        hideLoadingOverlay();
        button.disabled = false;
        saveProgress();
    }
}

// --- LOCAL STORAGE & PROGRESS ---
function saveProgress() {
    try {
        const formInputs = {};
        document.querySelectorAll('textarea[data-field-index]').forEach(input => {
            const stageId = input.closest('.stage-content').id;
            const fieldIndex = input.dataset.fieldIndex;
            formInputs[`${stageId}-${fieldIndex}`] = input.value;
        });
        
        // Determine lastStageId: first stage with empty input, or 'intro' if all empty
        let lastStageId = 'intro'; // Default to Awaken stage
        
        // First pass: check if ANY textarea has content
        let hasAnyInput = false;
        document.querySelectorAll('textarea[data-field-index]').forEach(input => {
            if (input.value.trim() !== '') {
                hasAnyInput = true;
            }
        });
        
        // Second pass: find first stage with empty fields (if any input exists)
        if (hasAnyInput) {
            for (const stage of stages) {
                const stageInputs = document.querySelectorAll(`#${stage.id} textarea[data-field-index]`);
                if (stageInputs.length === 0) continue; // Skip stages without textareas
                
                let hasEmptyField = false;
                stageInputs.forEach(input => {
                    if (input.value.trim() === '') {
                        hasEmptyField = true;
                    }
                });
                
                // Found first stage with at least one empty field
                if (hasEmptyField) {
                    lastStageId = stage.id;
                    break;
                }
                
                // If all fields filled in this stage, it could be the last stage
                lastStageId = stage.id;
            }
        }
        
        const feedbackContents = {};
        document.querySelectorAll('.feedback-container, .field-feedback-display').forEach(el => {
            if (el.style.display !== 'none' && el.textContent) {
                feedbackContents[el.id] = el.innerHTML;
            }
        });
        const progress = { lastStageId, journeyData, formInputs, llmResponses, feedbackContents };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) { console.error("Failed to save progress:", error); }
}

function loadProgress() {
    try {
        const savedProgress = localStorage.getItem(STORAGE_KEY);
        if (!savedProgress) return null;
        const progress = JSON.parse(savedProgress);
        journeyData = progress.journeyData || {};
        llmResponses = progress.llmResponses || {};
        if (progress.formInputs) {
            Object.keys(progress.formInputs).forEach(key => {
                const [stageId, fieldIndex] = key.split('-');
                const input = document.querySelector(`#${stageId} [data-field-index="${fieldIndex}"]`);
                if (input) input.value = progress.formInputs[key];
            });
        }
        if (progress.feedbackContents) {
            Object.keys(progress.feedbackContents).forEach(id => {
                const el = document.getElementById(id);
                if (el) { el.innerHTML = progress.feedbackContents[id]; el.style.display = 'block'; }
            });
        }
        const lastStageIndex = stages.findIndex(s => s.id === progress.lastStageId);
        window.showStage(lastStageIndex !== -1 ? lastStageIndex : 0);
        return progress;
    } catch (error) {
        console.error("Failed to load progress:", error);
        window.showStage(0);
        return null;
    }
}

// --- UI RENDERING & HELPERS ---
function formatContextForAI(fullJourneyContext, currentStageId, stageMap) {
    let formattedText = "--- User's Journey So Far ---\n\n";
    for (const stageId in fullJourneyContext) {
        if (stageId !== currentStageId && Array.isArray(fullJourneyContext[stageId])) {
            const stageTitle = stageMap.get(stageId) || stageId;
            const answers = fullJourneyContext[stageId];
            if (answers.some(ans => ans && ans.trim() !== '')) {
                formattedText += `**${stageTitle}**:\n`;
                answers.forEach((answer, index) => {
                    if (answer && answer.trim() !== '') formattedText += `${index + 1}. ${answer}\n`;
                });
                formattedText += "\n";
            }
        }
    }
    const currentStageTitle = stageMap.get(currentStageId) || currentStageId;
    const currentAnswers = fullJourneyContext[currentStageId] || [];
    formattedText += `--- Current Stage For Review: ${currentStageTitle} ---\n`;
    currentAnswers.forEach((answer, index) => {
        const text = (answer && answer.trim() !== '') ? answer : '[This field was left empty]';
        formattedText += `${index + 1}. ${text}\n`;
    });
    return formattedText;
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function displayOverallFeedback(stageContainer, message) {
  const feedbackEl = stageContainer.querySelector(`#overall-feedback-${stageContainer.id}`);
  if (feedbackEl) {
    feedbackEl.textContent = message;
    feedbackEl.style.display = 'block';
  }
}

function generateStageHTML(stage, content) {
    if (!content) return `<div class="content-card"><h2 class="text-4xl text-center glow-title">${stage.title}</h2><p>Content for this stage is missing.</p></div>`;
    const buttonText = content.buttonText || 'Continue';

    // This block for the 'intro' page is correct and complete.
    if (stage.id === 'intro') {
        const proseHTML = (content.prose || []).map(p => `<p class="text-lg">${p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`).join('');
        const calloutProse = (content.callout?.prose || []).map((p, i) => {
            if (i === 2) return `<p class="text-center text-2xl font-bold text-gold mt-4">${p}</p>`;
            if (i === 3) return `<p class="text-center mt-4 text-lg">${p}</p>`;
            if (i === 1) return `<p class="mt-4">${p}</p>`;
            return `<p>${p}</p>`;
        }).join('');
        const calloutHTML = content.callout ? `<div class="bg-black bg-opacity-30 border border-yellow-400 rounded-lg p-6 mt-8"><h3 class="text-2xl mb-4 text-gold">${content.callout.title}</h3>${calloutProse}</div>` : '';
        return `<div class="content-card">
            <div class="text-center">
                <h1 class="text-5xl mb-2 text-gold text-center glow-title">${content.title}</h1>
                <h2 class="text-2xl mb-4 text-white text-center">${content.subtitle}</h2>
                <p class="text-lg text-gold mb-2 text-center">${content.tagline}</p>
                <div class="mt-8 text-center">
                    <h3 class="text-4xl mb-4 text-gold glow-title">${content.header}</h3>
                    <p class="text-xl mb-6 text-white">${content.prompt}</p>
                </div>
            </div>
            <div class="prose max-w-none mx-auto mt-8">${proseHTML}${calloutHTML}</div>
            <div class="text-center mt-10">
                <button class="cta-button-base cta-button-teal stage-continue-button" data-stage-id="${stage.id}">${buttonText}</button>
            </div>
        </div>`;
    }

    // This block for the 'my_story' page is correct and complete.
    if (stage.id === 'my_story') {
         return `<div class="content-card"><div class="flex items-center mb-6"><span class="artifiction-icon">${stage.icon}</span><h2 class="text-4xl glow-title">${content.title || 'My Metamyth Story'}</h2></div><div class="prose max-w-none mb-8"><p>${content.prose}</p></div><div class="space-y-6"><button id="generate-story-btn" class="cta-button-base cta-button-gold mb-6">${content.generateButtonText}</button><div id="compiled-story" class="bg-black bg-opacity-30 border border-teal-400 rounded-lg p-6 min-h-[24rem]"><div class="text-center text-gray-400 italic">${content.initialText}</div></div><div class="text-center mt-6"><button id="export-story-btn" class="cta-button-base cta-button-teal" style="display: none;">${content.exportButtonText}</button></div></div><div class="text-center mt-10"><button class="cta-button-base cta-button-teal stage-continue-button" data-stage-id="${stage.id}">${buttonText}</button></div></div>`;
    }
    
    // --- CORRECTED DEFAULT TEMPLATE FOR ALL OTHER STAGES ---
    const hasFields = content.fields && content.fields.length > 0;
    const hasSynthesis = !!content.synthesis;

    if (stage.id === 'compass') {
        const pointsHTML = (content.points || []).map((point, index) => `
            <div>
                <label class="font-semibold text-lg block mb-2 text-gold">${point.label}</label>
                <p class="text-sm italic mb-3">${point.prompt}</p>
                <input type="range" min="1" max="10" value="5" id="compass-input-${index}" class="w-full compass-input" data-field-index="${index}">
                <div class="flex justify-between text-xs text-slate-400 mt-1">
                    <span>1</span>
                    <span>10</span>
                </div>
            </div>
        `).join('<div class="ornamental-divider"></div>');

        const themeColor = content.synthesis?.themeColor || 'gold';
        const borderColorClass = themeColor === 'teal' ? 'border-teal-400' : `border-${themeColor}`;
        const textColorClass = themeColor === 'teal' ? 'text-teal-400' : `text-${themeColor}`;
        const synthesisHTML = content.synthesis ? `<div class="synthesis-box mt-8 ${borderColorClass}"><label class="font-semibold text-lg block mb-2 ${textColorClass}">${content.synthesis.label}</label><p class="text-sm mb-3 italic">${content.synthesis.prompt}</p><textarea data-field-index="${(content.points || []).length}" rows="4" placeholder="${content.synthesis.placeholder || 'Synthesize your thoughts here...'}"></textarea><div class="field-feedback-display" id="feedback-${stage.id}-${(content.points || []).length}"></div></div>` : '';

        const resonanceButtonHTML = window.SHOW_RESONANCE ? `<button class="cta-button-base cta-button-gold measure-resonance-button" data-stage-id="${stage.id}">Measure Resonance</button>` : '';

        return `<div class="content-card"><h2 class="text-4xl text-center mb-4 glow-title"><span class="artifiction-icon">${stage.icon}</span>${content.title}</h2><div class="prose text-center max-w-none mb-8"><p class="text-lg font-semibold">${content.prose}</p></div><div class="ornamental-divider"></div><div class="flex flex-wrap -mx-4"><div class="w-full lg:w-1/2 px-4 space-y-8">${pointsHTML}</div><div class="w-full lg:w-1/2 px-4 flex items-center justify-center"><div class="chart-container relative w-full max-w-md mx-auto"><canvas id="compassChart"></canvas></div></div></div>${synthesisHTML}<div class="feedback-container" id="overall-feedback-${stage.id}" style="display: none;"></div><div class="text-center mt-10 flex flex-col sm:flex-row justify-center items-center">${resonanceButtonHTML}<button class="cta-button-base cta-button-teal stage-continue-button" data-stage-id="${stage.id}">${content.buttonText || 'Continue'}</button></div></div>`;
    }

    const isValidationStage = hasFields || hasSynthesis;

    // This prose/subtitle is now correctly styled with the default text color (not gold).
    const proseHTML = `<div class="prose text-center max-w-none mb-8"><p class="text-lg font-semibold">${Array.isArray(content.prose) ? content.prose.join('</p><p>') : content.prose || ''}</p></div>`;
    
    let fieldsHTML = '';
    if (hasFields) {
        // FIXED: Added 'text-yellow-400' class to the question labels
        fieldsHTML = (content.fields || []).map((field, index) => `
            <div>
                <label class="font-semibold text-lg block mb-2 text-gold">${field.label}</label>
                <p class="text-sm mb-3 italic">${field.prompt || ''}</p>
                <textarea data-field-index="${index}" rows="4" placeholder="${field.placeholder || 'Your reflections...'}"></textarea>
                <div class="field-feedback-display" id="feedback-${stage.id}-${index}"></div>
            </div>
        `).join('<div class="ornamental-divider"></div>');
    }

    let synthesisHTML = '';
    if (hasSynthesis) {
        const synthesisIndex = hasFields ? content.fields.length : 0;
        const themeColor = content.synthesis.themeColor || 'gold';
        const borderColorClass = themeColor === 'teal' ? 'border-teal-400' : `border-${themeColor}`;
        const textColorClass = themeColor === 'teal' ? 'text-teal-400' : `text-${themeColor}`;

        synthesisHTML = `
            <div class="synthesis-box mt-8 ${borderColorClass}">
                <label class="font-semibold text-lg block mb-2 ${textColorClass}">${content.synthesis.label}</label>
                <p class="text-sm mb-3 italic">${content.synthesis.prompt || ''}</p>
                <textarea data-field-index="${synthesisIndex}" rows="6" placeholder="${content.synthesis.placeholder || 'Synthesize your thoughts here...'}"></textarea>
                <div class="field-feedback-display" id="feedback-${stage.id}-${synthesisIndex}"></div>
            </div>`;
    }

    let buttonsHTML = '';
    if (isValidationStage) {
        const resonanceButtonHTML = window.SHOW_RESONANCE ? `<button class="cta-button-base cta-button-gold measure-resonance-button" data-stage-id="${stage.id}">Measure Resonance</button>` : '';
        buttonsHTML = `
            <div class="feedback-container" id="overall-feedback-${stage.id}" style="display: none;"></div>
            <div class="text-center mt-10 flex flex-col sm:flex-row justify-center items-center">
                ${resonanceButtonHTML}
                <button class="cta-button-base cta-button-teal stage-continue-button" data-stage-id="${stage.id}">
                    ${content.buttonText || 'Continue'}
                </button>
            </div>
        `;
    } else {
        buttonsHTML = `
            <div class="text-center mt-10">
                <button class="cta-button-base cta-button-teal stage-continue-button" data-stage-id="${stage.id}">
                    ${buttonText}
                </button>
            </div>
        `;
    }
    
    return `
        <div class="content-card">
            <h2 class="text-4xl text-center mb-4 glow-title"><span class="artifiction-icon">${stage.icon || '🔹'}</span>${content.title}</h2>
            ${content.subtitle ? `<p class="text-lg font-semibold text-gold text-center">${content.subtitle}</p>` : ''}${proseHTML}
            ${content.header ? `<h3 class="text-xl mt-6 text-gold">${content.header}</h3>` : ''}
            <div class="ornamental-divider"></div>
            <div class="space-y-8">${fieldsHTML}</div>
            ${synthesisHTML}
            ${buttonsHTML}
        </div>
    `;
}

function showStage(index) {
    document.querySelectorAll('.stage-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    const stage = stages[index];
    if (!stage) return;
    const stageEl = document.getElementById(stage.id);
    if (stageEl) stageEl.classList.add('active');
    const navEl = document.getElementById(`nav-${stage.id}`);
    if (navEl) navEl.classList.add('active');
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update mobile navigation
    updateMobileProgress(index);
    updateProgressBar(index);
    updateArtifactIndicator(stage, index);
    if (stage.id === 'compass') setTimeout(initializeCompass, 100);
    if (stage.id === 'my_story') setTimeout(initializeStoryGeneration, 100);
}

function updateProgressBar(currentIndex) {
    const progressPercentage = `${Math.round(((currentIndex + 1) / stages.length) * 100)}%`;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) progressBar.style.width = progressPercentage;
}

function updateArtifactIndicator(currentStage, index) {
    const progressText = `${index + 1}/${stages.length} Complete`;
    const iconEl = document.getElementById('current-artifact-icon');
    const titleEl = document.getElementById('current-artifact-title');
    const progressEl = document.getElementById('current-progress');
    if (iconEl) iconEl.textContent = currentStage.icon;
    if (titleEl) titleEl.textContent = currentStage.title;
    if (progressEl) progressEl.textContent = progressText;
}

function initializeCompass() { 
    initializeCompassChart(); 
    document.querySelectorAll('.compass-input').forEach(input => {
        input.removeEventListener('input', updateCompassChart);
        input.addEventListener('input', updateCompassChart);
    });
}

function initializeCompassChart() { 
    const ctx = document.getElementById('compassChart'); 
    if (!ctx) return; 
    if (compassChart) compassChart.destroy(); 
    const labels = (contentData.compass?.points || []).map(p => p.label); 
    const data = labels.map((_, index) => {
        const input = document.getElementById(`compass-input-${index}`);
        return input ? parseInt(input.value) : 5;
    });
    compassChart = new Chart(ctx, {type: 'radar', data: { labels: labels, datasets: [{ label: 'Alignment', data: data, borderColor: 'var(--accent-teal)', backgroundColor: 'rgba(20, 184, 166, 0.2)' }] }, options: { scales: { r: { min: 0, max: 10, ticks: { display: false } } }, plugins: { legend: { display: false } } } });
}

function updateCompassChart() { 
    if (!compassChart) return; 
    compassChart.data.datasets[0].data = compassChart.data.labels.map((_, index) => parseInt(document.getElementById(`compass-input-${index}`)?.value || '5')); 
    compassChart.update();
}

function initializeStoryGeneration() { 
    const generateBtn = document.getElementById('generate-story-btn'); 
    const exportBtn = document.getElementById('export-story-btn'); 
    const storyContainer = document.getElementById('compiled-story'); 
    if (generateBtn) generateBtn.onclick = () => { 
        storyContainer.innerHTML = generateCompleteStory(); 
        if(exportBtn) exportBtn.style.display = 'inline-block'; 
    }; 
    if (exportBtn) exportBtn.onclick = () => { 
        const blob = new Blob([storyContainer.innerText], { type: 'text/plain;charset=utf-8' }); 
        const url = URL.createObjectURL(blob); 
        const a = document.createElement('a'); 
        a.href = url; a.download = 'my-metamyth-story.txt'; 
        document.body.appendChild(a); 
        a.click(); 
        document.body.removeChild(a); 
        URL.revokeObjectURL(url); 
    }; 
}

function generateCompleteStory() { 
    const synthesisOrder = ['origin', 'calling_synthesis', 'quest_synthesis', 'vision_synthesis', 'mission_synthesis', 'kindred_synthesis', 'legacy']; 
    let storyHtml = `<div class="prose max-w-none text-left"><h3 class="text-3xl text-gold">${contentData.my_story.title}</h3>`;
    let contentAdded = false; 
    synthesisOrder.forEach(stageId => { 
        const stageContent = contentData[stageId]; 
        const stageData = window.journeyData?.[stageId]; 
        if (stageContent?.synthesis && stageData) { 
            const synthesisText = stageData[stageData.length - 1]; 
            if (synthesisText?.trim()) { 
                storyHtml += `<h4 class="text-2xl mt-8 text-teal-400">${stageContent.synthesis.label}</h4><p class="border-l-4 border-gold pl-4 py-2 bg-black/20">${synthesisText.replace(/\n/g, '<br>')}</p>`; 
                contentAdded = true; 
            } 
        } 
    }); 
    if (!contentAdded) {
        storyHtml += `<p class="italic text-gray-400 mt-4">${contentData.my_story.initialText}</p>`;
    }
    return storyHtml + '</div>'; 
}

// --- MOBILE NAVIGATION ---
function setupMobileNavigation() {
    const mobileBottomBar = document.getElementById('mobile-bottom-bar');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    
    if (!mobileBottomBar || !mobileMenuOverlay) return;
    
    // Populate mobile bottom bar with progress info and menu button
    mobileBottomBar.innerHTML = `
        <div class="flex items-center justify-between max-w-md mx-auto">
            <div class="flex items-center gap-2">
                <span id="mobile-current-icon" class="text-lg">✨</span>
                <div class="flex flex-col">
                    <span id="mobile-current-title" class="text-sm text-white font-semibold">Awaken</span>
                    <span id="mobile-progress-text" class="text-xs text-gray-400">1/${stages.length}</span>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <button id="mobile-story-btn" class="bg-transparent border border-gold text-gold text-xs py-1 px-3 rounded-full hover:bg-gold hover:text-black transition-all">
                    📖 Story
                </button>
                <button id="mobile-menu-btn" class="bg-teal-600 hover:bg-teal-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl transition-all">
                    ☰
                </button>
            </div>
        </div>
    `;
    
    // Populate mobile menu overlay
    mobileMenuOverlay.innerHTML = `
        <div class="flex items-center justify-between mb-4 pb-4 border-b border-teal-400/30">
            <h3 class="text-xl text-gold font-angle">Journey Navigation</h3>
            <button id="mobile-menu-close" class="text-white text-2xl hover:text-gold transition-colors">✕</button>
        </div>
        <div class="flex-1 overflow-y-auto">
            <div id="mobile-nav-container" class="space-y-1"></div>
        </div>
        <div class="mt-4 pt-4 border-t border-teal-400/30">
            <div class="w-full bg-gray-700 rounded-full h-2">
                <div id="mobile-progress-bar" class="h-2 rounded-full glow-progress" style="width: 0%"></div>
            </div>
            <p id="mobile-full-progress" class="text-xs text-gray-400 mt-2 text-center">1/${stages.length} Complete</p>
        </div>
    `;
    
    // Build mobile navigation links
    const mobileNavContainer = document.getElementById('mobile-nav-container');
    let currentArc = '';
    stages.forEach((stage, index) => {
        if (stage.arc && stage.arc !== currentArc) {
            currentArc = stage.arc;
            const arcHeader = document.createElement('h4');
            arcHeader.className = 'nav-arc-header text-sm uppercase mt-4 mb-2 px-2 glow-arc';
            arcHeader.textContent = currentArc;
            mobileNavContainer.appendChild(arcHeader);
        }
        const navLink = document.createElement('a');
        navLink.href = '#';
        navLink.id = `mobile-nav-${stage.id}`;
        navLink.className = 'nav-link flex items-center rounded-md text-sm py-2';
        navLink.innerHTML = `<span class="mr-2">${stage.icon}</span> ${stage.title}`;
        navLink.onclick = (e) => {
            e.preventDefault();
            window.showStage(index);
            toggleMobileMenu(false);
        };
        mobileNavContainer.appendChild(navLink);
    });
    
    // Toggle handlers
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('mobile-menu-close');
    const storyBtn = document.getElementById('mobile-story-btn');
    
    if (menuBtn) menuBtn.addEventListener('click', () => toggleMobileMenu(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleMobileMenu(false));
    if (storyBtn) storyBtn.addEventListener('click', () => {
        const storyIndex = stages.findIndex(s => s.id === 'my_story');
        if (storyIndex > -1) window.showStage(storyIndex);
    });
}

function toggleMobileMenu(show) {
    const overlay = document.getElementById('mobile-menu-overlay');
    if (!overlay) return;
    
    if (show) {
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function updateMobileProgress(index) {
    const stage = stages[index];
    if (!stage) return;
    
    const mobileIcon = document.getElementById('mobile-current-icon');
    const mobileTitle = document.getElementById('mobile-current-title');
    const mobileProgressText = document.getElementById('mobile-progress-text');
    const mobileProgressBar = document.getElementById('mobile-progress-bar');
    const mobileFullProgress = document.getElementById('mobile-full-progress');
    
    if (mobileIcon) mobileIcon.textContent = stage.icon;
    if (mobileTitle) mobileTitle.textContent = stage.title;
    if (mobileProgressText) mobileProgressText.textContent = `${index + 1}/${stages.length}`;
    
    const progressPercent = `${Math.round(((index + 1) / stages.length) * 100)}%`;
    if (mobileProgressBar) mobileProgressBar.style.width = progressPercent;
    if (mobileFullProgress) mobileFullProgress.textContent = `${index + 1}/${stages.length} Complete`;
    
    // Update active state in mobile nav
    document.querySelectorAll('[id^="mobile-nav-"]').forEach(el => el.classList.remove('active'));
    const mobileNavEl = document.getElementById(`mobile-nav-${stage.id}`);
    if (mobileNavEl) mobileNavEl.classList.add('active');
}

// --- START THE APPLICATION ---
initializeApp();