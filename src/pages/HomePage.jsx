import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiArrowRight, FiHeart, FiHome, FiUsers } from 'react-icons/fi'
import { fetchFeaturedPets } from '../services/petService'
import PetCard from '../components/pets/PetCard'
import { motion } from 'framer-motion'
import HeroBg from '../assets/hero-bg.jpg'
import TestimonialCard from '../components/home/TestimonialCard'
import SubscribeForm from '../components/home/SubscribeForm'

const HomePage = () => {
  const [featuredPets, setFeaturedPets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Fetch featured pets on mount
  useEffect(() => {
    const loadFeaturedPets = async () => {
      try {
        const pets = await fetchFeaturedPets()
        setFeaturedPets(pets)
      } catch (error) {
        console.error('Error loading featured pets:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadFeaturedPets()
  }, [])
  
  // Mock statistics
  const statistics = [
    { 
      icon: <FiHeart className="text-primary-500 text-4xl" />,
      count: '10,000+',
      label: 'Pets Adopted'
    },
    { 
      icon: <FiHome className="text-primary-500 text-4xl" />,
      count: '500+',
      label: 'Shelter Partners'
    },
    { 
      icon: <FiUsers className="text-primary-500 text-4xl" />,
      count: '25,000+',
      label: 'Active Users'
    }
  ]
  
  // Mock testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Emma Thompson',
      location: 'San Francisco, CA',
      image: 'https://randomuser.me/api/portraits/women/17.jpg',
      text: 'PawfectMatch made finding our furry family member so easy! The process was smooth from browsing to bringing our dog home. We couldn\'t be happier with our new companion.',
      petImage: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      location: 'Austin, TX',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      text: 'After searching for months, I found my perfect cat companion on PawfectMatch in just one day. The detailed profiles helped me find exactly what I was looking for.',
      petImage: 'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      name: 'Sarah Miller',
      location: 'Chicago, IL',
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
      text: 'As a shelter, we\'ve been able to find homes for twice as many animals since joining PawfectMatch. The platform is intuitive and our adoption rates have never been higher!',
      petImage: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ]
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="h-screen relative flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://plus.unsplash.com/premium_photo-1663100756478-1148a734dcbe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center text-white z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Find Your Perfect Furry Companion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Connect with shelters and pet owners. Adopt a pet and change two lives forever.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/pets" className="btn bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md text-lg font-medium">
              Adopt Now
            </Link>
            <Link to="/about" className="btn bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-md text-lg font-medium backdrop-blur-sm">
              Learn More
            </Link>
          </motion.div>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 max-w-xl mx-auto"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search for dogs, cats, and more..."
                className="w-full px-5 py-4 pr-12 rounded-full text-gray-900 bg-white/90 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Link 
                to="/pets" 
                className="absolute right-2 p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full"
              >
                <FiSearch className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path 
              d="M12 5L12 19M12 19L19 12M12 19L5 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      
      {/* Featured Pets Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Pets</h2>
              <p className="text-gray-600 mt-2">Meet some of our adorable friends looking for a forever home</p>
            </div>
            <Link to="/pets" className="flex items-center text-primary-600 font-medium hover:text-primary-700">
              View all pets <FiArrowRight className="ml-2" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Making a Difference Together</h2>
            <p className="text-primary-100">
              We're on a mission to find loving homes for every pet in need. 
              Join us in making a difference in the lives of animals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-primary-700/60 backdrop-blur-sm p-8 rounded-lg text-center"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold mb-2">{stat.count}</h3>
                <p className="text-primary-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Adoption Works</h2>
            <p className="text-gray-600">
              Our streamlined process makes finding your perfect pet companion simple and enjoyable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-lg text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse Available Pets</h3>
              <p className="text-gray-600">
                Search through our database of pets from shelters and individuals looking to rehome their pets.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-lg text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply to Adopt</h3>
              <p className="text-gray-600">
                Submit an adoption application for the pet that catches your eye and steals your heart.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-lg text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Meet Your New Friend</h3>
              <p className="text-gray-600">
                Schedule a meet-and-greet with the pet, finalize the adoption, and welcome them to their forever home.
              </p>
            </motion.div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/pets" className="btn btn-primary px-8 py-3 rounded-md text-lg font-medium">
              Find Your Pet
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-600">
              Hear from pet parents who found their perfect companions through PawfectMatch
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/success-stories" className="text-primary-600 font-medium hover:text-primary-700 flex items-center justify-center">
              Read more success stories <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-accent-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-white/90 mb-8">
              Subscribe to our newsletter for adoption tips, success stories, and updates on new pets available for adoption.
            </p>
            <SubscribeForm />
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage