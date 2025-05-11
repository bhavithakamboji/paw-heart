import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('pawfectUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // In a real app, this would communicate with the backend
  const login = (email, password) => {
    setLoading(true)
    
    // Mock login - in a real app, this would call the backend API
    setTimeout(() => {
      // Check mock credentials
      if (email === 'user@example.com' && password === 'password') {
        const userData = {
          id: '1',
          name: 'John Doe',
          email: 'user@example.com',
          role: 'adopter',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
        setUser(userData)
        localStorage.setItem('pawfectUser', JSON.stringify(userData))
        toast.success('Logged in successfully!')
        navigate('/dashboard')
      } else if (email === 'shelter@example.com' && password === 'password') {
        const userData = {
          id: '2',
          name: 'Happy Paws Shelter',
          email: 'shelter@example.com',
          role: 'shelter',
          avatar: 'https://images.pexels.com/photos/1612861/pexels-photo-1612861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        setUser(userData)
        localStorage.setItem('pawfectUser', JSON.stringify(userData))
        toast.success('Logged in successfully!')
        navigate('/dashboard')
      } else if (email === 'admin@example.com' && password === 'password') {
        const userData = {
          id: '3',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        }
        setUser(userData)
        localStorage.setItem('pawfectUser', JSON.stringify(userData))
        toast.success('Logged in successfully!')
        navigate('/dashboard')
      } else {
        toast.error('Invalid email or password')
      }
      setLoading(false)
    }, 1000)
  }

  const register = (name, email, password, role) => {
    setLoading(true)
    
    // Mock registration - in a real app, this would call the backend API
    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        name,
        email,
        role,
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
      }
      
      setUser(userData)
      localStorage.setItem('pawfectUser', JSON.stringify(userData))
      toast.success('Account created successfully!')
      navigate('/dashboard')
      setLoading(false)
    }, 1000)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('pawfectUser')
    toast.success('Logged out successfully')
    navigate('/')
  }

  const forgotPassword = (email) => {
    // Mock forgot password - in a real app, this would call the backend API
    toast.success(`Password reset link sent to ${email}`)
    navigate('/login')
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}