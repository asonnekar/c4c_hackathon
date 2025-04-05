from flask import Flask, render_template

app = Flask(__name__)

# Sample data to use until you implement the database
sample_flashcards = [
    {
        "id": 1,
        "question": "What is the capital of France?",
        "option_a": "London",
        "option_b": "Berlin",
        "option_c": "Paris",
        "option_d": "Madrid",
        "correct_option": "C"
    },
    {
        "id": 2,
        "question": "What is 2 + 2?",
        "option_a": "3",
        "option_b": "4",
        "option_c": "5",
        "option_d": "22",
        "correct_option": "B"
    }
]

sample_reviews = [
    {"id": 1, "user_id": 1, "flashcard_id": 1, "repetition": 2, "interval": 6, "ef": 2.6},
    {"id": 2, "user_id": 1, "flashcard_id": 2, "repetition": 1, "interval": 1, "ef": 2.5},
    {"id": 3, "user_id": 2, "flashcard_id": 1, "repetition": 3, "interval": 15, "ef": 2.7},
    {"id": 4, "user_id": 2, "flashcard_id": 2, "repetition": 2, "interval": 6, "ef": 2.4}
]

# Student 1 view
@app.route('/student1')
def student1_home():
    return render_template('student.html', 
                          student_name="Student 1", 
                          student_id=1, 
                          flashcards=sample_flashcards)

# Student 2 view
@app.route('/student2')
def student2_home():
    return render_template('student.html', 
                          student_name="Student 2", 
                          student_id=2, 
                          flashcards=sample_flashcards)

# Teacher view
@app.route('/teacher')
def teacher_home():
    return render_template('teacher.html', 
                          reviews=sample_reviews, 
                          flashcards=sample_flashcards)

# Route to simulate answering a flashcard (will be replaced with your database implementation)
@app.route('/review/<int:flashcard_id>/<int:student_id>')
def review_flashcard(flashcard_id, student_id):
    # This is just a placeholder - you'll implement the actual review logic with your database
    return f"Student {student_id} reviewed flashcard {flashcard_id}"

if __name__ == '__main__':
    app.run(debug=True)

