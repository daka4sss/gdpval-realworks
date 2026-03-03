import { Component, ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Dashboard from './pages/Dashboard'
import ExperimentDetail from './pages/ExperimentDetail'
import GradeDetail from './pages/GradeDetail'

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dash-page flex items-center justify-center">
          <div className="text-center">
            <p className="font-semibold text-red-500 mb-2">Something went wrong</p>
            <p className="text-sm text-dash-text-muted mb-4">{this.state.error?.message}</p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.href = '/gdpval-realworks/'
              }}
              className="px-4 py-2 rounded-lg bg-dash-card border border-dash-border text-sm hover:bg-dash-card-hover"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <ThemeProvider>
      <Router basename="/gdpval-realworks">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/experiments" element={<Dashboard />} />
            <Route path="/experiments/:id" element={<ExperimentDetail />} />
            <Route path="/grades/:gradeId" element={<GradeDetail />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  )
}

export default App
