"use client"

import { useState } from "react"

/**
 * Flashcard component for displaying and interacting with a flashcard
 * @param {Object} props
 * @param {Object} props.flashcard - The flashcard data
 * @param {number} props.studentId - The ID of the student viewing the flashcard
 */
export default function Flashcard({ flashcard, studentId }) {
  const [answered, setAnswered] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setAnswered(true)

    // In a real app, this would send data to the server
    console.log(`Student ${studentId} selected option ${option} for card ${flashcard.id}`)
  }

  const isCorrect = selectedOption === flashcard.correct_option

  return (
    <div className="border rounded-lg p-6 mb-6 bg-white shadow">
      <h3 className="text-xl font-semibold mb-4">{flashcard.question}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => !answered && handleOptionClick("A")}
          className={`p-4 border rounded-md text-left ${
            answered && selectedOption === "A"
              ? isCorrect
                ? "bg-green-100 border-green-500"
                : "bg-red-100 border-red-500"
              : answered && flashcard.correct_option === "A"
                ? "bg-green-100 border-green-500"
                : "hover:bg-gray-50"
          } ${answered ? "cursor-default" : "cursor-pointer"}`}
          disabled={answered}
        >
          A: {flashcard.option_a}
        </button>

        <button
          onClick={() => !answered && handleOptionClick("B")}
          className={`p-4 border rounded-md text-left ${
            answered && selectedOption === "B"
              ? isCorrect
                ? "bg-green-100 border-green-500"
                : "bg-red-100 border-red-500"
              : answered && flashcard.correct_option === "B"
                ? "bg-green-100 border-green-500"
                : "hover:bg-gray-50"
          } ${answered ? "cursor-default" : "cursor-pointer"}`}
          disabled={answered}
        >
          B: {flashcard.option_b}
        </button>

        <button
          onClick={() => !answered && handleOptionClick("C")}
          className={`p-4 border rounded-md text-left ${
            answered && selectedOption === "C"
              ? isCorrect
                ? "bg-green-100 border-green-500"
                : "bg-red-100 border-red-500"
              : answered && flashcard.correct_option === "C"
                ? "bg-green-100 border-green-500"
                : "hover:bg-gray-50"
          } ${answered ? "cursor-default" : "cursor-pointer"}`}
          disabled={answered}
        >
          C: {flashcard.option_c}
        </button>

        <button
          onClick={() => !answered && handleOptionClick("D")}
          className={`p-4 border rounded-md text-left ${
            answered && selectedOption === "D"
              ? isCorrect
                ? "bg-green-100 border-green-500"
                : "bg-red-100 border-red-500"
              : answered && flashcard.correct_option === "D"
                ? "bg-green-100 border-green-500"
                : "hover:bg-gray-50"
          } ${answered ? "cursor-default" : "cursor-pointer"}`}
          disabled={answered}
        >
          D: {flashcard.option_d}
        </button>
      </div>

      {answered && (
        <div className="mt-4">
          <p className={isCorrect ? "text-green-600" : "text-red-600"}>
            {isCorrect ? "Correct!" : `Incorrect. The correct answer is ${flashcard.correct_option}.`}
          </p>
          <button onClick={() => setAnswered(false)} className="mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Next Card
          </button>
        </div>
      )}
    </div>
  )
}

