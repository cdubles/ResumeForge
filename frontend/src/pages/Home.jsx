import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <h1>ResumeForge</h1>
      <p className="home-tagline">
        Automatically tailor your resume to any job description
      </p>
      <div className="home-steps">
        <div className="home-step">
          <span className="home-step-number">1</span>
          <h2>Create Profile</h2>
          <p>Enter your work history, education, and skills</p>
        </div>
        <div className="home-step">
          <span className="home-step-number">2</span>
          <h2>Upload Resume</h2>
          <p>Upload your resume and paste a job description</p>
        </div>
        <div className="home-step">
          <span className="home-step-number">3</span>
          <h2>Download</h2>
          <p>Get your tailored resume in seconds</p>
        </div>
      </div>
      <Link to="/profile" className="home-cta">
        Get Started
      </Link>
    </div>
  )
}

export default Home
