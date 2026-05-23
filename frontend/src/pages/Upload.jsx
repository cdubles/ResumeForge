import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Upload.css'

function Upload() {
  const navigate = useNavigate()

  const [jobDescription, setJobDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!jobDescription.trim()) {
      setError('Please paste the job description')
      return
    }
    if (jobDescription.trim().length < 50) {
      setError('Job description seems too short — please paste the full listing')
      return
    }

    setIsLoading(true)
    setError(null)

    // TODO: Replace with actual API call
    // const res = await axios.post('/api/jobs', { job_description: jobDescription })
    // navigate(`/status/${res.data.job_id}`)

    await new Promise(resolve => setTimeout(resolve, 1500))
    const mockJobId = 'mock-job-' + Date.now()
    navigate(`/status/${mockJobId}`)
  }

  return (
    <div className="upload">
      <h1>Tailor Your Resume</h1>
      <p className="upload-description">
        Paste the job description below and we'll tailor your resume to match
        the role — without fabricating anything.
      </p>

      <form onSubmit={handleSubmit} className="upload-form">
        <section className="upload-card">
          <h2>Job Description</h2>
          <p className="upload-card-description">
            Paste the full job posting below. Include the role title, responsibilities,
            and required qualifications for best results.
          </p>

          <textarea
            className="upload-textarea"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder={`Paste the job description here...

Example:
Senior Software Engineer — Acme Corp

We're looking for a backend engineer to join our platform team...

Responsibilities:
• Design and build scalable APIs
• Collaborate with cross-functional teams
• Own reliability and performance of core services

Requirements:
• 4+ years of backend experience
• Proficient in Python or Go
• Experience with PostgreSQL and Redis`}
            disabled={isLoading}
          />

          <div className="upload-char-count">
            {jobDescription.length > 0 && (
              <span className={jobDescription.trim().length < 50 ? 'upload-char-count--warn' : ''}>
                {jobDescription.length} characters
              </span>
            )}
          </div>
        </section>

        {error && <p className="upload-error">{error}</p>}

        <div className="upload-actions">
          <button
            type="submit"
            className="btn-primary upload-submit"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Tailor My Resume'}
          </button>
          <p className="upload-actions-hint">
            Processing takes about 30–60 seconds
          </p>
        </div>
      </form>
    </div>
  )
}

export default Upload
