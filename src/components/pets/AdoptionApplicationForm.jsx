import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiArrowRight, FiArrowLeft, FiUser, FiHome, FiPhone, FiMail, FiFileText } from 'react-icons/fi'
import { motion } from 'framer-motion'

const AdoptionApplicationForm = ({ petName, onSubmit, onCancel }) => {
  const [step, setStep] = useState(1)
  const { register, handleSubmit, formState: { errors, isValid }, trigger, watch } = useForm({
    mode: 'onChange'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const totalSteps = 3
  
  const nextStep = async () => {
    const fieldsToValidate = step === 1 
      ? ['fullName', 'email', 'phone', 'address', 'city', 'state', 'zip']
      : step === 2 
        ? ['housingType', 'hasYard', 'hasChildren', 'hasOtherPets', 'hoursAlone']
        : []
    
    const isStepValid = await trigger(fieldsToValidate)
    if (isStepValid) {
      setStep(Math.min(step + 1, totalSteps))
    }
  }
  
  const prevStep = () => {
    setStep(Math.max(step - 1, 1))
  }
  
  const submitForm = async (data) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } catch (error) {
      console.error('Error submitting application:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i}
              className="flex items-center"
            >
              <div 
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  step > i+1 
                    ? 'bg-primary-600 text-white' 
                    : step === i+1 
                      ? 'bg-primary-100 text-primary-600 border-2 border-primary-600' 
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step > i+1 ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              
              {i < totalSteps - 1 && (
                <div 
                  className={`h-1 w-full flex-grow mx-2 ${
                    step > i+1 ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Personal Information</span>
          <span>Living Situation</span>
          <span>Experience & Commitment</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(submitForm)}>
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    className={`input pl-10 w-full ${errors.fullName ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="John Doe"
                    {...register('fullName', { required: 'Full name is required' })}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`input pl-10 w-full ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="example@email.com"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  className={`input pl-10 w-full ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="(123) 456-7890"
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[\d\s()+-]{10,15}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiHome className="text-gray-400" />
                </div>
                <input
                  id="address"
                  type="text"
                  className={`input pl-10 w-full ${errors.address ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="123 Main St"
                  {...register('address', { required: 'Address is required' })}
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  className={`input w-full ${errors.city ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Anytown"
                  {...register('city', { required: 'City is required' })}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  id="state"
                  type="text"
                  className={`input w-full ${errors.state ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="CA"
                  {...register('state', { required: 'State is required' })}
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code *
              </label>
              <input
                id="zip"
                type="text"
                className={`input w-full ${errors.zip ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="12345"
                {...register('zip', { 
                  required: 'ZIP code is required',
                  pattern: {
                    value: /^\d{5}(-\d{4})?$/,
                    message: 'Please enter a valid ZIP code'
                  }
                })}
              />
              {errors.zip && (
                <p className="mt-1 text-sm text-red-600">{errors.zip.message}</p>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Step 2: Living Situation */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Living Situation
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Housing Type *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {['House', 'Apartment', 'Condo', 'Other'].map((type) => (
                  <label 
                    key={type}
                    className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none transition-colors ${
                      watch('housingType') === type 
                        ? 'border-primary-600 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      value={type}
                      className="sr-only"
                      {...register('housingType', { required: 'Please select a housing type' })}
                    />
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span id={`housing-${type}-label`} className="block text-sm font-medium text-gray-900">
                          {type}
                        </span>
                      </span>
                    </span>
                    {watch('housingType') === type && (
                      <svg className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
              {errors.housingType && (
                <p className="mt-1 text-sm text-red-600">{errors.housingType.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have a yard? *
              </label>
              <div className="flex gap-4">
                <label className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                  watch('hasYard') === 'yes' ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    value="yes"
                    className="sr-only"
                    {...register('hasYard', { required: 'Please answer this question' })}
                  />
                  <span className="flex flex-1">Yes</span>
                  {watch('hasYard') === 'yes' && (
                    <svg className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
                
                <label className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                  watch('hasYard') === 'no' ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    value="no"
                    className="sr-only"
                    {...register('hasYard', { required: 'Please answer this question' })}
                  />
                  <span className="flex flex-1">No</span>
                  {watch('hasYard') === 'no' && (
                    <svg className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              </div>
              {errors.hasYard && (
                <p className="mt-1 text-sm text-red-600">{errors.hasYard.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have children at home? *
              </label>
              <div className="flex gap-4">
                <label className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                  watch('hasChildren') === 'yes' ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    value="yes"
                    className="sr-only"
                    {...register('hasChildren', { required: 'Please answer this question' })}
                  />
                  <span className="flex flex-1">Yes</span>
                  {watch('hasChildren') === 'yes' && (
                    <svg className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
                
                <label className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                  watch('hasChildren') === 'no' ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    value="no"
                    className="sr-only"
                    {...register('hasChildren', { required: 'Please answer this question' })}
                  />
                  <span className="flex flex-1">No</span>
                  {watch('hasChildren') === 'no' && (
                    <svg className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              </div>
              {errors.hasChildren && (
                <p className="mt-1 text-sm text-red-600">{errors.hasChildren.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have other pets? *
              </label>
              <div className="flex gap-4">
                <label className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                  watch('hasOtherPets') === 'yes' ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    value="yes"
                    className="sr-only"
                    {...register('hasOtherPets', { required: 'Please answer this question' })}
                  />
                  <span className="flex flex-1">Yes</span>
                  {watch('hasOtherPets') === 'yes' && (
                    <svg className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
                
                <label className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                  watch('hasOtherPets') === 'no' ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    value="no"
                    className="sr-only"
                    {...register('hasOtherPets', { required: 'Please answer this question' })}
                  />
                  <span className="flex flex-1">No</span>
                  {watch('hasOtherPets') === 'no' && (
                    <svg className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              </div>
              {errors.hasOtherPets && (
                <p className="mt-1 text-sm text-red-600">{errors.hasOtherPets.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="hoursAlone" className="block text-sm font-medium text-gray-700 mb-1">
                How many hours will the pet be alone each day? *
              </label>
              <select
                id="hoursAlone"
                className={`input w-full ${errors.hoursAlone ? 'border-red-500 focus:ring-red-500' : ''}`}
                {...register('hoursAlone', { required: 'Please select an option' })}
              >
                <option value="">Select an option</option>
                <option value="0-2">0-2 hours</option>
                <option value="3-5">3-5 hours</option>
                <option value="6-8">6-8 hours</option>
                <option value="8+">More than 8 hours</option>
              </select>
              {errors.hoursAlone && (
                <p className="mt-1 text-sm text-red-600">{errors.hoursAlone.message}</p>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Step 3: Experience & Commitment */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Experience & Commitment
            </h3>
            
            <div>
              <label htmlFor="petExperience" className="block text-sm font-medium text-gray-700 mb-1">
                Describe your experience with pets *
              </label>
              <textarea
                id="petExperience"
                rows="3"
                className={`input w-full ${errors.petExperience ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Share your previous experience with pets..."
                {...register('petExperience', { 
                  required: 'Please share your experience with pets',
                  minLength: {
                    value: 50,
                    message: 'Please provide more details (minimum 50 characters)'
                  }
                })}
              ></textarea>
              {errors.petExperience ? (
                <p className="mt-1 text-sm text-red-600">{errors.petExperience.message}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 50 characters. {watch('petExperience')?.length || 0}/50 characters
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="whyAdopt" className="block text-sm font-medium text-gray-700 mb-1">
                Why do you want to adopt {petName}? *
              </label>
              <textarea
                id="whyAdopt"
                rows="3"
                className={`input w-full ${errors.whyAdopt ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Tell us why you'd like to adopt this pet..."
                {...register('whyAdopt', { 
                  required: 'Please tell us why you want to adopt this pet',
                  minLength: {
                    value: 50,
                    message: 'Please provide more details (minimum 50 characters)'
                  }
                })}
              ></textarea>
              {errors.whyAdopt ? (
                <p className="mt-1 text-sm text-red-600">{errors.whyAdopt.message}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 50 characters. {watch('whyAdopt')?.length || 0}/50 characters
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="lifestyle" className="block text-sm font-medium text-gray-700 mb-1">
                Describe your lifestyle and daily routine *
              </label>
              <textarea
                id="lifestyle"
                rows="3"
                className={`input w-full ${errors.lifestyle ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Tell us about your daily routine, activity level, etc..."
                {...register('lifestyle', { 
                  required: 'Please describe your lifestyle',
                  minLength: {
                    value: 50,
                    message: 'Please provide more details (minimum 50 characters)'
                  }
                })}
              ></textarea>
              {errors.lifestyle ? (
                <p className="mt-1 text-sm text-red-600">{errors.lifestyle.message}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 50 characters. {watch('lifestyle')?.length || 0}/50 characters
                </p>
              )}
            </div>
            
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="h-4 w-4 mt-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  {...register('agreeToTerms', { required: 'You must agree to the terms' })}
                />
                <span className="ml-2 text-sm text-gray-600">
                  I understand that adopting a pet is a long-term commitment and I am prepared to care for this pet for its entire life. I agree to the shelter's <a href="#" className="text-primary-600">terms and conditions</a>. *
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>
              )}
            </div>
            
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="h-4 w-4 mt-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  {...register('agreeToHomeCheck')}
                />
                <span className="ml-2 text-sm text-gray-600">
                  I am willing to allow a representative to conduct a home check prior to adoption.
                </span>
              </label>
            </div>
          </motion.div>
        )}
        
        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <FiArrowLeft className="mr-2" />
              Previous
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
          )}
          
          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn btn-primary px-6 py-2 rounded-md flex items-center"
            >
              Next Step
              <FiArrowRight className="ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-md flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <FiFileText className="mr-2" />
                  Submit Application
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default AdoptionApplicationForm