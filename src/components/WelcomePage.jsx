import { Link } from 'react-router-dom'

export default function WelcomePage() {
  return (
    <div className="welcome-page container">
        <h1>Quizzical</h1>
        <p>Test your knowledge</p>
        <Link to="/quiz" className="quiz-btn" >Start Quiz</Link>
    </div>
  )
}
