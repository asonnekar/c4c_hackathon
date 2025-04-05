import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://oahnqpqpsqmmlwxumhpa.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function TopicAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [textPrompt, setTextPrompt] = useState("");

  const fetchStudentTopicProgress = async () => {
    try {
      const { data, error } = await supabase
        .from("student_topic_progress")
        .select("*");

      if (error) throw error;
      return data;
    } catch (e) {
      console.error(`Error fetching student_topic_progress: ${e}`);
      throw new Error(`Error fetching student data: ${e.message}`);
    }
  };

  const fetchTopics = async () => {
    try {
      const { data, error } = await supabase.from("topic").select("*");

      if (error) throw error;
      return data;
    } catch (e) {
      console.error(`Error fetching topics: ${e}`);
      throw new Error(`Error fetching topics: ${e.message}`);
    }
  };

  const calculateClassTopics = (studentProgress, topics) => {
    const topicMap = {};
    topics.forEach((t) => {
      topicMap[t.topic_id] = t.topic_name;
    });

    // Create equivalent of defaultdict
    const topicAggregates = {};

    for (const progress of studentProgress) {
      const topicId = progress.topic_id;
      const easeFactor = progress.ease_factor;

      if (topicMap[topicId]) {
        if (!topicAggregates[topicId]) {
          topicAggregates[topicId] = { total_ease: 0, count: 0 };
        }

        topicAggregates[topicId].total_ease += easeFactor;
        topicAggregates[topicId].count += 1;
      }
    }

    const topicAverages = {};

    for (const topicId in topicAggregates) {
      const aggregates = topicAggregates[topicId];
      topicAverages[topicId] = {
        average_ease: aggregates.total_ease / aggregates.count,
        topic_name: topicMap[topicId],
      };
    }

    let weakestTopic = null;
    let weakestValue = Infinity;
    let strongestTopic = null;
    let strongestValue = -Infinity;

    for (const topicId in topicAverages) {
      const data = topicAverages[topicId];
      if (data.average_ease < weakestValue) {
        weakestValue = data.average_ease;
        weakestTopic = [topicId, data];
      }

      if (data.average_ease > strongestValue) {
        strongestValue = data.average_ease;
        strongestTopic = [topicId, data];
      }
    }

    return [weakestTopic, strongestTopic];
  };

  const getVideoRecommendations = async (topics) => {
    try {
      const response = await fetch("/api/get-video-recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topics }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.videoLinks;
    } catch (error) {
      console.error("Error fetching video recommendations:", error);
      throw new Error(
        `Failed to fetch video recommendations: ${error.message}`
      );
    }
  };

  const analyzeTopics = async () => {
    setLoading(true);
    setError(null);
    setTextPrompt("");

    try {
      // Fetch data
      const studentProgress = await fetchStudentTopicProgress();
      const topics = await fetchTopics();

      const topicNames = topics.map((t) => t.topic_name);

      // Calculate class topics
      const [weakestTopic, strongestTopic] = calculateClassTopics(
        studentProgress,
        topics
      );

      // Get video links from agent via API route
      const videoLinks = await getVideoRecommendations(topicNames);

      // Set results
      const results = {
        weakest_topic: {
          name: weakestTopic[1].topic_name,
          average_ease: Math.round(weakestTopic[1].average_ease * 100) / 100,
        },
        strongest_topic: {
          name: strongestTopic[1].topic_name,
          average_ease: Math.round(strongestTopic[1].average_ease * 100) / 100,
        },
        video_links: videoLinks,
      };

      // Generate text prompt
      const prompt = `
Class Analysis Results:

The weakest topic for the class is "${
        results.weakest_topic.name
      }" with an ease factor of ${results.weakest_topic.average_ease}.
The strongest topic for the class is "${
        results.strongest_topic.name
      }" with an ease factor of ${results.strongest_topic.average_ease}.

Recommended Videos:
${results.video_links.map((link, idx) => `${idx + 1}. ${link}`).join("\n")}

Based on these results, the class should focus more on ${
        results.weakest_topic.name
      } to improve overall performance.
      `.trim();

      setTextPrompt(prompt);
    } catch (error) {
      console.error("Error analyzing topics:", error);
      setError(`Error analyzing topics: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-center mb-6">
        <button
          onClick={analyzeTopics}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 text-lg font-medium"
        >
          {loading ? "Analyzing..." : "Analyze Topics"}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
          {error}
        </div>
      )}

      {textPrompt && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-center">
            Analysis Results
          </h3>
          <div className="p-4 bg-gray-50 border rounded font-mono whitespace-pre-wrap">
            {textPrompt}
          </div>
        </div>
      )}
    </div>
  );
}
