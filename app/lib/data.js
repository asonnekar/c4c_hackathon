// Sample data to use until a database is implemented

/**
 * @typedef {Object} Flashcard
 * @property {number} id
 * @property {string} question
 * @property {string} option_a
 * @property {string} option_b
 * @property {string} option_c
 * @property {string} option_d
 * @property {string} correct_option
 */

/**
 * @typedef {Object} Review
 * @property {number} id
 * @property {number} user_id
 * @property {number} flashcard_id
 * @property {number} repetition
 * @property {number} interval
 * @property {number} ef
 */

export const flashcards = [
  {
    id: 1,
    question: "What is the capital of France?",
    option_a: "London",
    option_b: "Berlin",
    option_c: "Paris",
    option_d: "Madrid",
    correct_option: "C",
  },
  {
    id: 2,
    question: "What is 2 + 2?",
    option_a: "3",
    option_b: "4",
    option_c: "5",
    option_d: "22",
    correct_option: "B",
  },
  {
    id: 3,
    question: "Which planet is known as the Red Planet?",
    option_a: "Earth",
    option_b: "Venus",
    option_c: "Mars",
    option_d: "Jupiter",
    correct_option: "C",
  },
]

export const reviews = [
  { id: 1, user_id: 1, flashcard_id: 1, repetition: 2, interval: 6, ef: 2.6 },
  { id: 2, user_id: 1, flashcard_id: 2, repetition: 1, interval: 1, ef: 2.5 },
  { id: 3, user_id: 2, flashcard_id: 1, repetition: 3, interval: 15, ef: 2.7 },
  { id: 4, user_id: 2, flashcard_id: 2, repetition: 2, interval: 6, ef: 2.4 },
  { id: 5, user_id: 1, flashcard_id: 3, repetition: 0, interval: 1, ef: 2.5 },
  { id: 6, user_id: 2, flashcard_id: 3, repetition: 1, interval: 1, ef: 2.3 },
]

/**
 * Helper function to get flashcard by ID
 * @param {number} id - The flashcard ID
 * @returns {Flashcard|undefined} The flashcard or undefined if not found
 */
export function getFlashcardById(id) {
  return flashcards.find((card) => card.id === id)
}

/**
 * Helper function to get reviews by user ID
 * @param {number} userId - The user ID
 * @returns {Review[]} Array of reviews for the user
 */
export function getReviewsByUserId(userId) {
  return reviews.filter((review) => review.user_id === userId)
}

