import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  FiArrowLeft, FiHeart, FiShare2, FiMapPin, FiInfo,
  FiCheckCircle, FiXCircle, FiMessageSquare, FiX
} from 'react-icons/fi'
import { fetchPetById, submitApplication } from '../services/petService'
import { useAuth } from '../context/AuthContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import AdoptionApplicationForm from '../components/pets/AdoptionApplicationForm'

const PetDetailsPage = () => {
  const { id } = useParams()
  const [pet, setPet] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showApplication, setShowApplication] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const loadPet = async () => {
      setIsLoading(true)
      try {
        const petData = await fetchPetById(id)
        setPet(petData)
        setIsFavorite(petData.isFavorite || false)
      } catch (error) {
        console.error('Error loading pet details:', error)
        toast.error('Failed to load pet details')
      } finally {
        setIsLoading(false)
      }
    }

    loadPet()
  }, [id])

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      toast.error('Please login to save pets to your favorites')
      return
    }
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites')
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  const handleAdoptApplication = () => {
    if (!isAuthenticated) {
      toast.error('Please login to submit an adoption application')
      return
    }
    setShowApplication(true)
  }

  const handleApplicationSubmit = async (data) => {
    try {
      await submitApplication(id, data)
      setApplicationSubmitted(true)
      setShowApplication(false)
      toast.success('Your application has been submitted successfully!')
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error('Failed to submit application. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 animate-pulse">
          <div className="h-6 w-1/4 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 w-2/3 bg-gray-200 rounded mb-8"></div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-3/5">
              <div className="h-96 bg-gray-200 rounded-lg mb-6"></div>
              <div className="flex gap-2 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 w-24 bg-gray-200 rounded"></div>
                ))}
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-4 bg-gray-200 rounded mb-3 w-${(6 + i) * 10 / 6}`}></div>
              ))}
            </div>
            <div className="lg:w-2/5">
              <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
              <div className="h-40 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!pet) {
    return (
      <div className="pt-24 pb-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pet Not Found</h2>
          <p className="text-gray-600 mb-8">
            We couldn't find the pet you're looking for.
          </p>
          <Link to="/pets" className="btn btn-primary rounded-md">
            Browse All Pets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/pets" className="flex items-center text-primary-600 hover:text-primary-700">
            <FiArrowLeft className="mr-2" />
            Back to all pets
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/5">
            {/* Swiper image gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop
                className="h-96 w-full"
              >
                {pet.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${pet.name} - image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{pet.name}</h1>
                  <p className="text-gray-600">{pet.breed} • {pet.age} • {pet.gender}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleFavoriteToggle}
                    className={`p-2 rounded-full ${
                      isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <FiHeart className={isFavorite ? 'fill-current' : ''} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <FiShare2 />
                  </button>
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <FiMapPin className="mr-1" />
                <span>{pet.location} • {pet.distance} miles away</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {pet.traits.map((trait, index) => (
                  <span key={index} className="badge badge-primary">
                    {trait}
                  </span>
                ))}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">About {pet.name}</h2>
                <p className="text-gray-700 mb-4">{pet.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Health & Care</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    {pet.healthRecords.vaccinated ? (
                      <FiCheckCircle className="text-success-500 mr-2" />
                    ) : (
                      <FiXCircle className="text-error-500 mr-2" />
                    )}
                    <span>Vaccinated</span>
                  </div>
                  <div className="flex items-center">
                    {pet.healthRecords.neutered ? (
                      <FiCheckCircle className="text-success-500 mr-2" />
                    ) : (
                      <FiXCircle className="text-error-500 mr-2" />
                    )}
                    <span>Spayed/Neutered</span>
                  </div>
                  <div className="flex items-center">
                    {pet.healthRecords.microchipped ? (
                      <FiCheckCircle className="text-success-500 mr-2" />
                    ) : (
                      <FiXCircle className="text-error-500 mr-2" />
                    )}
                    <span>Microchipped</span>
                  </div>
                  <div className="flex items-center">
                    {pet.healthRecords.specialNeeds ? (
                      <FiCheckCircle className="text-warning-500 mr-2" />
                    ) : (
                      <FiXCircle className="text-success-500 mr-2" />
                    )}
                    <span>Special Needs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Adoption Status</h2>
                <span className={`badge ${
                  pet.status === 'Available' ? 'badge-success' : 'badge-warning'
                }`}>
                  {pet.status}
                </span>
              </div>

              {applicationSubmitted ? (
                <div className="bg-success-50 border border-success-200 rounded-lg p-4 text-center mb-6">
                  <FiCheckCircle className="text-success-500 text-2xl mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-success-700 mb-1">Application Submitted!</h3>
                  <p className="text-success-600">
                    The shelter will review your application and contact you soon.
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleAdoptApplication}
                  disabled={pet.status !== 'Available'}
                  className="w-full btn bg-accent-500 hover:bg-accent-600 text-white py-3 px-4 rounded-md font-medium text-center mb-4 disabled:opacity-60 disabled:hover:bg-accent-500"
                >
                  Adopt Me
                </button>
              )}

              <button className="w-full flex justify-center items-center btn btn-secondary py-3 px-4 rounded-md font-medium">
                <FiMessageSquare className="mr-2" />
                Message Shelter
              </button>

              <div className="mt-6 text-sm text-gray-600">
                <p className="flex items-start">
                  <FiInfo className="text-primary-500 mr-2 mt-1" />
                  <span>
                    Interested in adopting {pet.name}? Submit an application and the shelter will 
                    contact you to schedule a meet-and-greet.
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shelter Information</h2>
              <div className="flex items-center mb-4">
                <img 
                  src={pet.shelter.image} 
                  alt={pet.shelter.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{pet.shelter.name}</h3>
                  <p className="text-gray-600 text-sm">{pet.shelter.location}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <p className="flex items-center text-gray-700">
                  <span className="font-medium w-16">Phone:</span>
                  <a href={`tel:${pet.shelter.phone}`} className="text-primary-600 hover:text-primary-700">
                    {pet.shelter.phone}
                  </a>
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="font-medium w-16">Email:</span>
                  <a href={`mailto:${pet.shelter.email}`} className="text-primary-600 hover:text-primary-700">
                    {pet.shelter.email}
                  </a>
                </p>
              </div>

              <Link to={`/shelters/1`} className="text-primary-600 font-medium hover:text-primary-700 flex items-center">
                View shelter profile
                <FiArrowLeft className="ml-1 transform rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Adoption Application</h2>
                <button
                  onClick={() => setShowApplication(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              <AdoptionApplicationForm
                petName={pet.name}
                onSubmit={handleApplicationSubmit}
                onCancel={() => setShowApplication(false)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default PetDetailsPage
