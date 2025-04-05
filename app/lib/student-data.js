// Sample data for students, topics, and progress

/**
 * @typedef {Object} Student
 * @property {string} id - UUID
 * @property {string} name
 * @property {string} email
 */

/**
 * @typedef {Object} Topic
 * @property {number} id
 * @property {string} name
 * @property {string} description
 */

/**
 * @typedef {Object} StudentTopicProgress
 * @property {string} id - UUID
 * @property {string} student_id - UUID
 * @property {number} topic_id
 * @property {number} ease_factor
 * @property {number} interval
 * @property {number} repetition_number
 * @property {string} last_review_date - ISO date string
 * @property {string} next_review_date - ISO date string
 */

// Topics data - Data Structures & Algorithms
export const topics = [
  { id: 1, name: "Stack", description: "LIFO data structure" },
  { id: 2, name: "Queue", description: "FIFO data structure" },
  { id: 3, name: "Heap", description: "Tree-based data structure" },
  { id: 4, name: "Linked List", description: "Linear data structure" },
  { id: 5, name: "Tree", description: "Hierarchical data structure" },
];

// Students data
export const students = [
  {
    id: "8a7d1a57-eabd-4a25-bf26-8aebd4c78b9a",
    name: "John Smith",
    email: "smith_john@olsd.us",
  },
  {
    id: "6b9c2b47-da1c-4b35-af25-7ac9d5d78c8b",
    name: "Sarah Johnson",
    email: "johnson_sarah@olsd.us",
  },
  {
    id: "5c8d3a37-cb2d-4c45-be35-6bad6e78d7c",
    name: "Michael Chen",
    email: "chen_michael@olsd.us",
  },
  {
    id: "4d7e4a27-db3e-4d55-cf45-5cbe7f78d6d",
    name: "Emma Wilson",
    email: "wilson_emma@olsd.us",
  },
  {
    id: "3e6f5a17-ec4f-4e65-df55-4dcf8f78e5e",
    name: "David Garcia",
    email: "garcia_david@olsd.us",
  },
];

