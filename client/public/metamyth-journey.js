// metamyth-journey.js

// --- GLOBAL STATE VARIABLES ---
// These hold the user's progress in memory for the current session.

// This object will store the user's validated answers from each stage.
let journeyData = {};
// This object will store the latest LLM validation response for each stage.
let llmResponses = {};

// --- CONSTANTS ---
const STORAGE_KEY = 'metamythProgress';
const stageIdToTitleMap = new Map(window.stages.map(s => [s.id, s.title]));

// --- LOCAL STORAGE & PROGRESS MANAGEMENT ---

/**
 * Saves the user's entire progress to localStorage.
 */
function saveProgress() {
    try {
        const activeStage = document.querySelector('.stage-content.active');
        const lastStageId = activeStage ? activeStage.id : 'intro';
        
        const formInputs = {};
        document.querySelectorAll('textarea[data-field-index]').forEach(textarea => {
            const stageEl = textarea.closest('.stage-content');
            if (!stageEl) return;
            const stageId = stageEl.id;
            const fieldIndex = textarea.dataset.fieldIndex;
            const key = `${stageId}-${fieldIndex}`; // Create a unique key for each field
            if (textarea.value) {
                formInputs[key] = textarea.value;
            }
        });

        const progress = {
            lastStageId: lastStageId,
            journeyData: journeyData,
            formInputs: formInputs,
            llmResponses: llmResponses // Also save the LLM responses
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error("Failed to save progress to localStorage:", error);
    }
}

/**
 * Loads progress from localStorage and repopulates the page.
 */
function loadProgress() {
    try {
        const savedProgress = localStorage.getItem(STORAGE_KEY);
        if (!savedProgress) {
            console.log("No saved progress found.");
            return null;
        }

        const progress = JSON.parse(savedProgress);

        // Restore validated user answers
        if (progress.journeyData) {
            journeyData = progress.journeyData;
        }
        
        // Restore LLM feedback
        if (progress.llmResponses) {
            llmResponses = progress.llmResponses;
        }

        // Restore all typed text into fields
        if (progress.formInputs) {
            Object.keys(progress.formInputs).forEach(key => {
                const [stageId, fieldIndex] = key.split('-');
                const textarea = document.querySelector(`#${stageId} textarea[data-field-index="${fieldIndex}"]`);
                if (textarea) {
                    textarea.value = progress.formInputs[key];
                }
            });
        }

        // Go to the last saved stage
        if (progress.lastStageId) {
            const lastStageIndex = window.stages.findIndex(s => s.id === progress.lastStageId);
            if (lastStageIndex !== -1) {
                window.showStage(lastStageIndex);
            }
        }
        
        console.log("Progress successfully restored.");
        return progress; // Return the loaded progress for further use

    } catch (error) {
        console.error("Failed to load or parse progress from localStorage:", error);
        return null;
    }
}

/**
 * A debounce function to prevent saving on every single keystroke.
 * @param {Function} func The function to debounce.
 * @param {number} delay The delay in milliseconds.
 */
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

  // Check if Developer Mode is active via the global variable
  if (window.METAMYTH_USE_LLM === false) {
    console.log(`Auto-continuing from stage "${stageId}"`);
    const currentIndex = window.stages.findIndex(s => s.id === stageId);
    if (currentIndex !== -1 && currentIndex < window.stages.length - 1) {
        window.showStage(currentIndex + 1);
        saveProgress();
    }
    return;
  }
  
  // --- Standard AI Validation Logic ---
  const stageContainer = document.getElementById(stageId);
  if (!stageContainer) return;

  showLoadingOverlay(); 
  button.disabled = true;
  clearPreviousErrors(stageContainer);

  const responses = [];
  stageContainer.querySelectorAll('textarea[data-field-index]').forEach(textarea => {
    const index = parseInt(textarea.dataset.fieldIndex, 10);
    responses[index] = textarea.value;
  });

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
    
    // Store the latest LLM response for this stage
    llmResponses[stageId] = result;

    if (result.continue === true) {
      journeyData[stageId] = responses; // Catalog the validated data
      const currentIndex = window.stages.findIndex(s => s.id === stageId);
      if (currentIndex !== -1 && currentIndex < window.stages.length - 1) {
        window.showStage(currentIndex + 1);
      }
    } else {
      displayFailureSummary(stageContainer, result.summary);
      highlightInvalidFields(stageContainer, result.invalidIndexes);
      stageContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch (error) {
    displayFailureSummary(stageContainer, `An unexpected error occurred: ${error.message}`);
  } finally {
    hideLoadingOverlay();
    button.disabled = false;
    saveProgress(); // Save progress after every attempt (success or failure)
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
    const textarea = stageContainer.querySelector(`textarea[data-field-index="${index}"]`);
    if (textarea) {
      textarea.classList.add('invalid-field');
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


// --- INITIAL SETUP & EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
  // Load any existing progress first
  const loadedProgress = loadProgress();

  // If there was saved progress, check if the last stage had a validation error and re-display it
  if (loadedProgress && loadedProgress.lastStageId && loadedProgress.llmResponses) {
    const lastResponse = loadedProgress.llmResponses[loadedProgress.lastStageId];
    if (lastResponse && lastResponse.continue === false) {
        const stageContainer = document.getElementById(loadedProgress.lastStageId);
        if (stageContainer) {
            displayFailureSummary(stageContainer, lastResponse.summary);
            highlightInvalidFields(stageContainer, lastResponse.invalidIndexes);
        }
    }
  }

  // Attach the submit handler to all stage submission buttons
  document.querySelectorAll('.stage-submit-button').forEach(button => {
    button.addEventListener('click', handleStageSubmit);
  });

  // Create a debounced version of the saveProgress function
  const debouncedSave = debounce(saveProgress, 500); // Save 500ms after user stops typing

  // Attach an input event listener to all textareas to save drafts
  document.querySelectorAll('textarea[data-field-index]').forEach(textarea => {
      textarea.addEventListener('input', debouncedSave);
  });
});