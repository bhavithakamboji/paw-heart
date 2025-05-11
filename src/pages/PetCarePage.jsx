import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiBookOpen, FiVideo, FiFileText, FiArrowRight, FiCheck } from 'react-icons/fi'
import { motion } from 'framer-motion'

const PetCarePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  
  // Categories for resources
  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'dogs', label: 'Dogs' },
    { id: 'cats', label: 'Cats' },
    { id: 'small-pets', label: 'Small Pets' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'health', label: 'Health & Wellness' },
    { id: 'training', label: 'Training' },
    { id: 'behavior', label: 'Behavior' }
  ]
  
  // Mock resources data
  const resources = [
    {
      id: 1,
      title: 'New Pet Adoption Guide: The First 30 Days',
      type: 'article',
      categories: ['dogs', 'cats', 'small-pets'],
      image: 'https://images.pexels.com/photos/7210748/pexels-photo-7210748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'A comprehensive guide to help your new pet adjust to their forever home. Learn what to expect and how to create a smooth transition for your new family member.',
      author: 'Dr. Emma Wilson',
      date: 'June 15, 2023',
      readTime: '12 min read',
      featured: true
    },
    {
      id: 2,
      title: 'Basic Dog Training: Commands Every Dog Should Know',
      type: 'video',
      categories: ['dogs', 'training'],
      image: 'https://images.pexels.com/photos/3628100/pexels-photo-3628100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Learn how to teach your dog essential commands like sit, stay, come, and more. This step-by-step video tutorial is perfect for new dog owners.',
      author: 'Mark Johnson, Professional Dog Trainer',
      date: 'May 22, 2023',
      duration: '18 min video',
      featured: false
    },
    {
      id: 3,
      title: 'Understanding Cat Body Language',
      type: 'article',
      categories: ['cats', 'behavior'],
      image: 'https://images.pexels.com/photos/1828875/pexels-photo-1828875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Decode what your cat is trying to tell you through their body language and vocalizations. Learn to recognize signs of happiness, stress, and everything in between.',
      author: 'Sophia Martinez, Feline Behaviorist',
      date: 'April 8, 2023',
      readTime: '8 min read',
      featured: true
    },
    {
      id: 4,
      title: 'Nutritional Needs for Senior Dogs',
      type: 'guide',
      categories: ['dogs', 'nutrition', 'health'],
      image: 'https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'As dogs age, their nutritional requirements change. This comprehensive guide covers everything you need to know about feeding your senior dog for optimal health and longevity.',
      author: 'Dr. James Carter, Veterinary Nutritionist',
      date: 'March 15, 2023',
      readTime: '15 min read',
      featured: false
    },
    {
      id: 5,
      title: 'Caring for Guinea Pigs: Housing, Diet, and Health',
      type: 'article',
      categories: ['small-pets', 'nutrition', 'health'],
      image: 'https://images.pexels.com/photos/3493730/pexels-photo-3493730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Everything you need to know about properly caring for guinea pigs, from cage setup to dietary requirements and common health concerns.',
      author: 'Dr. Lisa Wang, Exotic Pet Specialist',
      date: 'February 28, 2023',
      readTime: '10 min read',
      featured: false
    },
    {
      id: 6,
      title: 'Solving Common Cat Behavior Problems',
      type: 'video',
      categories: ['cats', 'behavior', 'training'],
      image: 'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Address issues like scratching furniture, litter box problems, and aggression with proven techniques from a certified animal behaviorist.',
      author: 'Dr. Amelia Brooks, Animal Behaviorist',
      date: 'January 12, 2023',
      duration: '25 min video',
      featured: false
    },
    {
      id: 7,
      title: 'Pet First Aid Essentials',
      type: 'guide',
      categories: ['dogs', 'cats', 'small-pets', 'health'],
      image: 'https://images.pexels.com/photos/6235231/pexels-photo-6235231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Learn essential first aid skills for pet emergencies, including what to include in your pet first aid kit and when to contact your veterinarian immediately.',
      author: 'Dr. Robert Smith, Emergency Veterinarian',
      date: 'December 5, 2022',
      readTime: '20 min read',
      featured: false
    },
    {
      id: 8,
      title: 'Understanding Puppy Development Stages',
      type: 'article',
      categories: ['dogs', 'behavior'],
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'A comprehensive look at the physical and behavioral development of puppies from birth to adulthood, with tips for each stage.',
      author: 'Dr. Michael Johnson, Canine Development Specialist',
      date: 'November 18, 2022',
      readTime: '14 min read',
      featured: false
    },
    {
      id: 9,
      title: 'Healthy Homemade Cat Treats',
      type: 'video',
      categories: ['cats', 'nutrition'],
      image: 'https://images.pexels.com/photos/3616232/pexels-photo-3616232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Learn to make nutritious and delicious treats for your feline friend with simple, cat-safe ingredients you already have in your kitchen.',
      author: 'Sarah Williams, Pet Nutrition Expert',
      date: 'October 30, 2022',
      duration: '12 min video',
      featured: false
    }
  ]
  
  // Filter resources based on active tab and search query
  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeTab === 'all' || resource.categories.includes(activeTab)
    const matchesSearch = !searchQuery || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })
  
  // Get resource type icon
  const getResourceTypeIcon = (type) => {
    switch (type) {
      case 'article':
        return <FiBookOpen className="w-5 h-5" />
      case 'video':
        return <FiVideo className="w-5 h-5" />
      case 'guide':
        return <FiFileText className="w-5 h-5" />
      default:
        return <FiBookOpen className="w-5 h-5" />
    }
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
            Pet Care Resources
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Expert advice and guidance to help you provide the best care for your furry, feathered, or scaly companions
          </motion.p>
          
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative max-w-xl mx-auto"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10 w-full"
              placeholder="Search for resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
        
        {/* Category Tabs */}
        <div className="mb-10">
          <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  activeTab === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Featured Resources */}
        {(!searchQuery && activeTab === 'all') && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {resources
                .filter(resource => resource.featured)
                .map(resource => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="md:flex h-full">
                      <div className="md:w-2/5">
                        <img 
                          src={resource.image} 
                          alt={resource.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-3/5">
                        <div className="flex items-center text-sm text-primary-600 mb-2">
                          <span className="flex items-center">
                            {getResourceTypeIcon(resource.type)}
                            <span className="ml-2 font-medium capitalize">{resource.type}</span>
                          </span>
                          <span className="mx-2">•</span>
                          <span>{resource.readTime || resource.duration}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                        
                        <p className="text-gray-600 mb-4">{resource.description}</p>
                        
                        <div className="flex justify-between items-end mt-auto">
                          <div className="text-sm text-gray-500">
                            By {resource.author}
                          </div>
                          <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                            Read More
                            <FiArrowRight className="ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
        
        {/* All Resources or Filtered Results */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchQuery 
              ? `Search Results (${filteredResources.length})`
              : activeTab !== 'all'
                ? `${categories.find(c => c.id === activeTab).label} (${filteredResources.length})`
                : 'All Resources'
            }
          </h2>
          
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={resource.image} 
                      alt={resource.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-sm text-primary-600 mb-2">
                      <span className="flex items-center">
                        {getResourceTypeIcon(resource.type)}
                        <span className="ml-2 font-medium capitalize">{resource.type}</span>
                      </span>
                      <span className="mx-2">•</span>
                      <span>{resource.readTime || resource.duration}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">{resource.description}</p>
                    
                    <div className="mt-auto pt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {resource.date}
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                        Read More
                      </button>
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any resources matching your search criteria.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('')
                  setActiveTab('all')
                }}
                className="btn btn-primary rounded-md"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Pet Care Checklist */}
        <div className="bg-primary-50 rounded-lg shadow-md p-8 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Essential Pet Care Checklist</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Care</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Provide fresh, clean water at all times</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Feed appropriate high-quality food based on age, weight, and activity level</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Provide regular exercise appropriate for your pet's age and breed</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Clean litter boxes, cages, or tanks as needed</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Spend quality time together for bonding and mental stimulation</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Regular Health Care</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Schedule annual veterinary check-ups</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Stay current on vaccinations and preventative medications</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Regular grooming, brushing, and dental care</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Monitor weight to prevent obesity</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Watch for changes in behavior, appetite, or energy levels</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link 
                to="#" 
                className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
              >
                Download Complete Checklist
                <FiArrowRight className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Ask a Vet CTA */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-primary-600 p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Have Pet Care Questions?</h2>
              <p className="mb-6">
                Our network of veterinarians and pet care experts can provide personalized advice for your pet's specific needs.
              </p>
              <Link 
                to="/contact" 
                className="btn bg-white text-primary-600 hover:bg-gray-100 py-2 px-6 rounded-md font-medium inline-block"
              >
                Ask a Vet
              </Link>
            </div>
            <div className="md:w-1/2 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Questions</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-primary-600 hover:text-primary-700 hover:underline">
                    How often should I take my pet to the vet?
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-primary-600 hover:text-primary-700 hover:underline">
                    What are signs my pet might be sick?
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-primary-600 hover:text-primary-700 hover:underline">
                    How can I help my pet maintain a healthy weight?
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-primary-600 hover:text-primary-700 hover:underline">
                    What foods are toxic to dogs and cats?
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-primary-600 hover:text-primary-700 hover:underline">
                    How can I help my anxious pet?
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetCarePage