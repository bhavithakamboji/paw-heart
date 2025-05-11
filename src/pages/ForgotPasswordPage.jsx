import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FiMail, FiArrowLeft } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const ForgotPasswordPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { forgotPassword } = useAuth()
  
  const onSubmit = (data) => {
    setIsSubmitting(true)
    
    // Call the auth context function
    forgotPassword(data.email)
    
    // Set state to show success message
    setEmailSent(true)
    setIsSubmitting(false)
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link to="/" className="flex items-center justify-center gap-2 mb-6">
            <img src="/paw-icon.svg" alt="PawfectMatch Logo" className="h-12 w-auto" />
            <h2 className="text-3xl font-bold text-gray-900">PawfectMatch</h2>
          </Link>
          
          <h2 className="text-3xl font-extrabold text-gray-900">
            {emailSent ? 'Check your email' : 'Reset your password'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {emailSent 
              ? 'We\'ve sent password reset instructions to your email'
              : 'Enter your email address and we\'ll send you a link to reset your password'
            }
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-8 shadow rounded-lg"
        >
          {emailSent ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success-100">
                <svg 
                  className="h-6 w-6 text-success-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <p className="text-sm text-gray-500">
                  If there's an account associated with that email, you'll receive instructions on how to reset your password shortly.
                </p>
              </div>
              <div className="mt-6">
                <Link 
                  to="/login" 
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`input pl-10 w-full ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter your email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Please enter a valid email'
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send reset link'
                  )}
                </button>
              </div>
              
              <div className="text-center">
                <Link 
                  to="/login" 
                  className="flex items-center justify-center font-medium text-primary-600 hover:text-primary-500"
                >
                  <FiArrowLeft className="mr-2" />
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </motion.div>
        
        <p className="text-center text-sm text-gray-600 mt-8">
          Need help? <Link to="/contact" className="font-medium text-primary-600 hover:text-primary-500">Contact support</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPasswordPage