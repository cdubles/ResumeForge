import { Link } from 'react-router-dom'
import './Home.css'

// Mock data — will come from GET /api/jobs
const MOCK_JOBS = [
  {
    id: 'job-001',
    company: 'Stripe',
    role: 'Senior Software Engineer',
    status: 'complete',
    createdAt: '2026-05-20T14:32:00Z',
    jobDescriptionSnippet: 'We are looking for a senior engineer to join our Developer Experience team. You will build tools and infrastructure that help millions of developers integrate Stripe into their products.',
    outputFile: 'resume-stripe-senior-swe.docx',
  },
  {
    id: 'job-002',
    company: 'Linear',
    role: 'Full Stack Engineer',
    status: 'complete',
    createdAt: '2026-05-18T09:15:00Z',
    jobDescriptionSnippet: 'Linear is building the next generation of project management tools. Join our small, focused engineering team to work on a product used by thousands of high-performing software teams.',
    outputFile: 'resume-linear-fullstack.docx',
  },
  {
    id: 'job-003',
    company: 'Vercel',
    role: 'Backend Engineer',
    status: 'failed',
    createdAt: '2026-05-17T16:48:00Z',
    jobDescriptionSnippet: 'Help us build the infrastructure powering the modern web. You will work on our edge network, serverless functions platform, and the systems that deploy millions of projects daily.',
    outputFile: null,
  },
  {
    id: 'job-004',
    company: 'Notion',
    role: 'Software Engineer, Platform',
    status: 'processing',
    createdAt: '2026-05-22T10:05:00Z',
    jobDescriptionSnippet: 'Join Notion\'s platform team to build the foundational systems that power our product. You will work on APIs, data pipelines, and the infrastructure that serves millions of users.',
    outputFile: null,
  },
]

const STATUS_LABELS = {
  complete: 'Complete',
  failed: 'Failed',
  processing: 'Processing',
  pending: 'Pending',
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function JobCard({ job }) {
  return (
    <div className={`home-job-card home-job-card--${job.status}`}>
      <div className="home-job-header">
        <div className="home-job-title">
          <span className="home-job-company">{job.company}</span>
          <span className="home-job-role">{job.role}</span>
        </div>
        <div className="home-job-meta">
          <span className={`home-job-status home-job-status--${job.status}`}>
            {STATUS_LABELS[job.status]}
          </span>
          <span className="home-job-date">{formatDate(job.createdAt)}</span>
        </div>
      </div>

      <p className="home-job-snippet">{job.jobDescriptionSnippet}</p>

      <div className="home-job-actions">
        {job.status === 'complete' && job.outputFile && (
          <a
            href={`/api/jobs/${job.id}/download`}
            className="home-job-download"
            download={job.outputFile}
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
  )
}

function Home() {
  const hasJobs = MOCK_JOBS.length > 0

  return (
    <div className="home">
      <div className="home-header">
        <h1>Dashboard</h1>
        <Link to="/upload" className="btn-primary home-new-btn">
          + New application
        </Link>
      </div>

      {hasJobs ? (
        <div className="home-jobs">
          {MOCK_JOBS.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
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