// Student progress data
export const studentTopicProgress = [
  // John Smith
  {
    id: "aa1d1b27-fa1d-4a15-af16-1aebd4c18b1a",
    student_id: "8a7d1a57-eabd-4a25-bf26-8aebd4c78b9a",
    topic_id: 1,
    ease_factor: 4.2,
    interval: 15,
    repetition_number: 5,
    last_review_date: "2023-03-15",
    next_review_date: "2023-03-30",
  },
  {
    id: "ab2d2b27-fa2d-4a25-af26-2aebd4c28b2a",
    student_id: "8a7d1a57-eabd-4a25-bf26-8aebd4c78b9a",
    topic_id: 2,
    ease_factor: 3.1,
    interval: 10,
    repetition_number: 4,
    last_review_date: "2023-03-18",
    next_review_date: "2023-03-28",
  },
  {
    id: "ac3d3b27-fa3d-4a35-af36-3aebd4c38b3a",
    student_id: "8a7d1a57-eabd-4a25-bf26-8aebd4c78b9a",
    topic_id: 3,
    ease_factor: 2.3,
    interval: 5,
    repetition_number: 2,
    last_review_date: "2023-03-20",
    next_review_date: "2023-03-25",
  },
  {
    id: "ad4d4b27-fa4d-4a45-af46-4aebd4c48b4a",
    student_id: "8a7d1a57-eabd-4a25-bf26-8aebd4c78b9a",
    topic_id: 4,
    ease_factor: 1.7,
    interval: 3,
    repetition_number: 1,
    last_review_date: "2023-03-22",
    next_review_date: "2023-03-25",
  },
  {
    id: "ae5d5b27-fa5d-4a55-af56-5aebd4c58b5a",
    student_id: "8a7d1a57-eabd-4a25-bf26-8aebd4c78b9a",
    topic_id: 5,
    ease_factor: 1.1,
    interval: 1,
    repetition_number: 0,
    last_review_date: "2023-03-24",
    next_review_date: "2023-03-25",
  },

  // Sarah Johnson
  {
    id: "ba1d1b27-fa1d-4a15-bf16-1bebd4c18b1b",
    student_id: "6b9c2b47-da1c-4b35-af25-7ac9d5d78c8b",
    topic_id: 1,
    ease_factor: 3.8,
    interval: 12,
    repetition_number: 4,
    last_review_date: "2023-03-15",
    next_review_date: "2023-03-27",
  },
  {
    id: "bb2d2b27-fa2d-4a25-bf26-2bebd4c28b2b",
    student_id: "6b9c2b47-da1c-4b35-af25-7ac9d5d78c8b",
    topic_id: 2,
    ease_factor: 4.5,
    interval: 18,
    repetition_number: 6,
    last_review_date: "2023-03-10",
    next_review_date: "2023-03-28",
  },
  {
    id: "bc3d3b27-fa3d-4a35-bf36-3bebd4c38b3b",
    student_id: "6b9c2b47-da1c-4b35-af25-7ac9d5d78c8b",
    topic_id: 3,
    ease_factor: 2.9,
    interval: 8,
    repetition_number: 3,
    last_review_date: "2023-03-18",
    next_review_date: "2023-03-26",
  },
  {
    id: "bd4d4b27-fa4d-4a45-bf46-4bebd4c48b4b",
    student_id: "6b9c2b47-da1c-4b35-af25-7ac9d5d78c8b",
    topic_id: 4,
    ease_factor: 2.1,
    interval: 4,
    repetition_number: 2,
    last_review_date: "2023-03-22",
    next_review_date: "2023-03-26",
  },
  {
    id: "be5d5b27-fa5d-4a55-bf56-5bebd4c58b5b",
    student_id: "6b9c2b47-da1c-4b35-af25-7ac9d5d78c8b",
    topic_id: 5,
    ease_factor: 1.9,
    interval: 3,
    repetition_number: 1,
    last_review_date: "2023-03-23",
    next_review_date: "2023-03-26",
  },

  // Michael Chen
  {
    id: "ca1d1b27-fa1d-4a15-cf16-1cebd4c18b1c",
    student_id: "5c8d3a37-cb2d-4c45-be35-6bad6e78d7c",
    topic_id: 1,
    ease_factor: 1.8,
    interval: 3,
    repetition_number: 1,
    last_review_date: "2023-03-22",
    next_review_date: "2023-03-25",
  },
  {
    id: "cb2d2b27-fa2d-4a25-cf26-2cebd4c28b2c",
    student_id: "5c8d3a37-cb2d-4c45-be35-6bad6e78d7c",
    topic_id: 2,
    ease_factor: 2.0,
    interval: 4,
    repetition_number: 2,
    last_review_date: "2023-03-21",
    next_review_date: "2023-03-25",
  },
  {
    id: "cc3d3b27-fa3d-4a35-cf36-3cebd4c38b3c",
    student_id: "5c8d3a37-cb2d-4c45-be35-6bad6e78d7c",
    topic_id: 3,
    ease_factor: 5.2,
    interval: 22,
    repetition_number: 7,
    last_review_date: "2023-03-03",
    next_review_date: "2023-03-25",
  },
  {
    id: "cd4d4b27-fa4d-4a45-cf46-4cebd4c48b4c",
    student_id: "5c8d3a37-cb2d-4c45-be35-6bad6e78d7c",
    topic_id: 4,
    ease_factor: 4.1,
    interval: 14,
    repetition_number: 5,
    last_review_date: "2023-03-11",
    next_review_date: "2023-03-25",
  },
  {
    id: "ce5d5b27-fa5d-4a55-cf56-5cebd4c58b5c",
    student_id: "5c8d3a37-cb2d-4c45-be35-6bad6e78d7c",
    topic_id: 5,
    ease_factor: 3.7,
    interval: 11,
    repetition_number: 4,
    last_review_date: "2023-03-14",
    next_review_date: "2023-03-25",
  },

  // Emma Wilson
  {
    id: "da1d1b27-fa1d-4a15-df16-1debd4c18b1d",
    student_id: "4d7e4a27-db3e-4d55-cf45-5cbe7f78d6d",
    topic_id: 1,
    ease_factor: 2.5,
    interval: 6,
    repetition_number: 3,
    last_review_date: "2023-03-19",
    next_review_date: "2023-03-25",
  },
  {
    id: "db2d2b27-fa2d-4a25-df26-2debd4c28b2d",
    student_id: "4d7e4a27-db3e-4d55-cf45-5cbe7f78d6d",
    topic_id: 2,
    ease_factor: 1.3,
    interval: 1,
    repetition_number: 0,
    last_review_date: "2023-03-24",
    next_review_date: "2023-03-25",
  },
  {
    id: "dc3d3b27-fa3d-4a35-df36-3debd4c38b3d",
    student_id: "4d7e4a27-db3e-4d55-cf45-5cbe7f78d6d",
    topic_id: 3,
    ease_factor: 3.3,
    interval: 10,
    repetition_number: 4,
    last_review_date: "2023-03-15",
    next_review_date: "2023-03-25",
  },
  {
    id: "dd4d4b27-fa4d-4a45-df46-4debd4c48b4d",
    student_id: "4d7e4a27-db3e-4d55-cf45-5cbe7f78d6d",
    topic_id: 4,
    ease_factor: 3.0,
    interval: 9,
    repetition_number: 3,
    last_review_date: "2023-03-16",
    next_review_date: "2023-03-25",
  },
  {
    id: "de5d5b27-fa5d-4a55-df56-5debd4c58b5d",
    student_id: "4d7e4a27-db3e-4d55-cf45-5cbe7f78d6d",
    topic_id: 5,
    ease_factor: 2.2,
    interval: 5,
    repetition_number: 2,
    last_review_date: "2023-03-20",
    next_review_date: "2023-03-25",
  },

  // David Garcia
  {
    id: "ea1d1b27-fa1d-4a15-ef16-1eebd4c18b1e",
    student_id: "3e6f5a17-ec4f-4e65-df55-4dcf8f78e5e",
    topic_id: 1,
    ease_factor: 1.5,
    interval: 2,
    repetition_number: 1,
    last_review_date: "2023-03-23",
    next_review_date: "2023-03-25",
  },
  {
    id: "eb2d2b27-fa2d-4a25-ef26-2eebd4c28b2e",
    student_id: "3e6f5a17-ec4f-4e65-df55-4dcf8f78e5e",
    topic_id: 2,
    ease_factor: 2.7,
    interval: 7,
    repetition_number: 3,
    last_review_date: "2023-03-18",
    next_review_date: "2023-03-25",
  },
  {
    id: "ec3d3b27-fa3d-4a35-ef36-3eebd4c38b3e",
    student_id: "3e6f5a17-ec4f-4e65-df55-4dcf8f78e5e",
    topic_id: 3,
    ease_factor: 1.9,
    interval: 3,
    repetition_number: 1,
    last_review_date: "2023-03-22",
    next_review_date: "2023-03-25",
  },
  {
    id: "ed4d4b27-fa4d-4a45-ef46-4eebd4c48b4e",
    student_id: "3e6f5a17-ec4f-4e65-df55-4dcf8f78e5e",
    topic_id: 4,
    ease_factor: 5.5,
    interval: 25,
    repetition_number: 8,
    last_review_date: "2023-02-28",
    next_review_date: "2023-03-25",
  },
  {
    id: "ee5d5b27-fa5d-4a55-ef56-5eebd4c58b5e",
    student_id: "3e6f5a17-ec4f-4e65-df55-4dcf8f78e5e",
    topic_id: 5,
    ease_factor: 4.8,
    interval: 20,
    repetition_number: 6,
    last_review_date: "2023-03-05",
    next_review_date: "2023-03-25",
  },
];

