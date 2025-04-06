import React from "react";

/**
 * ProficiencyBar component to visualize student proficiency on a topic
 *
 * @param {Object} props
 * @param {number} props.easeFactor - The ease factor value (typically 1.3 to 5.0)
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function ProficiencyBar({ easeFactor, className = "" }) {
  // Determine color based on ease factor
  // Ease factor ranges from 1.3 to 4.0
  const getColorClass = () => {
    if (easeFactor < 1.65) return "bg-red-500"; // Red
    if (easeFactor < 2.0) return "bg-orange-500"; // Orange
    if (easeFactor < 2.5) return "bg-yellow-400"; // Yellow
    if (easeFactor < 3.0) return "bg-green-300"; // Light green
    if (easeFactor < 3.5) return "bg-green-400"; // Medium green
    return "bg-green-500"; // Vibrant green
  };

  // Calculate width percentage (0-100%) based on ease factor
  // Normalize values between 1.3 and 4.0 to 10-100%
  const getWidthPercentage = () => {
    // Handle values outside the normal range
    if (easeFactor < 1.3) return 10; // Minimum width for visibility
    if (easeFactor > 4.0) return 100;

    // Map the range 1.3-4.0 to 10-100%
    return Math.round(((easeFactor - 1.3) / 2.7) * 90 + 10);
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div
        className={`h-2.5 rounded-full ${getColorClass()}`}
        style={{ width: `${getWidthPercentage()}%` }}
      ></div>
    </div>
  );
}

/**
 * TopicProficiencyCard component to show a topic with its proficiency bar
 *
 * @param {Object} props
 * @param {string} props.topicName - Name of the topic
 * @param {number} props.easeFactor - The ease factor value
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function TopicProficiencyCard({
  topicName,
  easeFactor,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col bg-white p-3 rounded-lg shadow ${className}`}
    >
      <div className="mb-1">
        <span className="font-medium text-gray-700">{topicName}</span>
      </div>
      <ProficiencyBar easeFactor={easeFactor} />
    </div>
  );
}

/**
 * ProficiencyLegend component to display the color coding legend
 *
 * @returns {JSX.Element}
 */
export function ProficiencyLegend() {
  const legendItems = [
    { color: "bg-red-500", label: "1.3 - 1.65" },
    { color: "bg-orange-500", label: "1.65 - 2.0" },
    { color: "bg-yellow-400", label: "2.0 - 2.5" },
    { color: "bg-green-300", label: "2.5 - 3.0" },
    { color: "bg-green-400", label: "3.0 - 3.5" },
    { color: "bg-green-500", label: "> 3.5" },
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <span className="text-sm font-medium text-gray-700">
        Proficiency Level:
      </span>
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <div className={`h-3 w-6 rounded ${item.color}`}></div>
          <span className="text-xs text-gray-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
