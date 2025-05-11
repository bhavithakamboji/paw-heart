import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // Assuming this path

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, loading } = useAuth();
  const [accountType, setAccountType] = useState('adopter');
  const navigate = useNavigate(); // Import and initialize useNavigate

  const password = watch('password', '');

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password, accountType);
      // After successful registration, you might want to redirect the user
      navigate('/login'); // Or some other appropriate page
    } catch (error) {
      // Handle registration errors (e.g., display an error message)
      alert('Registration failed. Please try again.');
      console.error('Registration error:', error);
      // Optionally, set an error state to display a message in the UI
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link to="/" className="flex items-center justify-center gap-2">
            <img src="/paw-icon.svg" alt="PawfectMatch Logo" className="h-12 w-auto" />
            <h2 className="text-3xl font-bold text-gray-900">PawfectMatch</h2>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your account
            </Link>
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 space-y-6 bg-white p-8 shadow rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="rounded-md shadow-sm space-y-4">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div
                className={`flex flex-col items-center p-4 rounded-lg cursor-pointer border-2 transition-colors ${
                  accountType === 'adopter' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setAccountType('adopter')}
              >
                <FiUser className={`h-8 w-8 ${accountType === 'adopter' ? 'text-primary-500' : 'text-gray-400'}`} />
                <span className={`mt-2 text-sm font-medium ${accountType === 'adopter' ? 'text-primary-700' : 'text-gray-600'}`}>
                  Adopter
                </span>
              </div>
              <div
                className={`flex flex-col items-center p-4 rounded-lg cursor-pointer border-2 transition-colors ${
                  accountType === 'shelter' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setAccountType('shelter')}
              >
                <FiUser className={`h-8 w-8 ${accountType === 'shelter' ? 'text-primary-500' : 'text-gray-400'}`} />
                <span className={`mt-2 text-sm font-medium ${accountType === 'shelter' ? 'text-primary-700' : 'text-gray-600'}`}>
                  Shelter/Rescue
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {accountType === 'adopter' ? 'Full name' : 'Organization name'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  {...register('name', {
                    required: `${accountType === 'adopter' ? 'Name' : 'Organization name'} is required`,
                    minLength: {
                      value: 2,
                      message: `${accountType === 'adopter' ? 'Name' : 'Organization name'} must be at least 2 characters`,
                    },
                  })}
                  className={`input pl-10 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder={accountType === 'adopter' ? 'John Doe' : 'Happy Paws Rescue'}
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

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
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Please enter a valid email',
                    },
                  })}
                  className={`input pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Email address"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                      message:
                        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                    },
                  })}
                  className={`input pl-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'The passwords do not match',
                  })}
                  className={`input pl-10 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-primary-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-400"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default RegisterPage;