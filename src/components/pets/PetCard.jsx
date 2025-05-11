import { Link } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import { useState } from 'react'
import { motion } from 'framer-motion'

const PetCard = ({ pet }) => {
  const [isFavorite, setIsFavorite] = useState(pet.isFavorite || false)
  
  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    // In a real app, you would call an API to update the favorite status
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/pets/${pet.id}`} className="block h-full">
        <div className="card h-full flex flex-col">
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img 
              src={pet.image} 
              alt={pet.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <button 
              onClick={handleFavoriteClick}
              className={`absolute top-2 right-2 p-2 rounded-full ${
                isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
              }`}
            >
              <FiHeart className={isFavorite ? 'fill-current' : ''} />
            </button>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-white">{pet.name}</h3>
                <span className={`badge ${
                  pet.status === 'Available' ? 'badge-success' : 'badge-warning'
                }`}>
                  {pet.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-4 flex-grow">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600">{pet.breed}</p>
              <p className="text-gray-600">{pet.age}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {pet.traits.map((trait, index) => (
                <span key={index} className="badge badge-primary">{trait}</span>
              ))}
            </div>
            
            <p className="text-gray-700 line-clamp-2">{pet.description}</p>
          </div>
          
          <div className="p-4 pt-0 mt-auto">
            <p className="text-sm text-gray-500 mb-2">
              <span className="font-medium">Location:</span> {pet.location}
            </p>
            <div className="mt-2">
              <span className="text-primary-600 font-medium">View Details →</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default PetCard