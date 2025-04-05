from smolagents import CodeAgent, DuckDuckGoSearchTool, HfApiModel

from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("HF_API_KEY")


"""
Returns a list of urls that are relevant to the query topic
"""
def agent(topics):

    search_tool = DuckDuckGoSearchTool()
    model = HfApiModel(model_id="Qwen/Qwen2.5-Coder-32B-Instruct", token=api_key)
    agent = CodeAgent(tools=[search_tool], model=model)
    result = agent.run(f"for each given DSA topic {topics}, search for a video related to the topic and return links. Do not return links for playlists")
    return result

if __name__ == "__main__":
    query = input("Enter topic: ")

    agent(query)