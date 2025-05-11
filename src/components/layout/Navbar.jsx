import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiUser, FiHeart, FiLogOut, FiHome, FiMessageSquare } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const location = useLocation()
  
  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])
  
  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find a Pet', path: '/pets' },
    { name: 'Shelters', path: '/shelters' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'Pet Care', path: '/pet-care' },
    { name: 'About Us', path: '/about' },
  ]
  
  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || location.pathname !== '/' ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 z-10">
          <img src="/paw-icon.svg" alt="PawfectMatch Logo" className="w-10 h-10" />
          <span className={`font-bold text-xl transition-colors ${
            scrolled || location.pathname !== '/' ? 'text-primary-600' : 'text-white'
          }`}>
            PawfectMatch
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isActive 
                  ? 'text-primary-700 bg-primary-50' 
                  : (scrolled || location.pathname !== '/') 
                    ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-100' 
                    : 'text-white hover:text-white hover:bg-white/20'
                }
              `}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        
        {/* Auth Buttons / User Menu */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary-400"
                />
                <span className={`font-medium transition-colors ${
                  scrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'
                }`}>
                  {user.name}
                </span>
              </button>
              
              {userMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20"
                >
                  <Link 
                    to="/dashboard" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <FiHome /> Dashboard
                  </Link>
                  <Link 
                    to="/dashboard/favorites" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <FiHeart /> Favorites
                  </Link>
                  <Link 
                    to="/dashboard/messages" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <FiMessageSquare /> Messages
                  </Link>
                  <button 
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    <FiLogOut /> Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <>
               <Link 
            to="/login" 
            className={`btn px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              scrolled || location.pathname !== '/' 
                ? 'text-primary-600 hover:text-primary-700 border border-primary-600 hover:border-primary-700' 
                : 'text-white hover:text-white border border-white hover:bg-white/20'
            }`}
          >
            Login
          </Link>
              <Link 
                to="/register" 
                className="btn btn-primary rounded-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-10 p-2 text-gray-500 hover:text-gray-600 focus:outline-none"
        >
          {isOpen ? (
            <FiX size={24} className={scrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-white'} />
          ) : (
            <FiMenu size={24} className={scrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-white'} />
          )}
        </button>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-0 bg-white flex flex-col pt-20 px-4"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    px-4 py-3 rounded-md text-base font-medium transition-colors
                    ${isActive 
                      ? 'text-primary-700 bg-primary-50' 
                      : 'text-gray-800 hover:text-primary-600 hover:bg-gray-100'
                    }
                  `}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
            
            <div className="mt-8 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary-400"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
                  >
                    <FiHome size={20} /> Dashboard
                  </Link>
                  <Link 
                    to="/dashboard/favorites" 
                    className="flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
                  >
                    <FiHeart size={20} /> Favorites
                  </Link>
                  <Link 
                    to="/dashboard/messages" 
                    className="flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
                  >
                    <FiMessageSquare size={20} /> Messages
                  </Link>
                  <button 
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-gray-100 rounded-md mt-2"
                  >
                    <FiLogOut size={20} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-secondary rounded-md w-full">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary rounded-md w-full">
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Navbar