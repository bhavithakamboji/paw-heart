import { useState } from 'react'
import { FiMail, FiCheck } from 'react-icons/fi'

const SubscribeForm = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    // Validate email
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setEmail('')
    }, 1500)
  }

  return (
    <div className="max-w-md mx-auto">
      {isSubmitted ? (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
          <div className="bg-success-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="text-white text-xl" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p>
            You've been subscribed to our newsletter. 
            Get ready for adorable pets and helpful adoption tips in your inbox!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input 
                type="email" 
                className="w-full pl-10 pr-3 py-3 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit"
              className="btn bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                  <span>Subscribing...</span>
                </div>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
          {error && <p className="text-red-200 text-sm mt-2">{error}</p>}
        </form>
      )}
    </div>
  )
}

export default SubscribeForm