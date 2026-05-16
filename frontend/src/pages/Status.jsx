import { useParams } from 'react-router-dom'
import './Status.css'

function Status() {
  const { jobId } = useParams()

  return (
    <div className="status">
      <h1>Job Status</h1>
      <p className="status-description">
        Tracking job: <code>{jobId}</code>
      </p>
      {/* Status polling and download will be built out next */}
    </div>
  )
}

export default Status
