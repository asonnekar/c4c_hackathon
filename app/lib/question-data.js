// Data Structures and Algorithms practice questions by topic

/**
 * @typedef {Object} Question
 * @property {number} id - Unique identifier
 * @property {string} question - The question text
 * @property {string} option_a - First answer option
 * @property {string} option_b - Second answer option
 * @property {string} option_c - Third answer option
 * @property {string} option_d - Fourth answer option
 * @property {string} correct_option - The correct option (A, B, C, or D)
 * @property {number} topic_id - The topic this question belongs to
 */

/**
 * Questions organized by topic
 */
export const questions = [
  // Stack questions (topic_id: 1)
  {
    id: 1,
    question:
      "Which operation is not typically part of a stack data structure?",
    option_a: "Push",
    option_b: "Pop",
    option_c: "Insert at middle",
    option_d: "Peek",
    correct_option: "C",
    topic_id: 1,
  },
  {
    id: 2,
    question: "What is the time complexity of the push operation in a stack?",
    option_a: "O(1)",
    option_b: "O(log n)",
    option_c: "O(n)",
    option_d: "O(n²)",
    correct_option: "A",
    topic_id: 1,
  },
  {
    id: 3,
    question: "Which principle does a stack follow?",
    option_a: "FIFO (First In, First Out)",
    option_b: "LIFO (Last In, First Out)",
    option_c: "LILO (Last In, Last Out)",
    option_d: "FILO (First In, Last Out)",
    correct_option: "B",
    topic_id: 1,
  },

  // Queue questions (topic_id: 2)
  {
    id: 4,
    question: "Which principle describes a queue data structure?",
    option_a: "FIFO (First In, First Out)",
    option_b: "LIFO (Last In, First Out)",
    option_c: "Random access",
    option_d: "LILO (Last In, Last Out)",
    correct_option: "A",
    topic_id: 2,
  },
  {
    id: 5,
    question:
      "In a circular queue implementation, what happens when the rear pointer reaches the end of the array?",
    option_a: "The queue is considered full",
    option_b: "A new array is allocated",
    option_c: "The rear pointer moves to the start of the array",
    option_d: "The queue operation fails",
    correct_option: "C",
    topic_id: 2,
  },
  {
    id: 6,
    question: "What is a priority queue?",
    option_a: "A queue that only stores high-priority data",
    option_b: "A queue where elements with higher priority are dequeued first",
    option_c: "A queue with O(1) insertion time",
    option_d: "A specialized form of stack",
    correct_option: "B",
    topic_id: 2,
  },

  // Heap questions (topic_id: 3)
  {
    id: 7,
    question:
      "What is the time complexity of extract-min operation in a min-heap?",
    option_a: "O(1)",
    option_b: "O(log n)",
    option_c: "O(n)",
    option_d: "O(n log n)",
    correct_option: "B",
    topic_id: 3,
  },
  {
    id: 8,
    question: "In a max-heap, the root node contains:",
    option_a: "The smallest element",
    option_b: "The largest element",
    option_c: "The median element",
    option_d: "A random element",
    correct_option: "B",
    topic_id: 3,
  },
  {
    id: 9,
    question: "Which of these is NOT a property of a binary heap?",
    option_a: "It's a complete binary tree",
    option_b: "Parent nodes are always greater/less than their children",
    option_c: "Left child is always less than right child",
    option_d: "The minimum/maximum element is at the root",
    correct_option: "C",
    topic_id: 3,
  },

  // Linked List questions (topic_id: 4)
  {
    id: 10,
    question: "What is the advantage of a linked list over an array?",
    option_a: "Constant time random access",
    option_b: "More efficient sorting",
    option_c: "Dynamic size allocation",
    option_d: "Less memory usage",
    correct_option: "C",
    topic_id: 4,
  },
  {
    id: 11,
    question:
      "In a singly linked list, which operation typically has O(n) time complexity?",
    option_a: "Insertion at beginning",
    option_b: "Insertion at end (with tail pointer)",
    option_c: "Deletion from beginning",
    option_d: "Finding an element",
    correct_option: "D",
    topic_id: 4,
  },
  {
    id: 12,
    question: "What is a doubly linked list?",
    option_a: "A list where each node has double the storage capacity",
    option_b: "A list that can only store pairs of values",
    option_c: "A list where each node points to both next and previous nodes",
    option_d: "A list with twice the access speed",
    correct_option: "C",
    topic_id: 4,
  },

  // Tree questions (topic_id: 5)
  {
    id: 13,
    question:
      "What is the height of a balanced binary search tree with n nodes?",
    option_a: "O(1)",
    option_b: "O(log n)",
    option_c: "O(n)",
    option_d: "O(n²)",
    correct_option: "B",
    topic_id: 5,
  },
  {
    id: 14,
    question: "Which traversal visits the root node before its children?",
    option_a: "In-order",
    option_b: "Pre-order",
    option_c: "Post-order",
    option_d: "Level-order",
    correct_option: "B",
    topic_id: 5,
  },
  {
    id: 15,
    question: "What is an AVL tree?",
    option_a: "A tree with exactly three children per node",
    option_b: "A tree optimized for disk storage",
    option_c: "A self-balancing binary search tree",
    option_d: "A tree that allows duplicate keys",
    correct_option: "C",
    topic_id: 5,
  },
];

/**
 * Get questions for a specific topic
 * @param {number} topicId - The topic ID
 * @returns {Question[]} Array of questions for the topic
 */
export function getQuestionsByTopic(topicId) {
  return questions.filter((question) => question.topic_id === topicId);
}

/**
 * Get a question by ID
 * @param {number} id - Question ID
 * @returns {Question|undefined} The question or undefined if not found
 */
export function getQuestionById(id) {
  return questions.find((question) => question.id === id);
}

/**
 * Get a random set of questions, ensuring at least one from each topic if possible
 * @param {number} count - Number of questions to return
 * @returns {Question[]} Array of randomly selected questions
 */
export function getRandomQuestions(count = 5) {
  // Ensure we don't try to get more questions than exist
  if (count > questions.length) {
    count = questions.length;
  }

  // First, get one question from each topic if possible
  const topicIds = [...new Set(questions.map((q) => q.topic_id))];
  let selectedQuestions = [];

  for (const topicId of topicIds) {
    const topicQuestions = questions.filter((q) => q.topic_id === topicId);
    if (topicQuestions.length > 0) {
      // Get a random question from this topic
      const randomIndex = Math.floor(Math.random() * topicQuestions.length);
      selectedQuestions.push(topicQuestions[randomIndex]);

      // Stop if we've reached our count
      if (selectedQuestions.length >= count) {
        break;
      }
    }
  }

  // If we need more questions, randomly select from remaining questions
  if (selectedQuestions.length < count) {
    const remainingQuestions = questions.filter(
      (q) => !selectedQuestions.includes(q)
    );

    // Shuffle the remaining questions
    const shuffled = [...remainingQuestions].sort(() => 0.5 - Math.random());

    // Take enough to reach our count
    selectedQuestions = [
      ...selectedQuestions,
      ...shuffled.slice(0, count - selectedQuestions.length),
    ];
  }

  return selectedQuestions;
}
