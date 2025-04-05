import { flashcards } from "../lib/data"
import Flashcard from "../components/flashcard"

export default function Student1Page() {
  const studentId = 1

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Student 1 Dashboard</h1>
      <p className="text-lg mb-6">Welcome to your flashcard review session.</p>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Your Flashcards</h2>

        {flashcards.map((card) => (
          <Flashcard key={card.id} flashcard={card} studentId={studentId} />
        ))}
      </div>
    </div>
  )
}

