// Define qualification criteria as constants for clarity and easy updates.
const HIGH_VALUE_INVESTMENT_TIERS = ["$15K-50K+", "$5K-15K", "$1K-5K"];
const ACTIVE_WRITER_RESPONSE = "I'm actively writing my story";
const ENTHUSIASTIC_ROLE_RESPONSE = "I feel electric";

// Define response keys as constants to avoid magic numbers in the code.
const QUESTION_KEY_STORY_STATUS = '1';
const QUESTION_KEY_ROLE_FEELING = '2';
const QUESTION_KEY_INVESTMENT = '5';

type Qualification = "calendar" | "discord";
type Responses = Record<string, unknown>;

/**
 * Determines user qualification based on their questionnaire responses.
 * @param responses - The user's answers to the questionnaire.
 * @returns 'calendar' for high-value prospects, 'discord' otherwise.
 */
export function determineQualification(responses: Responses): Qualification {
  const investmentResponse = responses[QUESTION_KEY_INVESTMENT] as string | undefined;
  if (investmentResponse && HIGH_VALUE_INVESTMENT_TIERS.some(tier => investmentResponse.includes(tier))) {
    return "calendar";
  }

  const storyResponse = responses[QUESTION_KEY_STORY_STATUS] as string | undefined;
  if (storyResponse?.includes(ACTIVE_WRITER_RESPONSE)) {
    return "calendar";
  }

  const bodyResponse = responses[QUESTION_KEY_ROLE_FEELING] as string | undefined;
  if (bodyResponse?.includes(ENTHUSIASTIC_ROLE_RESPONSE)) {
    return "calendar";
  }

  return "discord";
}