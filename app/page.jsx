import Link from "next/link"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">SM2 Flashcard System</h1>
      <p className="text-lg">
        Welcome to the SM2 Flashcard System. This application uses the SM2 spaced repetition algorithm to help students
        learn more effectively.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link href="/student1" className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Student 1</h2>
          <p>Access flashcards and review materials for Student 1</p>
        </Link>

        <Link href="/student2" className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Student 2</h2>
          <p>Access flashcards and review materials for Student 2</p>
        </Link>

        <Link href="/teacher" className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Teacher Dashboard</h2>
          <p>View student progress and analytics</p>
        </Link>
      </div>
    </div>
  )
}

