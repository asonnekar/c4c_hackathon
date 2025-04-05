"use client";

import { useState, useEffect } from "react";
import { getRandomQuestions } from "../lib/question-data";
import { topics, getStudentById } from "../lib/student-data";
import Question from "../components/Question";

export default function Student1Page() {
  const studentId = "8a7d1a57-eabd-4a25-bf26-8aebd4c78b9a"; // John Smith
  const [student, setStudent] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Get student data
    setStudent(getStudentById(studentId));

    // Get random questions for review
    setQuestions(getRandomQuestions(5));
  }, []);

  const handleSelectOption = (questionId, option) => {
    if (!submitted) {
      setSelectedOptions((prev) => ({
        ...prev,
        [questionId]: option,
      }));
    }
  };

  const handleSubmitAll = () => {
    setSubmitted(true);

    // In a real app, this would send all answers to the server
    console.log("Submitting answers:", selectedOptions);
  };

  // Check if all questions have been answered
  const allQuestionsAnswered =
    questions.length > 0 && questions.every((q) => selectedOptions[q.id]);

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
          {questions.map((question) => (
            <Question
              key={question.id}
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
              <div key={topic.id} className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-800">{topic.name}</h4>
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
