import React from "react";
import { TopicProficiencyCard } from "./ProficiencyBar";

/**
 * StudentCard component to display a student with topic proficiency
 *
 * @param {Object} props
 * @param {Object} props.student - Student object with id, name, email
 * @param {Array} props.topics - Array of topic objects
 * @param {Array} props.progress - Array of progress objects for the student
 * @returns {JSX.Element}
 */
export default function StudentCard({ student, topics, progress }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-5 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-xl font-semibold text-gray-800">{student.name}</h3>
        <p className="text-sm text-gray-600">{student.email}</p>
      </div>

      <div className="p-5 grid gap-3">
        <h4 className="text-md font-medium text-gray-700 mb-1">
          Topic Proficiency
        </h4>
        <div className="space-y-3">
          {topics.map((topic) => {
            // Find this student's progress for this topic
            const topicProgress = progress.find((p) => p.topic_id === topic.id);
            const easeFactor = topicProgress ? topicProgress.ease_factor : 2.5; // Default if no data

            return (
              <TopicProficiencyCard
                key={topic.id}
                topicName={topic.name}
                easeFactor={easeFactor}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
