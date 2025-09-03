// metamyth-journey.js

// This object will store the user's validated answers from each stage
let journeyData = {};

// This map allows us to find a stage's title using its ID for the prompt
const stageIdToTitleMap = new Map(window.stages.map(s => [s.id, s.title]));


// --- LOCAL STORAGE & PROGRESS MANAGEMENT ---

const STORAGE_KEY = 'metamythProgress';

/**
 * Saves the user's entire progress to localStorage.
 */
function saveProgress() {
    try {
        // Collect current state
        const activeStage = document.querySelector('.stage-content.active');
        const lastStageId = activeStage ? activeStage.id : 'intro';
        
        const formInputs = {};
        document.querySelectorAll('textarea[data-field-index]').forEach(textarea => {
            const stageId = textarea.closest('.stage-content').id;
            const fieldIndex = textarea.dataset.fieldIndex;
            const key = `${stageId}-${fieldIndex}`; // Create a unique key
            if (textarea.value) {
                formInputs[key] = textarea.value;
            }
        });

        const progress = {
            lastStageId: lastStageId,
            journeyData: journeyData,
            formInputs: formInputs,
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
            return;
        }

        const progress = JSON.parse(savedProgress);

        // Restore validated data
        if (progress.journeyData) {
            journeyData = progress.journeyData;
        }

        // Restore all typed text
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

    } catch (error) {
        console.error("Failed to load or parse progress from localStorage:", error);
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
  const promptTemplateId = button.dataset.promptTemplate || 'prompt-template-standard';

  // For the intro "button", it's not a real submission, just a transition.
  if (stageId === 'intro') {
      window.showStage(1);
      saveProgress(); // Save that we've moved to stage 1
      return;
  }
  
  const stageContainer = document.getElementById(stageId);
  if (!stageContainer) return;

  // Use helper function from chatbot.js
  showLoadingOverlay(); 
  button.disabled = true;
  clearPreviousErrors(stageContainer);

  const responses = [];
  stageContainer.querySelectorAll('textarea[data-field-index]').forEach(textarea => {
    const index = parseInt(textarea.dataset.fieldIndex, 10);
    responses[index] = textarea.value;
  });

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

    if (result.continue === true) {
      journeyData[stageId] = responses; // Catalog the validated data
      const currentIndex = window.stages.findIndex(s => s.id === stageId);
      if (currentIndex !== -1 && currentIndex < window.stages.length - 1) {
        window.showStage(currentIndex + 1);
        saveProgress(); // Save progress after successful transition
      }
    } else {
      displayFailureSummary(stageContainer, result.summary);
      highlightInvalidFields(stageContainer, result.invalidIndexes);
      stageContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch (error) {
    displayFailureSummary(stageContainer, `An unexpected error occurred: ${error.message}`);
  } finally {
    hideLoadingOverlay(); // Use helper function from chatbot.js
    button.disabled = false;
  }
}

// ... (displayFailureSummary, highlightInvalidFields, clearPreviousErrors functions remain the same) ...
function displayFailureSummary(stageContainer, summaryMessage) { /* ... */ }
function highlightInvalidFields(stageContainer, invalidIndexes = []) { /* ... */ }
function clearPreviousErrors(stageContainer) { /* ... */ }


// --- INITIAL SETUP & EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
  // Load any existing progress first
  loadProgress();

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