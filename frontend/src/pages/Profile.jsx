import { useState } from 'react'
import './Profile.css'

const PLACEHOLDER_TEXT = `Paste or type your professional background here. Include:

• Work experience (company, title, dates, responsibilities)
• Education (degree, school, graduation year)
• Projects (personal or professional)
• Skills (technical and soft skills)

Example:
Software Engineer at Acme Corp (2020-2023)
- Built REST APIs using Python and FastAPI
- Led migration from monolith to microservices
- Mentored 3 junior developers

BS Computer Science, State University, 2020

Skills: Python, JavaScript, React, PostgreSQL, Docker`

// Mock user data - will come from API/auth context later
const MOCK_USER = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  createdAt: '2024-01-15'
}

function Profile() {
  const [user, setUser] = useState(MOCK_USER)
  const [isEditingName, setIsEditingName] = useState(false)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)

  const [input, setInput] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const handleSaveName = () => {
    // TODO: API call to update user name
    setUser({ ...user, firstName, lastName })
    setIsEditingName(false)
  }

  const handleCancelEdit = () => {
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setIsEditingName(false)
  }

  const handleResetPassword = async () => {
    // TODO: API call to send password reset email
    setShowResetConfirm(false)
    setResetSent(true)
    setTimeout(() => setResetSent(false), 5000)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.name.endsWith('.docx') && !file.name.endsWith('.pdf')) {
        setError('Please upload a .docx or .pdf file')
        return
      }
      setResumeFile(file)
      setError(null)
    }
  }

  const handleRemoveFile = () => {
    setResumeFile(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!input.trim() && !resumeFile) {
      setError('Please enter your background information or upload a resume')
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock classified data
    setResult({
      job_experience: [
        {
          company: 'Extracted from your input',
          title: 'Will be parsed by LLM',
          dates: '...',
          responsibilities: ['...']
        }
      ],
      education: [
        {
          degree: 'Extracted from your input',
          school: 'Will be parsed by LLM',
          year: '...'
        }
      ],
      projects: [],
      other_experience: [],
      skills: ['Skills will be extracted', 'from your input']
    })

    setIsLoading(false)
  }

  return (
    <div className="profile">
      <h1>Your Profile</h1>

      {/* Account Information Section */}
      <section className="profile-card">
        <h2>Account Information</h2>

        <div className="profile-field">
          <label>Name</label>
          {isEditingName ? (
            <div className="profile-edit-name">
              <div className="profile-name-inputs">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                />
              </div>
              <div className="profile-edit-actions">
                <button className="btn-secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleSaveName}>
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-field-value">
              <span>{user.firstName} {user.lastName}</span>
              <button className="btn-link" onClick={() => setIsEditingName(true)}>
                Edit
              </button>
            </div>
          )}
        </div>

        <div className="profile-field">
          <label>Email</label>
          <div className="profile-field-value">
            <span>{user.email}</span>
          </div>
        </div>

        <div className="profile-field">
          <label>Member since</label>
          <div className="profile-field-value">
            <span>{new Date(user.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            })}</span>
          </div>
        </div>

        <div className="profile-field">
          <label>Password</label>
          <div className="profile-field-value">
            <span>••••••••</span>
            {!showResetConfirm && !resetSent && (
              <button className="btn-link" onClick={() => setShowResetConfirm(true)}>
                Reset password
              </button>
            )}
            {showResetConfirm && (
              <div className="profile-reset-confirm">
                <span>Send reset email?</span>
                <button className="btn-link" onClick={() => setShowResetConfirm(false)}>
                  Cancel
                </button>
                <button className="btn-link btn-link-accent" onClick={handleResetPassword}>
                  Send
                </button>
              </div>
            )}
            {resetSent && (
              <span className="profile-reset-sent">Reset email sent!</span>
            )}
          </div>
        </div>
      </section>

      {/* Professional Background Section */}
      <section className="profile-card">
        <h2>Professional Background</h2>
        <p className="profile-description">
          Enter your work experience, education, projects, and skills.
          This information will be used to tailor your resume to job descriptions.
        </p>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-upload-section">
            <label className="profile-upload-label">Upload Resume (optional)</label>
            <div className="profile-upload-area">
              {resumeFile ? (
                <div className="profile-file-info">
                  <span className="profile-file-name">{resumeFile.name}</span>
                  <button
                    type="button"
                    className="btn-link"
                    onClick={handleRemoveFile}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="profile-upload-button">
                  <input
                    type="file"
                    accept=".docx,.pdf"
                    onChange={handleFileChange}
                    disabled={isLoading}
                  />
                  <span>Choose file (.docx or .pdf)</span>
                </label>
              )}
            </div>
            <p className="profile-upload-hint">
              Upload your existing resume to auto-fill your background information
            </p>
          </div>

          <div className="profile-divider">
            <span>or enter manually</span>
          </div>

          <textarea
            className="profile-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={PLACEHOLDER_TEXT}
            disabled={isLoading}
          />

          {error && <p className="profile-error">{error}</p>}

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Analyze Profile'}
          </button>
        </form>

        {result && (
          <div className="profile-result">
            <h3>Classified Profile</h3>

            <div className="profile-section">
              <h4>Work Experience</h4>
              {result.job_experience.length > 0 ? (
                <ul>
                  {result.job_experience.map((job, i) => (
                    <li key={i}>
                      <strong>{job.title}</strong> at {job.company} ({job.dates})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="profile-empty">No work experience found</p>
              )}
            </div>

            <div className="profile-section">
              <h4>Education</h4>
              {result.education.length > 0 ? (
                <ul>
                  {result.education.map((edu, i) => (
                    <li key={i}>
                      <strong>{edu.degree}</strong> - {edu.school} ({edu.year})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="profile-empty">No education found</p>
              )}
            </div>

            <div className="profile-section">
              <h4>Projects</h4>
              {result.projects.length > 0 ? (
                <ul>
                  {result.projects.map((project, i) => (
                    <li key={i}>{project}</li>
                  ))}
                </ul>
              ) : (
                <p className="profile-empty">No projects found</p>
              )}
            </div>

            <div className="profile-section">
              <h4>Skills</h4>
              {result.skills.length > 0 ? (
                <div className="profile-skills">
                  {result.skills.map((skill, i) => (
                    <span key={i} className="profile-skill">{skill}</span>
                  ))}
                </div>
              ) : (
                <p className="profile-empty">No skills found</p>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Profile
