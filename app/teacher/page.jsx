"use client";

import React, { useState, useEffect } from "react";
import {
  getStudents,
  getTopics,
  getAllProgress,
  getStudentProgress,
  getTopicById,
} from "../../lib/data-service";
import StudentCard from "../../components/StudentCard";
import { ProficiencyLegend } from "../../components/ProficiencyBar";

export default function TeacherPage() {
  const [students, setStudents] = useState([]);
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Load students, topics, and progress data
        const [studentsData, topicsData, progressData] = await Promise.all([
          getStudents(),
          getTopics(),
          getAllProgress(),
        ]);

        setStudents(studentsData);
        setTopics(topicsData);
        setProgress(progressData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Get progress data for a student
  const getStudentProgressData = (studentId) => {
    return progress.filter((p) => p.student_id === studentId);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Data Structures and Algorithms
        </h1>
        <p className="text-xl text-gray-600 mt-2">Teacher Dashboard</p>
      </header>

      <section className="mb-8 p-5 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Student Proficiency Overview
        </h2>
        <div className="mb-6">
          <ProficiencyLegend />
        </div>
        <p className="text-gray-600 mb-2">
          This dashboard shows each student's proficiency in key Data Structures
          topics based on their SM2 spaced repetition data. The colors indicate
          proficiency level, with red being the lowest and green being the
          highest.
        </p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="font-medium mr-2">Easiness Factor Range:</span>
          <span>1.3 (difficult) to 5.0 (easy)</span>
        </div>
      </section>

      {students.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              topics={topics}
              progress={getStudentProgressData(student.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-600">No student data available.</p>
        </div>
      )}

      <section className="mt-10 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">SM2 Algorithm Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-lg mb-3">How It Works</h3>
            <p className="text-gray-700 mb-3">
              The SM2 algorithm adjusts student review intervals based on their
              performance. The key parameters shown here are:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>
                <strong>Ease Factor</strong>: Determines how quickly intervals
                grow (1.3-5.0)
              </li>
              <li>
                <strong>Interval</strong>: Days until next review
              </li>
              <li>
                <strong>Repetition Number</strong>: Count of consecutive correct
                answers
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-3">Data Interpretation</h3>
            <p className="text-gray-700 mb-3">
              Higher ease factors indicate topics that students find easier to
              recall. The color-coded bars provide a quick visual overview of:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Red: Topics students find challenging</li>
              <li>Orange/Yellow: Topics with moderate difficulty</li>
              <li>Green: Topics students have mastered</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Use this data to identify topics that need additional classroom
              focus or specific students who may need assistance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
