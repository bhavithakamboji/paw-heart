import { useState } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiHeart, FiFileText, FiMessageSquare, FiSettings, FiLogOut, FiPlus, FiSearch } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

// Dashboard sub-pages
const DashboardOverview = () => {
  const { user } = useAuth()
  
  const stats = [
    { 
      label: 'Favorite Pets', 
      value: user.role === 'adopter' ? 5 : 0,
      icon: <FiHeart className="w-6 h-6 text-primary-500" /> 
    },
    { 
      label: 'Applications', 
      value: user.role === 'adopter' ? 2 : user.role === 'shelter' ? 12 : 0,
      icon: <FiFileText className="w-6 h-6 text-primary-500" /> 
    },
    { 
      label: 'Messages', 
      value: 3,
      icon: <FiMessageSquare className="w-6 h-6 text-primary-500" /> 
    }
  ]
  
  // Recent activities based on user role
  const recentActivities = user.role === 'adopter' 
    ? [
        { id: 1, type: 'application', status: 'pending', message: 'Your application for Max is being reviewed', date: '2 days ago' },
        { id: 2, type: 'message', status: 'unread', message: 'New message from Happy Tails Rescue', date: '3 days ago' },
        { id: 3, type: 'favorite', message: 'You added Luna to your favorites', date: '5 days ago' }
      ]
    : user.role === 'shelter'
      ? [
          { id: 1, type: 'application', status: 'new', message: 'New adoption application for Buddy', date: '1 day ago' },
          { id: 2, type: 'application', status: 'new', message: 'New adoption application for Bella', date: '2 days ago' },
          { id: 3, type: 'message', status: 'unread', message: 'Message from John regarding Max', date: '3 days ago' }
        ]
      : [
          { id: 1, type: 'admin', message: 'Approved new shelter: Paws & Claws Rescue', date: '1 day ago' },
          { id: 2, type: 'admin', message: 'Pending approval: 3 new shelters', date: '2 days ago' },
          { id: 3, type: 'admin', message: 'User reports checked: 5 resolved', date: '3 days ago' }
        ]
  
  const getActivityIcon = (type, status) => {
    switch (type) {
      case 'application':
        return <div className={`p-2 rounded-full ${status === 'pending' ? 'bg-warning-100 text-warning-600' : 'bg-primary-100 text-primary-600'}`}>
          <FiFileText className="w-5 h-5" />
        </div>
      case 'message':
        return <div className="p-2 rounded-full bg-primary-100 text-primary-600">
          <FiMessageSquare className="w-5 h-5" />
        </div>
      case 'favorite':
        return <div className="p-2 rounded-full bg-red-100 text-red-600">
          <FiHeart className="w-5 h-5" />
        </div>
      case 'admin':
        return <div className="p-2 rounded-full bg-accent-100 text-accent-600">
          <FiSettings className="w-5 h-5" />
        </div>
      default:
        return null
    }
  }
  
  // Pet recommendations for adopters
  const recommendedPets = [
    {
      id: '9',
      name: 'Bailey',
      type: 'Dog',
      breed: 'Border Collie',
      age: '1 year',
      image: 'https://images.pexels.com/photos/1959055/pexels-photo-1959055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: '3.2 miles away'
    },
    {
      id: '10',
      name: 'Whiskers',
      type: 'Cat',
      breed: 'Domestic Shorthair',
      age: '2 years',
      image: 'https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: '4.8 miles away'
    },
    {
      id: '11',
      name: 'Rocky',
      type: 'Dog',
      breed: 'Australian Shepherd',
      age: '3 years',
      image: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: '5.1 miles away'
    }
  ]
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg shadow-md p-6 text-white mb-8">
        <h2 className="text-xl font-semibold mb-2">Welcome back, {user.name}!</h2>
        <p className="opacity-90">
          {user.role === 'adopter' 
            ? 'Continue your search for the perfect pet companion!' 
            : user.role === 'shelter'
              ? 'Manage your pet listings and adoption applications.'
              : 'Monitor and manage platform activity.'
          }
        </p>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="bg-white rounded-lg shadow p-6 flex items-center"
          >
            <div className="mr-4">
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent activity feed */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="px-6 py-4 flex items-start">
                  {getActivityIcon(activity.type, activity.status)}
                  <div className="ml-4 flex-1">
                    <p className="text-gray-800">{activity.message}</p>
                    <p className="text-gray-500 text-sm">{activity.date}</p>
                  </div>
                  <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                    View
                  </button>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 bg-gray-50 text-center rounded-b-lg">
              <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                View all activity
              </button>
            </div>
          </div>
        </div>
        
        {/* Right sidebar content - differs by role */}
        <div>
          {user.role === 'adopter' && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recommended Pets</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {recommendedPets.map((pet) => (
                  <div key={pet.id} className="p-4 flex">
                    <img 
                      src={pet.image} 
                      alt={pet.name} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">{pet.name}</h4>
                      <p className="text-gray-600 text-sm">{pet.breed} • {pet.age}</p>
                      <p className="text-gray-500 text-xs">{pet.location}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-gray-50 text-center rounded-b-lg">
                <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                  View more recommendations
                </button>
              </div>
            </div>
          )}
          
          {user.role === 'shelter' && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-4">
                <button className="w-full btn btn-primary py-2 rounded-md flex items-center justify-center">
                  <FiPlus className="mr-2" />
                  Add New Pet
                </button>
                <button className="w-full btn btn-secondary py-2 rounded-md flex items-center justify-center">
                  <FiFileText className="mr-2" />
                  Review Applications
                </button>
                <button className="w-full btn btn-secondary py-2 rounded-md flex items-center justify-center">
                  <FiMessageSquare className="mr-2" />
                  Check Messages
                </button>
              </div>
            </div>
          )}
          
          {user.role === 'admin' && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Platform Stats</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Users</span>
                  <span className="font-semibold">12,453</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Shelters</span>
                  <span className="font-semibold">523</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Pets</span>
                  <span className="font-semibold">3,124</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Adoptions (Month)</span>
                  <span className="font-semibold">318</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending Reviews</span>
                  <span className="font-semibold text-warning-600">12</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      name: 'Max',
      breed: 'Golden Retriever',
      age: '2 years',
      status: 'Available',
      image: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'San Francisco, CA',
      isFavorite: true
    },
    {
      id: '4',
      name: 'Oliver',
      breed: 'Tabby',
      age: '3 years',
      status: 'Available',
      image: 'https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'New York, NY',
      isFavorite: true
    },
    {
      id: '7',
      name: 'Simba',
      breed: 'Maine Coon',
      age: '2 years',
      status: 'Available',
      image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Denver, CO',
      isFavorite: true
    },
    {
      id: '12',
      name: 'Daisy',
      breed: 'Shih Tzu',
      age: '4 years',
      status: 'Available',
      image: 'https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Boston, MA',
      isFavorite: true
    },
    {
      id: '13',
      name: 'Leo',
      breed: 'Bengal Cat',
      age: '1 year',
      status: 'Available',
      image: 'https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Miami, FL',
      isFavorite: true
    }
  ])
  
  const removeFavorite = (id) => {
    setFavorites(favorites.filter(pet => pet.id !== id))
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Favorite Pets</h1>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((pet) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg overflow-hidden shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{pet.name}</h3>
                  <span className="badge badge-success">{pet.status}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{pet.breed} • {pet.age}</p>
                <p className="text-gray-500 text-sm mb-4">{pet.location}</p>
                <div className="flex justify-between items-center">
                  <button 
                    className="btn btn-primary rounded-md text-sm py-1.5"
                    onClick={() => {}}
                  >
                    View Details
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-700 flex items-center"
                    onClick={() => removeFavorite(pet.id)}
                  >
                    <FiHeart className="fill-current" />
                    <span className="ml-1 text-sm">Remove</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-400 mb-4">
            <FiHeart className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-600 mb-6">
            Browse our available pets and add some to your favorites.
          </p>
          <button 
            className="btn btn-primary rounded-md"
            onClick={() => {}}
          >
            Find Pets
          </button>
        </div>
      )}
    </div>
  )
}

