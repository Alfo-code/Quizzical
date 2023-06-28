import { Route, Routes } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import QuizPage from './components/QuizPage'
import './App.css'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  )
}