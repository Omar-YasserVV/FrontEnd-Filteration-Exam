import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import NotesPage from "./pages/NotesPage"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<NotesPage />} />
        </Routes>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  )
}

export default App
