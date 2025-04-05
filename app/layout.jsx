import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SM2 Flashcard System",
  description: "A flashcard system using the SM2 spaced repetition algorithm",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-6xl mx-auto p-4">
          <nav className="bg-gray-100 p-4 mb-6 rounded-md">
            <div className="flex space-x-4">
              <Link
                href="/student1"
                className="text-gray-700 hover:text-gray-900"
              >
                Student 1
              </Link>
              <Link
                href="/teacher"
                className="text-gray-700 hover:text-gray-900"
              >
                Teacher
              </Link>
            </div>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

import "./globals.css";
