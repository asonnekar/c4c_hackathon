from supabase import create_client
from collections import defaultdict
from dotenv import load_dotenv
import os
import agent

load_dotenv()

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

if __name__ == "__main__":
    student_progress = fetch_student_topic_progress()
    topics = fetch_topics()
    top = []
    for t in topics:
        top.append(t['topic_name'])
    weakest_topic, strongest_topic = calculate_class_topics(student_progress, topics)
    
    print("\n=== Weakest Topic by Class ===")
    print(f"Topic: {weakest_topic[1]['topic_name']} (ID: {weakest_topic[0]})")
    print(f"Average Ease Factor: {weakest_topic[1]['average_ease']:.2f}\n")
    
    print("=== Strongest Topic by Class ===")
    print(f"Topic: {strongest_topic[1]['topic_name']} (ID: {strongest_topic[0]})")
    print(f"Average Ease Factor: {strongest_topic[1]['average_ease']:.2f}\n")
    print(top)
    agent.agent(top)