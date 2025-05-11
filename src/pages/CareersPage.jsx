import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiMapPin, FiClock, FiBriefcase, FiSend, FiCheck } from 'react-icons/fi'
import { motion } from 'framer-motion'

const CareersPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  
  // Mock job listings
  const jobListings = [
    {
      id: 1,
      title: 'Software Engineer, Frontend',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Join our engineering team to build beautiful, user-friendly interfaces for our pet adoption platform. You\'ll work with React, TailwindCSS, and modern JavaScript to create features that help connect pets with their forever homes.',
      requirements: [
        'Proficiency in JavaScript, HTML, CSS, and modern frontend frameworks (React preferred)',
        '3+ years of professional frontend development experience',
        'Experience with responsive design and cross-browser compatibility',
        'Strong understanding of web accessibility standards',
        'Basic knowledge of UI/UX design principles'
      ],
      postedDate: '2023-07-01'
    },
    {
      id: 2,
      title: 'Animal Welfare Specialist',
      department: 'Operations',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      description: 'Use your expertise in animal behavior and welfare to help develop standards and processes for shelters on our platform. You\'ll work closely with shelters to ensure pets receive proper care while awaiting adoption.',
      requirements: [
        'Degree in Animal Science, Veterinary Technology, or related field',
        '5+ years of experience working in animal shelter management',
        'Certified Animal Welfare Administrator (CAWA) preferred',
        'Strong understanding of animal behavior and health',
        'Experience developing and implementing animal welfare policies'
      ],
      postedDate: '2023-06-28'
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design intuitive, accessible interfaces for our web and mobile applications. You\'ll create wireframes, prototypes, and high-fidelity designs that make the adoption process seamless for users.',
      requirements: [
        'Portfolio demonstrating strong UX/UI design skills',
        '3+ years of experience designing digital products',
        'Proficiency with design tools such as Figma, Sketch, or Adobe XD',
        'Experience conducting user research and usability testing',
        'Knowledge of accessibility standards and inclusive design principles'
      ],
      postedDate: '2023-06-25'
    },
    {
      id: 4,
      title: 'Content Marketing Specialist',
      department: 'Marketing',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Create compelling content about pet adoption, care, and welfare. You\'ll develop educational resources, success stories, and marketing materials that inspire people to adopt pets and provide them with the best care.',
      requirements: [
        'Bachelor\'s degree in Marketing, Communications, Journalism, or related field',
        '3+ years of content marketing experience',
        'Excellent writing skills with the ability to adapt tone and style for different audiences',
        'Experience with SEO best practices',
        'Passion for animal welfare and pet adoption'
      ],
      postedDate: '2023-06-20'
    },
    {
      id: 5,
      title: 'Shelter Relations Manager',
      department: 'Operations',
      location: 'Chicago, IL',
      type: 'Full-time',
      description: 'Build and maintain relationships with animal shelters and rescue organizations. You\'ll onboard new shelter partners, provide training and support, and ensure they maximize the benefits of our platform.',
      requirements: [
        'Previous experience in partner management or account management',
        'Understanding of animal shelter operations and challenges',
        'Strong communication and relationship-building skills',
        'Problem-solving abilities and commitment to customer success',
        'Willingness to travel occasionally to visit shelter partners'
      ],
      postedDate: '2023-06-15'
    },
    {
      id: 6,
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Remote',
      type: 'Full-time',
      description: 'Analyze adoption trends, user behavior, and platform metrics to drive data-informed decisions. You\'ll build dashboards, generate reports, and provide insights that help more pets find homes.',
      requirements: [
        'Bachelor\'s degree in Data Science, Statistics, or related field',
        '2+ years of experience in data analysis',
        'Proficiency with SQL and data visualization tools',
        'Experience with Python or R for data analysis',
        'Ability to communicate complex data insights to non-technical stakeholders'
      ],
      postedDate: '2023-06-10'
    },
    {
      id: 7,
      title: 'Customer Support Specialist',
      department: 'Customer Support',
      location: 'Austin, TX',
      type: 'Full-time',
      description: 'Provide exceptional support to users and shelter partners. You\'ll assist with platform inquiries, adoption process questions, and technical issues while maintaining our high standards for customer service.',
      requirements: [
        'Previous customer service experience',
        'Excellent written and verbal communication skills',
        'Problem-solving abilities and patience',
        'Ability to work in a fast-paced environment',
        'Passion for animals and pet adoption'
      ],
      postedDate: '2023-06-05'
    },
    {
      id: 8,
      title: 'Mobile Developer (iOS)',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Develop and maintain our iOS mobile application. You\'ll work with Swift and modern iOS frameworks to create a seamless mobile experience for users looking to adopt pets.',
      requirements: [
        'Proficiency in Swift and experience with iOS development',
        '3+ years of professional mobile development experience',
        'Knowledge of iOS design patterns and best practices',
        'Experience with REST APIs and mobile app architecture',
        'Understanding of App Store submission process'
      ],
      postedDate: '2023-06-01'
    }
  ]
  
  // Calculate days since posted
  const calculateDaysAgo = (dateString) => {
    const postedDate = new Date(dateString)
    const today = new Date()
    const diffTime = today - postedDate
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else {
      return `${diffDays} days ago`
    }
  }
  
  // Filter jobs based on search query and filters
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDepartment = !departmentFilter || job.department === departmentFilter
    const matchesLocation = !locationFilter || job.location === locationFilter
    
    return matchesSearch && matchesDepartment && matchesLocation
  })
  
  // Get unique departments and locations for filters
  const departments = [...new Set(jobListings.map(job => job.department))]
  const locations = [...new Set(jobListings.map(job => job.location))]
  
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
            Join Our Mission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Help us connect loving homes with pets in need. Explore opportunities to make a difference in animal welfare.
          </motion.p>
          
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input pl-10 w-full"
                  placeholder="Search for jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-2/5">
                <select
                  className="input"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                
                <select
                  className="input"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                <FiCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Animal-First Mindset</h3>
              <p className="text-gray-600">
                We believe every animal deserves love, care, and a safe home. This belief drives all our decisions and innovations.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                <FiCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Inclusive Community</h3>
              <p className="text-gray-600">
                We build technology that enables everyone to participate in pet adoption, regardless of background or circumstance.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                <FiCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Continuous Innovation</h3>
              <p className="text-gray-600">
                We're constantly improving our platform and processes to create better outcomes for pets and people.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Job Listings */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchQuery || departmentFilter || locationFilter
              ? `${filteredJobs.length} ${filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found`
              : 'Open Positions'
            }
          </h2>
          
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2">
                        <div className="flex items-center text-gray-600 text-sm">
                          <FiBriefcase className="mr-1" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <FiMapPin className="mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <FiClock className="mr-1" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      Posted {calculateDaysAgo(job.postedDate)}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 my-4">{job.description}</p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                    <ul className="list-disc text-gray-600 pl-5 space-y-1">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                      {job.requirements.length > 3 && (
                        <li>+{job.requirements.length - 3} more requirements</li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Link to="#" className="btn btn-primary rounded-md">
                      View and Apply
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 mb-4">
                <FiSearch className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any jobs matching your search criteria.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('')
                  setDepartmentFilter('')
                  setLocationFilter('')
                }}
                className="btn btn-primary rounded-md"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Benefits Section */}
        <div className="bg-primary-50 rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Work With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Comprehensive health, dental, and vision insurance</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Flexible work arrangements with remote options</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Generous paid time off and parental leave</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                  <span>401(k) matching program</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Pet adoption support and pet-friendly offices</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Professional development budget for growth opportunities</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Culture</h3>
              <p className="text-gray-600 mb-4">
                At PawfectMatch, we've built a culture that combines a passion for animal welfare with a drive for technological innovation. Our team includes animal lovers, tech enthusiasts, and mission-driven professionals who collaborate to make pet adoption easier and more accessible.
              </p>
              <p className="text-gray-600 mb-4">
                We celebrate diversity, encourage open communication, and believe in work-life balance. Many of our team members are pet parents themselves, and pets are welcome in our offices.
              </p>
              <p className="text-gray-600">
                Whether you're working remotely or in-office, you'll be part of a supportive community that values your contributions and gives you opportunities to grow professionally while making a meaningful impact.
              </p>
            </div>
          </div>
        </div>
        
        {/* No Positions Available CTA */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Don't See the Right Position?</h2>
          <p className="text-gray-600 mb-6">
            We're always looking for talented people who are passionate about our mission. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Link 
            to="/contact" 
            className="btn btn-primary py-2 px-6 rounded-md inline-flex items-center"
          >
            <FiSend className="mr-2" />
            Submit Your Resume
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CareersPage