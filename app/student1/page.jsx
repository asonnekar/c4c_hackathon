"use client";

import { useState, useEffect } from "react";
import {
  getRandomQuestions,
  getTopics,
  getStudentById,
  submitAnswer,
} from "../../lib/data-service";
import Question from "../components/Question";

export default function Student1Page() {
  const studentId = "8ca41757-6074-437a-a9b2-70f06d7c8ae3"; // This should be a real UUID from Supabase
  const [student, setStudent] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Get student data
        const studentData = await getStudentById(studentId);
        setStudent(studentData);

        // Get topics
        const topicsData = await getTopics();
        setTopics(topicsData);

        // Get random questions for review
        const questionsData = await getRandomQuestions(5);
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [studentId]);

  const handleSelectOption = (questionId, option) => {
    if (!submitted) {
      setSelectedOptions((prev) => ({
        ...prev,
        [questionId]: option,
      }));
    }
  };

  const handleSubmitAll = async () => {
    setSubmitted(true);

    // Submit all answers to Supabase
    try {
      for (const questionId in selectedOptions) {
        const question = questions.find(
          (q) => q.question_id === parseInt(questionId)
        );
        if (question) {
          const isCorrect =
            selectedOptions[questionId] === question.correct_choice;
          await submitAnswer(
            studentId,
            parseInt(questionId),
            selectedOptions[questionId],
            isCorrect
          );
        }
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  // Check if all questions have been answered
  const allQuestionsAnswered =
    questions.length > 0 &&
    questions.every((q) => selectedOptions[q.question_id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Data Structures and Algorithms
          </h1>
          <h2 className="text-xl text-gray-600 mt-1">
            {student ? student.name : "Student"} Dashboard
          </h2>
        </div>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-semibold">
          Revision Checkpoint (4/5/2025)
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Topic Review Questions
          </h3>
          <p className="text-gray-600 mt-1">
            Complete these questions to improve your spaced repetition progress.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {questions.length > 0 ? (
            <>
              {questions.map((question) => (
                <Question
                  key={question.question_id}
                  question={question}
                  studentId={studentId}
                  submitted={submitted}
                  onSelectOption={handleSelectOption}
                />
              ))}

              {!submitted && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSubmitAll}
                    disabled={!allQuestionsAnswered}
                    className={`px-6 py-3 rounded-md text-lg font-medium ${
                      !allQuestionsAnswered
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Submit Answers
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">
                No questions available at this time.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Topic Progress
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <div
                key={topic.topic_id}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <h4 className="font-medium text-gray-800">
                  {topic.topic_name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