const ApplicationsPage = () => {
  const { user } = useAuth()
  
  // Sample applications for demo purposes
  const applications = user.role === 'adopter' 
    ? [
        {
          id: 'APP-001',
          petName: 'Max',
          petImage: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          shelter: 'Happy Tails Rescue',
          status: 'Under Review',
          date: '2023-07-15',
          statusColor: 'bg-warning-100 text-warning-800'
        },
        {
          id: 'APP-002',
          petName: 'Bella',
          petImage: 'https://images.pexels.com/photos/4588052/pexels-photo-4588052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          shelter: 'Seattle Animal Shelter',
          status: 'Approved',
          date: '2023-06-22',
          statusColor: 'bg-success-100 text-success-800'
        }
      ]
    : [
        {
          id: 'APP-003',
          petName: 'Charlie',
          petImage: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          applicant: 'John Doe',
          applicantEmail: 'john@example.com',
          status: 'New',
          date: '2023-07-16',
          statusColor: 'bg-primary-100 text-primary-800'
        },
        {
          id: 'APP-004',
          petName: 'Buddy',
          petImage: 'https://images.pexels.com/photos/2253276/pexels-photo-2253276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          applicant: 'Emma Thompson',
          applicantEmail: 'emma@example.com',
          status: 'Under Review',
          date: '2023-07-14',
          statusColor: 'bg-warning-100 text-warning-800'
        },
        {
          id: 'APP-005',
          petName: 'Luna',
          petImage: 'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          applicant: 'Michael Johnson',
          applicantEmail: 'michael@example.com',
          status: 'Approved',
          date: '2023-07-10',
          statusColor: 'bg-success-100 text-success-800'
        }
      ]
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {user.role === 'adopter' ? 'My Applications' : 'Adoption Applications'}
      </h1>
      
      {user.role === 'shelter' && (
        <div className="mb-6 flex justify-between items-center">
          <div className="relative max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input 
              type="text"
              className="input pl-10 w-full"
              placeholder="Search applications..."
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <label htmlFor="status-filter" className="text-sm text-gray-600 mr-2">
              Status:
            </label>
            <select 
              id="status-filter" 
              className="input text-sm py-1"
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      )}
      
      {applications.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {user.role === 'adopter' ? 'Shelter' : 'Applicant'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          src={app.petImage}
                          alt={app.petName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {app.petName}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {app.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.role === 'adopter' ? app.shelter : app.applicant}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.role === 'shelter' && app.applicantEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${app.statusColor}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(app.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-4">
                      View Details
                    </button>
                    {user.role === 'shelter' && app.status === 'New' && (
                      <button className="text-accent-600 hover:text-accent-900">
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-400 mb-4">
            <FiFileText className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
          <p className="text-gray-600 mb-6">
            {user.role === 'adopter' 
              ? 'Start the adoption process by applying for a pet you love.' 
              : 'No adoption applications have been submitted yet.'}
          </p>
          {user.role === 'adopter' && (
            <button 
              className="btn btn-primary rounded-md"
              onClick={() => {}}
            >
              Find Pets
            </button>
          )}
        </div>
      )}
    </div>
  )
}

const MessagesPage = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      with: 'Happy Tails Rescue',
      avatar: 'https://images.pexels.com/photos/1612861/pexels-photo-1612861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      lastMessage: 'We received your application and would like to schedule a meet-and-greet with Max.',
      timestamp: '10:23 AM',
      unread: true
    },
    {
      id: 2,
      with: 'Seattle Animal Shelter',
      avatar: 'https://images.pexels.com/photos/3280908/pexels-photo-3280908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      lastMessage: 'Your adoption application for Bella has been approved! Please call us to arrange pickup.',
      timestamp: 'Yesterday',
      unread: false
    },
    {
      id: 3,
      with: 'Texas Paws Rescue',
      avatar: 'https://images.pexels.com/photos/11398590/pexels-photo-11398590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      lastMessage: 'Thank you for your interest in Charlie. Do you have any questions about him?',
      timestamp: '3 days ago',
      unread: false
    }
  ])
  
  const [activeConversation, setActiveConversation] = useState(null)
  const [messageText, setMessageText] = useState('')
  
  const selectConversation = (id) => {
    setActiveConversation(id)
    // Mark as read
    setConversations(
      conversations.map(conv => 
        conv.id === id ? { ...conv, unread: false } : conv
      )
    )
  }
  
  const sendMessage = (e) => {
    e.preventDefault()
    if (!messageText.trim()) return
    
    // In a real app, this would send the message to the backend
    console.log(`Sending message to conversation ${activeConversation}: ${messageText}`)
    setMessageText('')
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex h-[600px]">
          {/* Conversation list */}
          <div className="w-full md:w-1/3 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input 
                  type="text"
                  className="input pl-10 w-full"
                  placeholder="Search messages..."
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(600px-73px)]">
              {conversations.map((conv) => (
                <div 
                  key={conv.id}
                  onClick={() => selectConversation(conv.id)}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    activeConversation === conv.id ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex items-start">
                    <img 
                      src={conv.avatar} 
                      alt={conv.with}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {conv.with}
                        </h3>
                        <p className="text-xs text-gray-500">{conv.timestamp}</p>
                      </div>
                      <p className={`text-sm truncate ${conv.unread ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unread && (
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-600 ml-2 mt-2"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Active conversation */}
          <div className="hidden md:flex md:flex-col md:w-2/3">
            {activeConversation ? (
              <>
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <img 
                    src={conversations.find(c => c.id === activeConversation).avatar}
                    alt={conversations.find(c => c.id === activeConversation).with}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {conversations.find(c => c.id === activeConversation).with}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Last active: Today at 11:30 AM
                    </p>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {/* Message bubbles would go here */}
                  <div className="text-center text-sm text-gray-500 my-2">
                    Today
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex">
                      <img 
                        src={conversations.find(c => c.id === activeConversation).avatar}
                        alt={conversations.find(c => c.id === activeConversation).with}
                        className="w-8 h-8 rounded-full object-cover mr-2 self-end"
                      />
                      <div className="bg-white rounded-lg rounded-bl-none p-3 text-sm text-gray-800 shadow-sm max-w-xs">
                        {conversations.find(c => c.id === activeConversation).lastMessage}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-primary-600 rounded-lg rounded-br-none p-3 text-sm text-white shadow-sm max-w-xs">
                        Thank you for the update! I'm available this weekend for the meet-and-greet.
                      </div>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 flex">
                  <input
                    type="text"
                    className="input flex-1 mr-2"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="btn btn-primary rounded-md px-4"
                    disabled={!messageText.trim()}
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FiMessageSquare className="w-12 h-12 mb-4" />
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const SettingsPage = () => {
  const { user } = useAuth()
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h2>
          
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-primary-200"
              />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="input w-full"
                    defaultValue={user.name}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input w-full"
                    defaultValue={user.email}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  className="input w-full"
                  rows="3"
                  placeholder="Tell us a bit about yourself..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button className="btn btn-primary rounded-md">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Password</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                id="current-password"
                type="password"
                className="input w-full"
                placeholder="••••••••"
              />
            </div>
            
            <div></div>
            
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                className="input w-full"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                className="input w-full"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="btn btn-primary rounded-md">
              Update Password
            </button>
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive email updates about your account activity</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Application Updates</p>
                <p className="text-sm text-gray-500">Receive notifications about your adoption applications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Marketing Emails</p>
                <p className="text-sm text-gray-500">Receive promotional emails and newsletters</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Delete Account</h2>
          
          <p className="text-gray-600 mb-4">
            Once you delete your account, all of your data will be permanently removed. This action cannot be undone.
          </p>
          
          <button className="btn bg-red-600 hover:bg-red-700 text-white rounded-md">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

const DashboardPage = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  
  const sidebarItems = [
    { 
      label: 'Overview', 
      icon: <FiUser />, 
      path: '/dashboard',
      exact: true
    },
    { 
      label: 'Favorites', 
      icon: <FiHeart />, 
      path: '/dashboard/favorites' 
    },
    { 
      label: user.role === 'adopter' ? 'My Applications' : 'Applications', 
      icon: <FiFileText />, 
      path: '/dashboard/applications' 
    },
    { 
      label: 'Messages', 
      icon: <FiMessageSquare />, 
      path: '/dashboard/messages' 
    },
    { 
      label: 'Settings', 
      icon: <FiSettings />, 
      path: '/dashboard/settings' 
    },
  ]
  
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) => `
                      flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
                      ${isActive 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}
                
                <button
                  onClick={logout}
                  className="flex w-full items-center px-4 py-3 text-sm font-medium rounded-md text-red-700 hover:bg-red-50 transition-colors"
                >
                  <FiLogOut className="mr-3" />
                  Log Out
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage