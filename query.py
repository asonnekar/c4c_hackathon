from supabase import create_client
from collections import defaultdict
from dotenv import load_dotenv
import os
from smolagents import CodeAgent, DuckDuckGoSearchTool, HfApiModel

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




SUPABASE_URL = 'https://oahnqpqpsqmmlwxumhpa.supabase.co'
supabase_key = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, supabase_key)

def fetch_student_topic_progress():
    """Fetch all rows from the student_topic_progress table."""
    try:
        response = supabase.table('student_topic_progress').select('*').execute()
        return response.data
    except Exception as e:
        print(f"Error fetching student_topic_progress: {e}")
        return []

def fetch_topics():
    """Fetch all rows from the Topic table."""
    try:
        response = supabase.table('topic').select('*').execute()  
        return response.data
    except Exception as e:
        print(f"Error fetching topics: {e}")
        return []

def calculate_class_topics(student_progress, topics):
    """Calculate weakest and strongest topics by the class."""
    topic_map = {t['topic_id']: t['topic_name'] for t in topics}
    
    topic_aggregates = defaultdict(lambda: {'total_ease': 0, 'count': 0})
    
    for progress in student_progress:
        topic_id = progress['topic_id']
        ease_factor = progress['ease_factor']
        
        if topic_id in topic_map:
            topic_aggregates[topic_id]['total_ease'] += ease_factor
            topic_aggregates[topic_id]['count'] += 1
    
    topic_averages = {
        topic_id: {
            'average_ease': aggregates['total_ease'] / aggregates['count'],
            'topic_name': topic_map[topic_id]
        }
        for topic_id, aggregates in topic_aggregates.items()
    }
    
    weakest_topic = min(topic_averages.items(), key=lambda x: x[1]['average_ease'])
    strongest_topic = max(topic_averages.items(), key=lambda x: x[1]['average_ease'])
    
    return weakest_topic, strongest_topic

def main():
    student_progress = fetch_student_topic_progress()
    topics = fetch_topics()
    top = []
    for t in topics:
        top.append(t['topic_name'])
    weakest_topic, strongest_topic = calculate_class_topics(student_progress, topics)
    
    # Get video links from agent
    video_links = agent(top)
    
    # Return results as a dictionary
    return {
        "weakest_topic": {
            "name": weakest_topic[1]['topic_name'],
            "average_ease": round(weakest_topic[1]['average_ease'], 2)
        },
        "strongest_topic": {
            "name": strongest_topic[1]['topic_name'],
            "average_ease": round(strongest_topic[1]['average_ease'], 2)
        },
        "video_links": video_links
    }

if __name__ == "__main__":
    res = main()
    print(res)