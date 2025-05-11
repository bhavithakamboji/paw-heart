import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import PetsPage from './pages/PetsPage'
import PetDetailsPage from './pages/PetDetailsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/common/ProtectedRoute'
import SheltersPage from './pages/SheltersPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import PetCarePage from './pages/PetCarePage'
import AboutPage from './pages/AboutPage'
import FaqPage from './pages/FaqPage'
import ContactPage from './pages/ContactPage'
import CareersPage from './pages/CareersPage'

function App() {
  const location = useLocation()
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="pets" element={<PetsPage />} />
        <Route path="pets/:id" element={<PetDetailsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="shelters" element={<SheltersPage />} />
        <Route path="success-stories" element={<SuccessStoriesPage />} />
        <Route path="pet-care" element={<PetCarePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route 
          path="dashboard/*" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  )
}

export default App