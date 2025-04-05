import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { topics } = await request.json();

    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return NextResponse.json(
        { error: "Invalid topics data. Expected a non-empty array of topics." },
        { status: 400 }
      );
    }

    // Generate realistic YouTube video links for each topic
    const videoLinks = topics.map((topic) => {
      // Format the topic name for a URL and create realistic YouTube links
      const formattedTopic = topic.toLowerCase().replace(/\s+/g, "%20");
      const videoIds = [
        "dQw4w9WgXcQ",
        "jNQXAC9IVRw",
        "kJQP7kiw5Fk",
        "FTQbiNvZqaY",
        "fJ9rUzIMcZQ",
        "9bZkp7q19f0",
        "pRpeEdMmmQ0",
        "JGwWNGJdvx8",
        "QH2-TGUlwu4",
        "0KSOMA3QBU0",
        "OPf0YbXqDm0",
        "60ItHLz5WEA",
      ];

      // Select a random video ID from the list
      const randomVideoId =
        videoIds[Math.floor(Math.random() * videoIds.length)];

      // Mock different video titles based on the topic
      return `https://www.youtube.com/watch?v=${randomVideoId}&title=${formattedTopic}%20tutorial%20-%20learn%20data%20structures`;
    });

    return NextResponse.json({ videoLinks });
  } catch (error) {
    console.error("Error in get-video-recommendations:", error);
    return NextResponse.json(
      { error: "Failed to process request", details: error.message },
      { status: 500 }
    );
  }
}
