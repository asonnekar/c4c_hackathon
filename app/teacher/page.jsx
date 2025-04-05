import { reviews, getFlashcardById } from "../lib/data"

export default function TeacherPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
      <p className="text-lg mb-6">View student progress with the SM2 spaced repetition system.</p>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Student Review Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border text-left">Review ID</th>
                <th className="py-3 px-4 border text-left">Student ID</th>
                <th className="py-3 px-4 border text-left">Flashcard</th>
                <th className="py-3 px-4 border text-left">Repetition</th>
                <th className="py-3 px-4 border text-left">Interval (days)</th>
                <th className="py-3 px-4 border text-left">Easiness Factor</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => {
                const flashcard = getFlashcardById(review.flashcard_id)
                return (
                  <tr key={review.id}>
                    <td className="py-3 px-4 border">{review.id}</td>
                    <td className="py-3 px-4 border">{review.user_id}</td>
                    <td className="py-3 px-4 border">{flashcard?.question || "Unknown"}</td>
                    <td className="py-3 px-4 border">{review.repetition}</td>
                    <td className="py-3 px-4 border">{review.interval}</td>
                    <td className="py-3 px-4 border">{review.ef.toFixed(1)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">SM2 Algorithm Analysis</h2>
        <div className="space-y-4">
          <p>The SM2 algorithm adjusts the following parameters based on student performance:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Repetition</strong>: Number of successful reviews
            </li>
            <li>
              <strong>Interval</strong>: Days until next review
            </li>
            <li>
              <strong>Easiness Factor (EF)</strong>: Multiplier that affects interval growth
            </li>
          </ul>

          <p>When a student answers correctly (quality ≥ 3):</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Repetition increases</li>
            <li>Interval grows based on repetition count and EF</li>
            <li>EF adjusts based on answer quality</li>
          </ul>

          <p>When a student answers incorrectly (quality &lt; 3):</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Repetition resets to 0</li>
            <li>Interval resets to 1 day</li>
            <li>EF decreases but never below 1.3</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

