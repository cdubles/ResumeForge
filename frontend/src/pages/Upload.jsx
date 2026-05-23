import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import './Upload.css'

function Upload() {
  const navigate = useNavigate()

  const [companyName, setCompanyName] = useState('')
  const [jobRole, setJobRole] = useState('')
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

    try {
      const job = await api.createJob({
        job_description: jobDescription,
        company_name: companyName.trim() || null,
        job_role: jobRole.trim() || null,
      })
      navigate(`/status/${job.id}`)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setIsLoading(false)
    }
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
          <h2>Job Details</h2>
          <p className="upload-card-description">
            Optionally add the company and role title so you can track this application on your dashboard.
          </p>

          <div className="upload-row">
            <div className="upload-field">
              <label className="upload-label" htmlFor="company-name">Company name</label>
              <input
                id="company-name"
                type="text"
                className="upload-input"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Corp"
                disabled={isLoading}
              />
            </div>
            <div className="upload-field">
              <label className="upload-label" htmlFor="job-role">Job title</label>
              <input
                id="job-role"
                type="text"
                className="upload-input"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                disabled={isLoading}
              />
            </div>
          </div>
        </section>

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
