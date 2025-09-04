// metamyth-journey.js

// --- GLOBAL STATE VARIABLES ---
let journeyData = {};
let llmResponses = {};

// --- CONSTANTS ---
const STORAGE_KEY = 'metamythProgress';
const stageIdToTitleMap = new Map(window.stages.map(s => [s.id, s.title]));

// --- LOCAL STORAGE & PROGRESS MANAGEMENT ---

function saveProgress() {
    try {
        const activeStage = document.querySelector('.stage-content.active');
        const lastStageId = activeStage ? activeStage.id : 'intro';
        
        const formInputs = {};
        document.querySelectorAll('textarea[data-field-index], .compass-input').forEach(input => {
            const stageEl = input.closest('.stage-content');
            if (!stageEl) return;
            const stageId = stageEl.id;
            const fieldIndex = input.dataset.fieldIndex;
            const key = `${stageId}-${fieldIndex}`;
            if (input.value) {
                formInputs[key] = input.value;
            }
        });

        const progress = {
            lastStageId: lastStageId,
            journeyData: journeyData,
            formInputs: formInputs,
            llmResponses: llmResponses
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error("Failed to save progress to localStorage:", error);
    }
}

function loadProgress() {
    try {
        const savedProgress = localStorage.getItem(STORAGE_KEY);
        if (!savedProgress) {
            console.log("No saved progress found.");
            return null;
        }

        const progress = JSON.parse(savedProgress);

        if (progress.journeyData) {
            journeyData = progress.journeyData;
        }
        
        if (progress.llmResponses) {
            llmResponses = progress.llmResponses;
        }

        if (progress.formInputs) {
            Object.keys(progress.formInputs).forEach(key => {
                const [stageId, fieldIndex] = key.split('-');
                const input = document.querySelector(`#${stageId} [data-field-index="${fieldIndex}"]`);
                if (input) {
                    input.value = progress.formInputs[key];
                }
            });
        }

        if (progress.lastStageId) {
            const lastStageIndex = window.stages.findIndex(s => s.id === progress.lastStageId);
            if (lastStageIndex !== -1) {
                window.showStage(lastStageIndex);
            } else {
                window.showStage(0);
            }
        } else {
            window.showStage(0);
        }
        
        console.log("Progress successfully restored.");
        return progress;

    } catch (error) {
        console.error("Failed to load or parse progress from localStorage:", error);
        window.showStage(0);
        return null;
    }
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}


// --- CORE INTERACTION LOGIC ---

async function handleStageSubmit(event) {
  const button = event.target;
  const stageId = button.dataset.stageId;

  if (window.METAMYTH_USE_LLM !== true) {
    console.log(`LLM validation feature not enabled. Auto-continuing from stage "${stageId}".`);
    const currentIndex = window.stages.findIndex(s => s.id === stageId);
    if (currentIndex !== -1 && currentIndex < window.stages.length - 1) {
        window.showStage(currentIndex + 1);
        saveProgress();
    }
    return;
  }
  
  console.log(`LLM validation feature is ON for stage "${stageId}".`);
  const stageContainer = document.getElementById(stageId);
  if (!stageContainer) return;

  showLoadingOverlay(); 
  button.disabled = true;
  clearPreviousErrors(stageContainer);

  const responses = [];
  document.querySelectorAll(`#${stageId} [data-field-index]`).forEach(input => {
    const index = parseInt(input.dataset.fieldIndex, 10);
    responses[index] = input.value;
  });

  if (responses.length === 0) {
      const currentIndex = window.stages.findIndex(s => s.id === stageId);
      if (currentIndex !== -1 && currentIndex < window.stages.length - 1) {
        window.showStage(currentIndex + 1);
      }
      hideLoadingOverlay();
      button.disabled = false;
      saveProgress();
      return;
  }

  const promptTemplateId = button.dataset.promptTemplate || 'prompt-template-standard';
  const context = { stageTitle: stageIdToTitleMap.get(stageId) || stageId };
  const persona = updatePersonaWithTemplate(promptTemplateId, context);
  if (!persona) {
    hideLoadingOverlay();
    button.disabled = false;
    return;
  }
  const payload = { persona, user_input: JSON.stringify(responses) };

  try {
    const result = await sendJsonRequest(VALIDATE_STAGE_ENDPOINT, payload);
    
    llmResponses[stageId] = result;

    if (result.continue === true) {
      journeyData[stageId] = responses;
      const currentIndex = window.stages.findIndex(s => s.id === stageId);
      if (currentIndex !== -1 && currentIndex < window.stages.length - 1) {
        window.showStage(currentIndex + 1);
      }
    } else {
      displayFailureSummary(stageContainer, result.summary);
      highlightInvalidFields(stageContainer, result.invalidIndexes);
      // **SCROLLING FIX**: Removed the unreliable scrollIntoView call from here.
      // The main showStage function now handles all scrolling.
    }
  } catch (error) {
    displayFailureSummary(stageContainer, `An unexpected error occurred: ${error.message}`);
  } finally {
    hideLoadingOverlay();
    button.disabled = false;
    saveProgress();
  }
}


// --- UI HELPER FUNCTIONS ---

function displayFailureSummary(stageContainer, summaryMessage) {
  const summaryElement = stageContainer.querySelector('.stage-summary-error');
  if (summaryElement) {
    summaryElement.textContent = summaryMessage;
    summaryElement.style.display = 'block';
  }
}

function highlightInvalidFields(stageContainer, invalidIndexes = []) {
  invalidIndexes.forEach(index => {
    const input = stageContainer.querySelector(`[data-field-index="${index}"]`);
    if (input) {
      input.classList.add('invalid-field');
    }
  });
}

function clearPreviousErrors(stageContainer) {
  const summaryElement = stageContainer.querySelector('.stage-summary-error');
  if (summaryElement) {
    summaryElement.textContent = '';
    summaryElement.style.display = 'none';
  }
  stageContainer.querySelectorAll('.invalid-field').forEach(el => {
    el.classList.remove('invalid-field');
  });
}

// --- INITIALIZATION FUNCTION ---

function finalizeSetup() {
    document.querySelectorAll('.stage-submit-button').forEach(button => {
        button.addEventListener('click', handleStageSubmit);
    });

    const debouncedSave = debounce(saveProgress, 500);

    document.querySelectorAll('textarea[data-field-index], .compass-input').forEach(input => {
        input.addEventListener('input', debouncedSave);
    });

    if (!loadProgress()) {
        window.showStage(0);
    }
}