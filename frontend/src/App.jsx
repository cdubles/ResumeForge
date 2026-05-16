import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Upload from './pages/Upload'
import Status from './pages/Status'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="upload" element={<Upload />} />
          <Route path="status/:jobId" element={<Status />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
