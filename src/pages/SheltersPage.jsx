import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiMapPin, FiPhone, FiMail, FiExternalLink, FiStar } from 'react-icons/fi'
import { motion } from 'framer-motion'

const SheltersPage = () => {
  const [shelters, setShelters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDistance, setFilterDistance] = useState('')
  
  // Simulated fetch shelters
  useEffect(() => {
    const fetchShelters = async () => {
      // Simulate API call delay
      setTimeout(() => {
        // Mock shelter data
        const mockShelters = [
          {
            id: '1',
            name: 'Happy Tails Rescue',
            image: 'https://images.pexels.com/photos/1612861/pexels-photo-1612861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'A non-profit rescue dedicated to finding homes for dogs and cats. We focus on rescuing animals from high-kill shelters and providing them with loving foster homes until they find their forever families.',
            location: 'San Francisco, CA',
            distance: 5.2,
            phone: '(415) 555-1234',
            email: 'info@happytailsrescue.org',
            website: 'https://happytailsrescue.org',
            rating: 4.9,
            reviewCount: 127,
            petsAvailable: 18
          },
          {
            id: '2',
            name: 'Feline Friends Shelter',
            image: 'https://images.pexels.com/photos/7725610/pexels-photo-7725610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'Specializing in cat rescue and adoption, we provide shelter, medical care, and love to homeless cats. Our mission is to reduce the number of stray cats through adoption and TNR programs.',
            location: 'Los Angeles, CA',
            distance: 25.8,
            phone: '(213) 555-5678',
            email: 'contact@felinefriends.org',
            website: 'https://felinefriends.org',
            rating: 4.7,
            reviewCount: 93,
            petsAvailable: 24
          },
          {
            id: '3',
            name: 'Midwest Animal Rescue',
            image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'A comprehensive animal welfare organization that rescues, rehabilitates, and rehomes pets. We also provide community education and low-cost veterinary services to promote responsible pet ownership.',
            location: 'Chicago, IL',
            distance: 1820.5,
            phone: '(312) 555-9012',
            email: 'info@midwestanimalrescue.org',
            website: 'https://midwestanimalrescue.org',
            rating: 4.8,
            reviewCount: 156,
            petsAvailable: 32
          },
          {
            id: '4',
            name: 'NYC Pet Rescue',
            image: 'https://images.pexels.com/photos/6685484/pexels-photo-6685484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'Serving the five boroughs of New York City, we rescue dogs and cats from overcrowded city shelters. Our network of foster homes provides care until permanent homes are found.',
            location: 'New York, NY',
            distance: 2910.3,
            phone: '(212) 555-3456',
            email: 'adopt@nycpetrescue.org',
            website: 'https://nycpetrescue.org',
            rating: 4.6,
            reviewCount: 204,
            petsAvailable: 45
          },
          {
            id: '5',
            name: 'Texas Paws Rescue',
            image: 'https://images.pexels.com/photos/11398590/pexels-photo-11398590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'A volunteer-run rescue focused on saving animals from rural shelters across Texas. We specialize in finding homes for large breed dogs and dogs with special needs that would otherwise be overlooked.',
            location: 'Austin, TX',
            distance: 1503.7,
            phone: '(512) 555-7890',
            email: 'info@texaspawsrescue.org',
            website: 'https://texaspawsrescue.org',
            rating: 4.8,
            reviewCount: 111,
            petsAvailable: 29
          },
          {
            id: '6',
            name: 'Seattle Animal Shelter',
            image: 'https://images.pexels.com/photos/3280908/pexels-photo-3280908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'The city\'s official animal shelter, providing care for lost, stray, and abandoned animals. We offer adoption services, pet licensing, and animal control for the Seattle area.',
            location: 'Seattle, WA',
            distance: 808.5,
            phone: '(206) 555-2345',
            email: 'adopt@seattleanimalshelter.org',
            website: 'https://seattleanimalshelter.org',
            rating: 4.5,
            reviewCount: 178,
            petsAvailable: 37
          },
          {
            id: '7',
            name: 'Rocky Mountain Cat Rescue',
            image: 'https://images.pexels.com/photos/7725687/pexels-photo-7725687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'A no-kill cat shelter nestled in the Rocky Mountains. We rescue cats and kittens from challenging situations, provide them with medical care, and find them loving homes throughout Colorado.',
            location: 'Denver, CO',
            distance: 947.2,
            phone: '(303) 555-6789',
            email: 'contact@rockymountaincatrescue.org',
            website: 'https://rockymountaincatrescue.org',
            rating: 4.7,
            reviewCount: 95,
            petsAvailable: 21
          },
          {
            id: '8',
            name: 'Desert Paws Shelter',
            image: 'https://images.pexels.com/photos/6131655/pexels-photo-6131655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'Serving the greater Phoenix area, we rescue and rehabilitate dogs and cats from across Arizona. Our mission is to reduce pet homelessness through adoption, spay/neuter programs, and community education.',
            location: 'Phoenix, AZ',
            distance: 750.8,
            phone: '(602) 555-0123',
            email: 'info@desertpawsshelter.org',
            website: 'https://desertpawsshelter.org',
            rating: 4.6,
            reviewCount: 87,
            petsAvailable: 26
          }
        ]
        
        setShelters(mockShelters)
        setIsLoading(false)
      }, 1000)
    }
    
    fetchShelters()
  }, [])
  
  // Filter shelters based on search query and distance
  const filteredShelters = shelters.filter(shelter => {
    const matchesSearch = shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelter.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelter.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filter by distance if selected
    if (filterDistance) {
      const distance = parseFloat(filterDistance)
      return matchesSearch && shelter.distance <= distance
    }
    
    return matchesSearch
  })
  
  // Get rating stars
  const getRatingStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 >= 0.5
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={`full-${i}`} className="fill-current text-yellow-500" />)
    }
    
    if (halfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2L9.88 8.76H3.24L8.68 13.04L6.96 19.76L12 15.66V2Z" />
          <path fillOpacity="0.3" fill="currentColor" d="M12 2V15.66L17.04 19.76L15.32 13.04L20.76 8.76H14.12L12 2Z" />
        </svg>
      )
    }
    
    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="text-gray-300" />)
    }
    
    return stars
  }
  
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Find Animal Shelters & Rescues
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Discover shelters and rescue organizations in your area that are helping animals find their forever homes
          </motion.p>
          
          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input pl-10 w-full"
                  placeholder="Search by name, location, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="md:w-64">
                <select
                  className="input w-full"
                  value={filterDistance}
                  onChange={(e) => setFilterDistance(e.target.value)}
                >
                  <option value="">Any Distance</option>
                  <option value="10">Within 10 miles</option>
                  <option value="25">Within 25 miles</option>
                  <option value="50">Within 50 miles</option>
                  <option value="100">Within 100 miles</option>
                  <option value="1000">Within 1000 miles</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Results Section */}
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {isLoading 
                ? 'Loading shelters...' 
                : `${filteredShelters.length} ${filteredShelters.length === 1 ? 'shelter' : 'shelters'} found`
              }
            </h2>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredShelters.length > 0 ? (
            <div className="space-y-6">
              {filteredShelters.map((shelter) => (
                <motion.div
                  key={shelter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 h-48 md:h-auto md:w-48">
                      <img 
                        src={shelter.image} 
                        alt={shelter.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex-grow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{shelter.name}</h3>
                          <div className="flex items-center mb-2">
                            <div className="flex">
                              {getRatingStars(shelter.rating)}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">
                              {shelter.rating} ({shelter.reviewCount} reviews)
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm mb-4">
                            <FiMapPin className="mr-1" />
                            <span>{shelter.location} • {shelter.distance.toFixed(1)} miles away</span>
                          </div>
                        </div>
                        <div className="text-sm md:text-right mt-2 md:mt-0">
                          <div className="flex items-center md:justify-end mb-1">
                            <FiPhone className="mr-1 text-primary-600" />
                            <a href={`tel:${shelter.phone}`} className="text-primary-600 hover:text-primary-700">
                              {shelter.phone}
                            </a>
                          </div>
                          <div className="flex items-center md:justify-end mb-1">
                            <FiMail className="mr-1 text-primary-600" />
                            <a href={`mailto:${shelter.email}`} className="text-primary-600 hover:text-primary-700">
                              {shelter.email}
                            </a>
                          </div>
                          <div className="flex items-center md:justify-end">
                            <FiExternalLink className="mr-1 text-primary-600" />
                            <a href={shelter.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                              Visit Website
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mt-4">{shelter.description}</p>
                      
                      <div className="mt-6 flex flex-wrap justify-between items-center">
                        <div className="bg-primary-50 text-primary-700 rounded-full px-3 py-1 text-sm font-medium">
                          {shelter.petsAvailable} pets available
                        </div>
                        
                        <Link 
                          to={`/shelters/${shelter.id}`} 
                          className="btn btn-primary py-2 rounded-md text-sm mt-4 md:mt-0"
                        >
                          View Shelter Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 mb-4">
                <FiSearch className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No shelters found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any shelters matching your search criteria.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('')
                  setFilterDistance('')
                }}
                className="btn btn-primary rounded-md"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Partnership CTA */}
        <div className="mt-16 max-w-4xl mx-auto bg-primary-600 text-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold mb-4">Are you a shelter or rescue?</h2>
              <p className="mb-6">
                Partner with PawfectMatch to reach more adopters and find loving homes for your animals. Our platform is free for registered non-profit shelters.
              </p>
              <Link 
                to="/contact" 
                className="btn bg-white text-primary-600 hover:bg-gray-100 py-2 px-6 rounded-md font-medium inline-block"
              >
                Join Our Network
              </Link>
            </div>
            <div className="md:w-1/2 bg-primary-700 p-8">
              <h3 className="text-xl font-semibold mb-4">Partnership Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free listing of all adoptable pets
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Streamlined adoption application process
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Increased visibility to potential adopters
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Tools to manage animals and applications
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SheltersPage