import { useState, useEffect } from 'react'
import { FiSearch, FiFilter, FiX, FiChevronDown } from 'react-icons/fi'
import { fetchPets } from '../services/petService'
import PetCard from '../components/pets/PetCard'
import { motion, AnimatePresence } from 'framer-motion'

const PetsPage = () => {
  const [pets, setPets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    type: '',
    breed: '',
    age: '',
    size: '',
    gender: ''
  })
  
  // Load pets on mount and when filters change
  useEffect(() => {
    const loadPets = async () => {
      setIsLoading(true)
      try {
        const filteredPets = await fetchPets(filters)
        setPets(filteredPets)
      } catch (error) {
        console.error('Error loading pets:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadPets()
  }, [filters])
  
  // Filter options
  const filterOptions = {
    type: ['Dog', 'Cat', 'Rabbit', 'Bird', 'Small & Furry'],
    breed: ['Golden Retriever', 'Labrador', 'German Shepherd', 'Beagle', 'Siamese', 'Maine Coon', 'Tabby', 'Mixed Breed'],
    age: ['Puppy/Kitten', 'Young', 'Adult', 'Senior'],
    size: ['Small', 'Medium', 'Large', 'Extra Large'],
    gender: ['Male', 'Female']
  }
  
  // Apply filters
  const applyFilters = () => {
    setFilterOpen(false)
  }
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      type: '',
      breed: '',
      age: '',
      size: '',
      gender: ''
    })
    setSearchQuery('')
  }
  
  // Filter pets by search query
  const filteredPets = searchQuery 
    ? pets.filter(pet => 
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pets
  
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Pet</h1>
          <p className="text-xl text-gray-600">
            Browse our available pets and find your new best friend
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="input pl-10 w-full"
                placeholder="Search by name, breed, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="btn flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md"
            >
              <FiFilter />
              Filters
              <FiChevronDown className={`transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Filter Panel */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pet Type
                    </label>
                    <select
                      className="input w-full"
                      value={filters.type}
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    >
                      <option value="">Any Type</option>
                      {filterOptions.type.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Breed
                    </label>
                    <select
                      className="input w-full"
                      value={filters.breed}
                      onChange={(e) => setFilters({ ...filters, breed: e.target.value })}
                    >
                      <option value="">Any Breed</option>
                      {filterOptions.breed.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <select
                      className="input w-full"
                      value={filters.age}
                      onChange={(e) => setFilters({ ...filters, age: e.target.value })}
                    >
                      <option value="">Any Age</option>
                      {filterOptions.age.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size
                    </label>
                    <select
                      className="input w-full"
                      value={filters.size}
                      onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                    >
                      <option value="">Any Size</option>
                      {filterOptions.size.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      className="input w-full"
                      value={filters.gender}
                      onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                    >
                      <option value="">Any Gender</option>
                      {filterOptions.gender.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <button
                      onClick={applyFilters}
                      className="btn btn-primary rounded-md flex-grow"
                    >
                      Apply Filters
                    </button>
                    <button
                      onClick={resetFilters}
                      className="btn btn-secondary rounded-md"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Active Filters */}
          {(filters.type || filters.breed || filters.age || filters.size || filters.gender) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.type && (
                <div className="flex items-center bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm">
                  {filters.type}
                  <button
                    onClick={() => setFilters({ ...filters, type: '' })}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    <FiX />
                  </button>
                </div>
              )}
              
              {filters.breed && (
                <div className="flex items-center bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm">
                  {filters.breed}
                  <button
                    onClick={() => setFilters({ ...filters, breed: '' })}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    <FiX />
                  </button>
                </div>
              )}
              
              {filters.age && (
                <div className="flex items-center bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm">
                  {filters.age}
                  <button
                    onClick={() => setFilters({ ...filters, age: '' })}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    <FiX />
                  </button>
                </div>
              )}
              
              {filters.size && (
                <div className="flex items-center bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm">
                  {filters.size}
                  <button
                    onClick={() => setFilters({ ...filters, size: '' })}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    <FiX />
                  </button>
                </div>
              )}
              
              {filters.gender && (
                <div className="flex items-center bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm">
                  {filters.gender}
                  <button
                    onClick={() => setFilters({ ...filters, gender: '' })}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    <FiX />
                  </button>
                </div>
              )}
              
              <button
                onClick={resetFilters}
                className="text-red-600 hover:text-red-800 text-sm font-medium ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
        
        {/* Results Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {isLoading 
                ? 'Loading pets...' 
                : `${filteredPets.length} pets available`
              }
            </h2>
            
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600">
                Sort by:
              </label>
              <select
                id="sort"
                className="input py-1 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="closest">Closest</option>
                <option value="age_asc">Age (Youngest)</option>
                <option value="age_desc">Age (Oldest)</option>
              </select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredPets.length > 0 ? (
            <div className="pet-card-grid">
              {filteredPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No pets match your search</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search filters to find more pets available for adoption.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn btn-primary rounded-md"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PetsPage