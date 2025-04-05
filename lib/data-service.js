import supabase from "./supabase";

/**
 * Fetch all students from Supabase
 * @returns {Promise<Array>} Array of student objects
 */
export async function getStudents() {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching students:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch a student by ID
 * @param {string} id - Student UUID
 * @returns {Promise<Object|null>} Student object or null if not found
 */
export async function getStudentById(id) {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching student with ID ${id}:`, error);
    return null;
  }

  return data;
}

/**
 * Fetch all topics from Supabase
 * @returns {Promise<Array>} Array of topic objects
 */
export async function getTopics() {
  const { data, error } = await supabase
    .from("topic")
    .select("*")
    .order("topic_id");

  if (error) {
    console.error("Error fetching topics:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch a topic by ID
 * @param {number} id - Topic ID
 * @returns {Promise<Object|null>} Topic object or null if not found
 */
export async function getTopicById(id) {
  const { data, error } = await supabase
    .from("topic")
    .select("*")
    .eq("topic_id", id)
    .single();

  if (error) {
    console.error(`Error fetching topic with ID ${id}:`, error);
    return null;
  }

  return data;
}

/**
 * Fetch all student topic progress data
 * @returns {Promise<Array>} Array of progress objects
 */
export async function getAllProgress() {
  const { data, error } = await supabase
    .from("student_topic_progress")
    .select("*");

  if (error) {
    console.error("Error fetching progress data:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch progress data for a specific student
 * @param {string} studentId - Student UUID
 * @returns {Promise<Array>} Array of progress objects for the student
 */
export async function getStudentProgress(studentId) {
  const { data, error } = await supabase
    .from("student_topic_progress")
    .select("*")
    .eq("student_id", studentId);

  if (error) {
    console.error(`Error fetching progress for student ${studentId}:`, error);
    return [];
  }

  return data || [];
}

/**
 * Fetch all questions from Supabase
 * @returns {Promise<Array>} Array of question objects
 */
export async function getQuestions() {
  const { data, error } = await supabase
    .from("question")
    .select("*")
    .order("question_id");

  if (error) {
    console.error("Error fetching questions:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch questions for a specific topic
 * @param {number} topicId - Topic ID
 * @returns {Promise<Array>} Array of question objects for the topic
 */
export async function getQuestionsByTopic(topicId) {
  const { data, error } = await supabase
    .from("question")
    .select("*")
    .eq("topic_id", topicId)
    .order("question_id");

  if (error) {
    console.error(`Error fetching questions for topic ${topicId}:`, error);
    return [];
  }

  return data || [];
}

/**
 * Get a random set of questions, ensuring at least one from each topic if possible
 * @param {number} count - Number of questions to return
 * @returns {Promise<Array>} Array of randomly selected questions
 */
export async function getRandomQuestions(count = 5) {
  try {
    // Get all questions
    const allQuestions = await getQuestions();

    if (allQuestions.length === 0) return [];

    // Ensure we don't try to get more questions than exist
    if (count > allQuestions.length) {
      count = allQuestions.length;
    }

    // Get unique topic IDs
    const topicIds = [...new Set(allQuestions.map((q) => q.topic_id))];
    let selectedQuestions = [];

    // Try to get one question from each topic
    for (const topicId of topicIds) {
      const topicQuestions = allQuestions.filter((q) => q.topic_id === topicId);
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
      const remainingQuestions = allQuestions.filter(
        (q) => !selectedQuestions.some((sq) => sq.question_id === q.question_id)
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
  } catch (error) {
    console.error("Error getting random questions:", error);
    return [];
  }
}

/**
 * Submit student answer for a question
 * @param {string} studentId - Student UUID
 * @param {number} questionId - Question ID
 * @param {string} selectedOption - Selected option (A, B, C, D)
 * @param {boolean} isCorrect - Whether the answer is correct
 * @returns {Promise<boolean>} Success status
 */
export async function submitAnswer(
  studentId,
  questionId,
  selectedOption,
  isCorrect
) {
  try {
    // Get the question to find its topic
    const { data: question, error: questionError } = await supabase
      .from("question")
      .select("*")
      .eq("question_id", questionId)
      .single();

    if (questionError) throw questionError;

    // Get current progress for this student and topic
    const { data: progress, error: progressError } = await supabase
      .from("student_topic_progress")
      .select("*")
      .eq("student_id", studentId)
      .eq("topic_id", question.topic_id)
      .maybeSingle();

    if (progressError) throw progressError;

    // Calculate new SM2 values
    let easeFactor, interval, repetition;
    const today = new Date().toISOString().split("T")[0];
    let nextDate = new Date();

    // Quality of response (q): 1.3 for wrong answers, 5.0 for correct answers
    const qualityOfResponse = isCorrect ? 5.0 : 1.3;

    if (!progress) {
      // Create new progress entry
      if (isCorrect) {
        easeFactor = 2.5; // Default value for first correct answer
        repetition = 1;
        interval = 1;
      } else {
        // Using the formula EF' = EF + (0.1 - (5-q) × (0.08 + (5-q) × 0.02))
        // Starting with default EF = 2.5
        easeFactor = Math.max(
          1.3,
          2.5 +
            (0.1 -
              (5 - qualityOfResponse) * (0.08 + (5 - qualityOfResponse) * 0.02))
        );
        repetition = 0;
        interval = 1;
      }
    } else {
      // Update existing progress using the formula
      // EF' = EF + (0.1 - (5-q) × (0.08 + (5-q) × 0.02))
      easeFactor = Math.max(
        1.3,
        progress.ease_factor +
          (0.1 -
            (5 - qualityOfResponse) * (0.08 + (5 - qualityOfResponse) * 0.02))
      );

      if (isCorrect) {
        repetition = progress.repetition_number + 1;

        // Calculate interval based on repetition
        if (repetition === 1) {
          interval = 1;
        } else if (repetition === 2) {
          interval = 6;
        } else {
          interval = Math.round(progress.interval * easeFactor);
        }
      } else {
        // Reset repetition for incorrect answers
        repetition = 0;
        interval = 1;
      }
    }

    // Calculate next review date
    nextDate.setDate(nextDate.getDate() + interval);
    const nextReviewDate = nextDate.toISOString().split("T")[0];

    // Update or insert progress record
    if (progress) {
      // Update existing record
      const { error: updateError } = await supabase
        .from("student_topic_progress")
        .update({
          ease_factor: easeFactor,
          interval: interval,
          repetition_number: repetition,
          last_review_date: today,
          next_review_date: nextReviewDate,
          updated_at: new Date().toISOString(),
        })
        .eq("id", progress.id);

      if (updateError) throw updateError;
    } else {
      // Insert new record
      const { error: insertError } = await supabase
        .from("student_topic_progress")
        .insert({
          student_id: studentId,
          topic_id: question.topic_id,
          ease_factor: easeFactor,
          interval: interval,
          repetition_number: repetition,
          last_review_date: today,
          next_review_date: nextReviewDate,
        });

      if (insertError) throw insertError;
    }

    return true;
  } catch (error) {
    console.error("Error submitting answer:", error);
    return false;
  }
}
