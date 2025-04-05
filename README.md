# Spaced Repetition Learning Platform

A modern, interactive platform for optimizing student learning using the SM2 spaced repetition algorithm. This application helps educators track student progress across different topics while providing adaptive learning experiences for students.

## Features

### For Students

- **Personalized Question Reviews**: Receive questions tailored to your learning needs based on past performance
- **Spaced Repetition Learning**: Questions appear at optimal intervals to maximize long-term retention
- **Progress Tracking**: View your progress across different topics
- **Immediate Feedback**: Get instant feedback on your responses to reinforce learning

### For Teachers

- **Comprehensive Dashboard**: View all students' proficiency levels at a glance
- **Topic Analysis**: Identify class-wide strengths and weaknesses
- **AI-Powered Insights**: Get recommendations on which topics need more attention
- **Resource Recommendations**: Access automatically generated educational resources for challenging topics

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Learning Algorithm**: SM2 Spaced Repetition Algorithm
- **AI Features**: Topic analysis, video recommendation generation

## SM2 Algorithm Implementation

This platform implements a modified version of the SuperMemo SM2 algorithm with the following formula:

```
EF' = EF + (0.1 - (5-q) × (0.08 + (5-q) × 0.02))
```

Where:

- `q` = quality of response (1.3 for incorrect answers, 5.0 for correct answers)
- `EF` = current Ease Factor
- `EF'` = new Ease Factor

The algorithm adjusts the ease factor based on student performance, which determines:

- How quickly intervals grow between reviews
- When to schedule the next review of a topic
- How to prioritize difficult concepts

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Supabase account

### Environment Setup

1. Clone the repository
2. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
   ```

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

### Database Setup

The application requires the following tables in Supabase:

- `students`
- `topic`
- `question`
- `student_topic_progress`

Sample schema is available in the `/schema` directory.

## Usage

### Student View

- Navigate to `/student1` to access the student dashboard
- Complete assigned questions
- Review performance metrics

### Teacher View

- Navigate to `/teacher` to access the teacher dashboard
- View student proficiency data
- Analyze class-wide topic strengths and weaknesses
- Generate educational resource recommendations

## Customization

The platform is designed to be extensible for different educational subjects:

- Add new topics in the `topic` table
- Add questions in the `question` table
- Customize ease factor calculations in `lib/data-service.js`

## License

[MIT License](LICENSE)

## Acknowledgements

- SuperMemo SM2 Algorithm
- Next.js
- Supabase
- Tailwind CSS
