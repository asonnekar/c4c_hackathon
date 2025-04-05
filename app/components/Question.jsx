"use client";

import { useState } from "react";

/**
 * Question component for displaying and answering DSA questions
 *
 * @param {Object} props
 * @param {Object} props.question - The question data from Supabase
 * @param {number} props.studentId - The ID of the student
 * @param {boolean} props.submitted - Whether all questions have been submitted
 * @param {function} props.onSelectOption - Callback when an option is selected
 */
export default function Question({
  question,
  studentId,
  submitted = false,
  onSelectOption,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    if (!submitted) {
      setSelectedOption(option);
      if (onSelectOption) {
        onSelectOption(question.question_id, option);
      }
    }
  };

  const isCorrect = submitted && selectedOption === question.correct_choice;

  return (
    <div className="border rounded-lg p-6 mb-6 bg-white shadow-md">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{question.question_text}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <button
          onClick={() => handleOptionSelect("A")}
          className={`p-4 border rounded-md text-left transition-colors ${
            selectedOption === "A"
              ? "border-blue-500 bg-blue-50"
              : "hover:bg-gray-50"
          } ${
            submitted && selectedOption === "A"
              ? isCorrect
                ? "bg-green-100 border-green-500"
                : "bg-red-100 border-red-500"
              : ""
          } ${
            submitted &&
            question.correct_choice === "A" &&
            selectedOption !== "A"
              ? "bg-green-100 border-green-500"
              : ""
          }`}
          disabled={submitted}
        >
          <div className="flex items-center">
            <div
              className={`h-6 w-6 flex items-center justify-center rounded-full mr-3 ${
                selectedOption === "A"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } ${
                submitted &&
                ((selectedOption === "A" && isCorrect) ||
                  question.correct_choice === "A")
                  ? "bg-green-500 text-white"
                  : ""
              } ${
                submitted && selectedOption === "A" && !isCorrect
                  ? "bg-red-500 text-white"
                  : ""
              }`}
            >
              A
            </div>
            <span>{question.choice_a}</span>
          </div>
        </button>

        <button
          onClick={() => handleOptionSelect("B")}
          className={`p-4 border rounded-md text-left transition-colors ${
            selectedOption === "B"
              ? "border-blue-500 bg-blue-50"
              : "hover:bg-gray-50"
          } ${
            submitted && selectedOption === "B"
              ? isCorrect
                ? "bg-green-100 border-green-500"
                : "bg-red-100 border-red-500"
              : ""
          } ${
            submitted &&
            question.correct_choice === "B" &&
            selectedOption !== "B"
              ? "bg-green-100 border-green-500"
              : ""
          }`}
          disabled={submitted}
        >
          <div className="flex items-center">
            <div
              className={`h-6 w-6 flex items-center justify-center rounded-full mr-3 ${
                selectedOption === "B"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } ${
                submitted &&
                ((selectedOption === "B" && isCorrect) ||
                  question.correct_choice === "B")
                  ? "bg-green-500 text-white"
                  : ""
              } ${
                submitted && selectedOption === "B" && !isCorrect
                  ? "bg-red-500 text-white"
                  : ""
              }`}
            >
              B
            </div>
            <span>{question.choice_b}</span>
          </div>
        </button>

        <button
          onClick={() => handleOptionSelect("C")}
          className={`p-4 border rounded-md text-left transition-colors ${
            selectedOption === "C"
              ? "border-blue-500 bg-blue-50"
              : "hover:bg-gray-50"
          } ${
            submitted && selectedOption === "C"
              ? isCorrect
                ? "bg-green-100 border-green-500"
                : "bg-red-100 border-red-500"
              : ""
          } ${
            submitted &&
            question.correct_choice === "C" &&
            selectedOption !== "C"
              ? "bg-green-100 border-green-500"
              : ""
          }`}
          disabled={submitted}
        >
          <div className="flex items-center">
            <div
              className={`h-6 w-6 flex items-center justify-center rounded-full mr-3 ${
                selectedOption === "C"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } ${
                submitted &&
                ((selectedOption === "C" && isCorrect) ||
                  question.correct_choice === "C")
                  ? "bg-green-500 text-white"
                  : ""
              } ${
                submitted && selectedOption === "C" && !isCorrect
                  ? "bg-red-500 text-white"
                  : ""
              }`}
            >
              C
            </div>
            <span>{question.choice_c}</span>
          </div>
        </button>

        <button
          onClick={() => handleOptionSelect("D")}
          className={`p-4 border rounded-md text-left transition-colors ${
            selectedOption === "D"
              ? "border-blue-500 bg-blue-50"
              : "hover:bg-gray-50"
          } ${
            submitted && selectedOption === "D"
              ? isCorrect
                ? "bg-green-100 border-green-500"
                : "bg-red-100 border-red-500"
              : ""
          } ${
            submitted &&
            question.correct_choice === "D" &&
            selectedOption !== "D"
              ? "bg-green-100 border-green-500"
              : ""
          }`}
          disabled={submitted}
        >
          <div className="flex items-center">
            <div
              className={`h-6 w-6 flex items-center justify-center rounded-full mr-3 ${
                selectedOption === "D"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } ${
                submitted &&
                ((selectedOption === "D" && isCorrect) ||
                  question.correct_choice === "D")
                  ? "bg-green-500 text-white"
                  : ""
              } ${
                submitted && selectedOption === "D" && !isCorrect
                  ? "bg-red-500 text-white"
                  : ""
              }`}
            >
              D
            </div>
            <span>{question.choice_d}</span>
          </div>
        </button>
      </div>

      {submitted && (
        <div
          className="mt-4 p-3 rounded-md border-l-4 bg-gray-50 flex items-start"
          style={{ borderLeftColor: isCorrect ? "#10b981" : "#ef4444" }}
        >
          <div
            className={`mr-3 mt-0.5 flex-shrink-0 p-1 rounded-full ${
              isCorrect ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isCorrect ? (
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-4 h-4 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            )}
          </div>
          <div>
            <p
              className={
                isCorrect
                  ? "text-green-700 font-medium"
                  : "text-red-700 font-medium"
              }
            >
              {isCorrect ? "Correct!" : "Incorrect"}
            </p>
            {!isCorrect && (
              <p className="text-gray-700 mt-1">
                The correct answer is {question.correct_choice}.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