/**
 * Get a student by ID
 * @param {string} id - Student UUID
 * @returns {Student|undefined}
 */
export function getStudentById(id) {
  return students.find((student) => student.id === id);
}

/**
 * Get a topic by ID
 * @param {number} id - Topic ID
 * @returns {Topic|undefined}
 */
export function getTopicById(id) {
  return topics.find((topic) => topic.id === id);
}

/**
 * Get progress data for a student
 * @param {string} studentId - Student UUID
 * @returns {StudentTopicProgress[]}
 */
export function getStudentProgress(studentId) {
  return studentTopicProgress.filter(
    (progress) => progress.student_id === studentId
  );
}

/**
 * Get progress data for a specific topic
 * @param {number} topicId - Topic ID
 * @returns {StudentTopicProgress[]}
 */
export function getTopicProgress(topicId) {
  return studentTopicProgress.filter(
    (progress) => progress.topic_id === topicId
  );
}

/**
 * Get progress data for a student on a specific topic
 * @param {string} studentId - Student UUID
 * @param {number} topicId - Topic ID
 * @returns {StudentTopicProgress|undefined}
 */
export function getStudentTopicProgress(studentId, topicId) {
  return studentTopicProgress.find(
    (progress) =>
      progress.student_id === studentId && progress.topic_id === topicId
  );
}
