import { motion } from 'framer-motion'
import { FiUsers, FiHeart, FiHome, FiAward, FiShield } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  // Team members
  const teamMembers = [
    {
      name: 'Emma Thompson',
      role: 'Founder & CEO',
      bio: 'With over 15 years of animal welfare experience, Emma founded PawfectMatch to revolutionize the pet adoption process.',
      image: 'https://randomuser.me/api/portraits/women/17.jpg'
    },
    {
      name: 'David Chen',
      role: 'Chief Operations Officer',
      bio: 'David oversees our partnerships with shelters and ensures every adoption process runs smoothly.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Animal Welfare',
      bio: 'A licensed veterinarian, Sarah ensures all pets on our platform receive proper care and attention.',
      image: 'https://randomuser.me/api/portraits/women/45.jpg'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Technology Director',
      bio: 'Michael leads our development team, creating innovative solutions to connect pets with their forever homes.',
      image: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  ]
  
  // Values
  const values = [
    {
      icon: <FiHeart className="h-8 w-8 text-accent-500" />,
      title: 'Compassion',
      description: 'We believe every animal deserves love, care, and a safe home. We approach our work with empathy and kindness.'
    },
    {
      icon: <FiShield className="h-8 w-8 text-accent-500" />,
      title: 'Responsibility',
      description: 'We are committed to ethical practices in animal welfare and take our role in the adoption process seriously.'
    },
    {
      icon: <FiHome className="h-8 w-8 text-accent-500" />,
      title: 'Community',
      description: 'We build connections between adopters, shelters, and volunteers to create a supportive network for pet adoption.'
    },
    {
      icon: <FiAward className="h-8 w-8 text-accent-500" />,
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do, from our platform technology to our adoption counseling.'
    }
  ]
  
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our Mission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            At PawfectMatch, we're dedicated to revolutionizing pet adoption. 
            We connect loving homes with animals in need, making the adoption process 
            seamless, humane, and accessible to everyone.
          </motion.p>
        </div>
        
        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <img 
                src="https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Dog and owner" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  PawfectMatch was founded in 2020 with a simple yet powerful vision: to find a loving home for every adoptable pet.
                </p>
                <p>
                  Our founder, Emma Thompson, was volunteering at a local animal shelter when she noticed how difficult it was for potential adopters to find their perfect pet match. Many animals were overlooked, while adopters struggled to navigate complex shelter systems.
                </p>
                <p>
                  With her background in technology and passion for animal welfare, Emma assembled a team of like-minded individuals to create a platform that would streamline the adoption process while prioritizing animal welfare and adopter education.
                </p>
                <p>
                  Today, PawfectMatch has helped thousands of pets find their forever homes, partnering with hundreds of shelters nationwide to make pet adoption simple, transparent, and joyful.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="mb-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              These core principles guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="bg-primary-600 text-white rounded-lg shadow-md p-12 mb-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-primary-100">
              Together, we're making a difference in the lives of pets and people
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-lg text-primary-100">Pets Adopted</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-lg text-primary-100">Shelter Partners</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-2">25,000+</div>
              <div className="text-lg text-primary-100">Active Users</div>
            </motion.div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              Passionate individuals dedicated to animal welfare
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Join Us CTA */}
        <div className="bg-accent-500 rounded-lg shadow-md p-8 text-white text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Whether you're looking to adopt, volunteer, or partner with us as a shelter, 
            there are many ways to contribute to our mission of finding loving homes for pets in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pets" className="btn bg-white text-accent-600 hover:bg-gray-100 py-3 px-6 rounded-md font-medium">
              Find a Pet
            </Link>
            <Link to="/contact" className="btn bg-accent-600 hover:bg-accent-700 text-white py-3 px-6 rounded-md font-medium border border-white/20">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage