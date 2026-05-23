const BASE = 'http://localhost:8000'

async function request(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || `Request failed: ${res.status}`)
  }
  return res.json()
}

export const api = {
  getJobs: () => request('GET', '/api/jobs'),
  createJob: (data) => request('POST', '/api/jobs', data),
  getJob: (id) => request('GET', `/api/jobs/${id}`),
  updateApplicationStatus: (id, application_status) =>
    request('PATCH', `/api/jobs/${id}/application-status`, { application_status }),
}
