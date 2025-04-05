import { exec } from "child_process";
import { NextResponse } from "next/server";

export async function GET() {
  return new Promise((resolve) => {
    exec("python query.py", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        return resolve(
          NextResponse.json(
            {
              error: "Failed to execute script",
              details: error.message,
            },
            { status: 500 }
          )
        );
      }

      if (stderr) {
        console.error(`Script stderr: ${stderr}`);
      }

      // Parse the output to extract insights
      const outputLines = stdout.trim().split("\n");
      const insights = {
        weakestTopic: {},
        strongestTopic: {},
        resources: [],
      };

      // Extract topic information
      let currentSection = "";
      for (const line of outputLines) {
        if (line.includes("=== Weakest Topic by Class ===")) {
          currentSection = "weakest";
          continue;
        } else if (line.includes("=== Strongest Topic by Class ===")) {
          currentSection = "strongest";
          continue;
        } else if (line.includes("http")) {
          insights.resources.push(line.trim());
        }

        if (currentSection === "weakest") {
          if (line.includes("Topic:")) {
            const match = line.match(/Topic: (.+) \(ID: (\d+)\)/);
            if (match) {
              insights.weakestTopic.name = match[1];
              insights.weakestTopic.id = match[2];
            }
          } else if (line.includes("Average Ease Factor:")) {
            const match = line.match(/Average Ease Factor: ([\d.]+)/);
            if (match) {
              insights.weakestTopic.averageEase = parseFloat(match[1]);
            }
          }
        } else if (currentSection === "strongest") {
          if (line.includes("Topic:")) {
            const match = line.match(/Topic: (.+) \(ID: (\d+)\)/);
            if (match) {
              insights.strongestTopic.name = match[1];
              insights.strongestTopic.id = match[2];
            }
          } else if (line.includes("Average Ease Factor:")) {
            const match = line.match(/Average Ease Factor: ([\d.]+)/);
            if (match) {
              insights.strongestTopic.averageEase = parseFloat(match[1]);
            }
          }
        }
      }

      return resolve(NextResponse.json({ insights }));
    });
  });
}
