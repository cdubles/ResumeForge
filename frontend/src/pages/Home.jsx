import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import './Home.css'

const PIPELINE_STATUS_LABELS = {
  complete: 'Complete',
  failed: 'Failed',
  processing: 'Processing',
  pending: 'Pending',
}

const APP_STATUS_OPTIONS = [
  { value: 'saved', label: 'Saved' },
  { value: 'applied', label: 'Applied' },
  { value: 'interviewing', label: 'Interviewing' },
  { value: 'offered', label: 'Offered' },
  { value: 'denied', label: 'Denied' },
]

// Mock data used while backend is not connected
const MOCK_JOBS = [
  {
    id: 'job-001',
    company_name: 'Stripe',
    job_role: 'Senior Software Engineer',
    status: 'complete',
    application_status: 'applied',
    created_at: '2026-05-20T14:32:00Z',
    job_description: 'We are looking for a senior engineer to join our Developer Experience team. You will build tools and infrastructure that help millions of developers integrate Stripe into their products.',
    tailored_resume_path: 'resume-stripe-senior-swe.docx',
  },
  {
    id: 'job-002',
    company_name: 'Linear',
    job_role: 'Full Stack Engineer',
    status: 'complete',
    application_status: 'interviewing',
    created_at: '2026-05-18T09:15:00Z',
    job_description: 'Linear is building the next generation of project management tools. Join our small, focused engineering team to work on a product used by thousands of high-performing software teams.',
    tailored_resume_path: 'resume-linear-fullstack.docx',
  },
  {
    id: 'job-003',
    company_name: 'Vercel',
    job_role: 'Backend Engineer',
    status: 'failed',
    application_status: 'saved',
    created_at: '2026-05-17T16:48:00Z',
    job_description: 'Help us build the infrastructure powering the modern web. You will work on our edge network, serverless functions platform, and the systems that deploy millions of projects daily.',
    tailored_resume_path: null,
  },
  {
    id: 'job-004',
    company_name: 'Notion',
    job_role: 'Software Engineer, Platform',
    status: 'processing',
    application_status: 'saved',
    created_at: '2026-05-22T10:05:00Z',
    job_description: "Join Notion's platform team to build the foundational systems that power our product. You will work on APIs, data pipelines, and the infrastructure that serves millions of users.",
    tailored_resume_path: null,
  },
]

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function JobCard({ job, onApplicationStatusChange }) {
  const [updating, setUpdating] = useState(false)

  async function handleStatusChange(e) {
    const newStatus = e.target.value
    setUpdating(true)
    try {
      await onApplicationStatusChange(job.id, newStatus)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className={`home-job-card home-job-card--${job.status}`}>
      <div className="home-job-header">
        <div className="home-job-title">
          <span className="home-job-company">{job.company_name || 'Unknown Company'}</span>
          <span className="home-job-role">{job.job_role || 'Untitled Role'}</span>
        </div>
        <div className="home-job-meta">
          <span className={`home-job-status home-job-status--${job.status}`}>
            {PIPELINE_STATUS_LABELS[job.status]}
          </span>
          <span className="home-job-date">{formatDate(job.created_at)}</span>
        </div>
      </div>

      <p className="home-job-snippet">{job.job_description}</p>

      <div className="home-job-footer">
        <div className="home-app-status">
          <label className="home-app-status-label" htmlFor={`app-status-${job.id}`}>
            Application status
          </label>
          <select
            id={`app-status-${job.id}`}
            className={`home-app-status-select home-app-status-select--${job.application_status}`}
            value={job.application_status}
            onChange={handleStatusChange}
            disabled={updating}
          >
            {APP_STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="home-job-actions">
          {job.status === 'complete' && job.tailored_resume_path && (
            <a
              href={`/api/jobs/${job.id}/download`}
              className="home-job-download"
              download={job.tailored_resume_path}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download resume
            </a>
          )}
          {job.status === 'processing' && (
            <Link to={`/status/${job.id}`} className="home-job-view-status">
              View progress →
            </Link>
          )}
          {job.status === 'failed' && (
            <Link to="/upload" className="home-job-retry">
              Retry
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function Home() {
  const [jobs, setJobs] = useState(MOCK_JOBS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.getJobs()
      .then(data => setJobs(data))
      .catch(() => {
        // Fall back to mock data when API is unavailable
        setJobs(MOCK_JOBS)
      })
      .finally(() => setLoading(false))
  }, [])

  async function handleApplicationStatusChange(jobId, newStatus) {
    try {
      const updated = await api.updateApplicationStatus(jobId, newStatus)
      setJobs(prev => prev.map(j => j.id === updated.id ? updated : j))
    } catch {
      // Optimistic update for mock data
      setJobs(prev =>
        prev.map(j => j.id === jobId ? { ...j, application_status: newStatus } : j)
      )
    }
  }

  return (
    <div className="home">
      <div className="home-header">
        <h1>Dashboard</h1>
        <Link to="/upload" className="btn-primary home-new-btn">
          + New application
        </Link>
      </div>

      {loading && <p className="home-loading">Loading applications...</p>}

      {!loading && jobs.length > 0 && (
        <div className="home-jobs">
          {jobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onApplicationStatusChange={handleApplicationStatusChange}
            />
          ))}
        </div>
      )}

      {!loading && jobs.length === 0 && (
        <div className="home-empty">
          <p className="home-empty-text">No applications yet.</p>
          <Link to="/upload" className="btn-primary">
            Tailor your first resume
          </Link>
        </div>
      )}
    </div>
  )
}

export default Home
