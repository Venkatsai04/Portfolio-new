import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Modern from './pages/Modern'
import Glassmorphic from './pages/Glassmorphic'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Modern />} />
        <Route path="/glass" element={<Glassmorphic />} />
      </Routes>
    </Router>
  )
}

export default App
