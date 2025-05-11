import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiSearch, FiFilter, FiChevronDown, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const SuccessStoriesPage = () => {
  const [successStories, setSuccessStories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    petType: '',
    location: ''
  })
  
  // Fetch success stories
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockStories = [
        {
          id: 1,
          title: "Max's Second Chance",
          petName: "Max",
          petType: "Dog",
          breed: "Golden Retriever",
          adopterName: "Emma Thompson",
          location: "San Francisco, CA",
          date: "June 15, 2023",
          story: "After losing our family dog of 15 years, we were hesitant to adopt again. The pain of loss was still fresh, but my kids kept asking for a new furry friend. We visited Happy Tails Rescue without any expectations, but then we met Max. He immediately bonded with my 7-year-old son, following him around and gently playing with him. Despite being abandoned by his previous owners, Max was so loving and trusting. We knew he was meant to be part of our family.\n\nThe adoption process was seamless, and the shelter staff were incredibly supportive. Max adjusted to our home within days, almost as if he'd always been there. He's brought so much joy back into our lives. He sleeps outside my son's room every night, joins us on family hikes, and has become the neighborhood's favorite dog. Adopting Max wasn't just about giving him a second chance—he gave us one too.",
          images: [
            "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/4668425/pexels-photo-4668425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          ],
          adopterImage: "https://randomuser.me/api/portraits/women/17.jpg",
          shelter: "Happy Tails Rescue",
          featured: true
        },
        {
          id: 2,
          title: "Luna's Forever Home",
          petName: "Luna",
          petType: "Cat",
          breed: "Siamese",
          adopterName: "Marcus Johnson",
          location: "Los Angeles, CA",
          date: "April 3, 2023",
          story: "As someone who works from home, I had been considering getting a pet for companionship. I wasn't specifically looking for a cat, but when I saw Luna's profile on PawfectMatch, something about her eyes captured my attention. She had been at the shelter for over 6 months—overlooked because she was shy and didn't approach visitors.\n\nWhen I met her, she hid behind her cat tree, but the shelter staff explained her history. She had been rescued from a hoarding situation and needed someone patient. I decided to take a chance on her, and it's been the best decision. For the first week, she barely left her hiding spot under my bed. I gave her space, occasionally sitting nearby and talking softly.\n\nSlowly, Luna began to trust me. First sitting across the room, then a little closer each day. One night, I woke up to find her curled up at the foot of my bed. Now, she's a completely different cat—playful, affectionate, and even a bit mischievous. She sits on my desk while I work and greets me at the door when I come home. Luna has shown me that sometimes the most rewarding relationships take time and patience.",
          images: [
            "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/127027/pexels-photo-127027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          ],
          adopterImage: "https://randomuser.me/api/portraits/men/22.jpg",
          shelter: "Feline Friends Shelter",
          featured: true
        },
        {
          id: 3,
          title: "Charlie: From Street Dog to Therapy Dog",
          petName: "Charlie",
          petType: "Dog",
          breed: "Beagle Mix",
          adopterName: "Sarah Miller",
          location: "Austin, TX",
          date: "March 12, 2023",
          story: "Charlie was found wandering the streets, malnourished and terrified of humans. After being brought to Texas Paws Rescue, he spent weeks receiving medical care and behavioral rehabilitation. That's when I met him during my volunteer shift. I wasn't planning to adopt, but Charlie's gentle spirit despite his rough past touched my heart.\n\nAs a school counselor, I noticed Charlie had a natural calming presence. After adoption, I enrolled him in training, and to everyone's surprise, he excelled. Today, Charlie is a certified therapy dog who accompanies me to school three days a week. Children who struggle with reading practice by reading to Charlie. Students with anxiety find comfort in his presence during difficult sessions.\n\nThe dog that once had no home now helps dozens of children feel safe and supported. Charlie's transformation reminds me daily that with love and opportunity, we can all overcome our difficult beginnings. He's not just a pet—he's my partner in helping children heal and grow.",
          images: [
            "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/879788/pexels-photo-879788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          ],
          adopterImage: "https://randomuser.me/api/portraits/women/45.jpg",
          shelter: "Texas Paws Rescue",
          featured: false
        },
        {
          id: 4,
          title: "Oliver and Simon: Bonded Seniors Find Love",
          petName: "Oliver & Simon",
          petType: "Cat",
          breed: "Tabby & Calico",
          adopterName: "Robert & Jean Wilson",
          location: "Denver, CO",
          date: "January 20, 2023",
          story: "After retiring, our house felt too quiet. We had been cat people all our lives but had been without pets since our last cat passed away five years ago. When browsing PawfectMatch, we came across Oliver and Simon—a bonded pair of 10-year-old cats whose owner had passed away. Many people overlook senior pets, but as seniors ourselves, we felt a connection to these gentle souls who needed a second chance.\n\nThe shelter explained that they had been waiting for over four months because they needed to be adopted together. The moment we met them, it was clear they were meant to be with us. Oliver, the orange tabby, is the adventurous one who explores every corner of our house. Simon, the calico, is more reserved but loves to curl up on laps while we read.\n\nAdopting senior pets has been perfect for our lifestyle. They're already well-mannered, litter-trained, and mainly want companionship rather than play time. They've filled our home with purrs and personality. Every night, they sleep between us on the bed, and every morning they wake us with gentle paws to the face. We may not have as many years with them as we would with kittens, but we're making each day count.",
          images: [
            "https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          ],
          adopterImage: "https://randomuser.me/api/portraits/men/67.jpg",
          shelter: "Rocky Mountain Cat Rescue",
          featured: false
        },
        {
          id: 5,
          title: "Bella: The Dog Who Saved Me",
          petName: "Bella",
          petType: "Dog",
          breed: "Pomeranian",
          adopterName: "Michael Chen",
          location: "Seattle, WA",
          date: "May 5, 2023",
          story: "After my divorce and moving to a new city, I was struggling with depression. My therapist suggested a pet might help with my mental health, but I wasn't sure I could take care of another living being when I was barely taking care of myself. Still, I found myself scrolling through PawfectMatch one night and saw Bella—a tiny Pomeranian with big eyes and an even bigger personality according to her description.\n\nI visited the Seattle Animal Shelter the next day, not expecting much. Bella was the complete opposite of what I thought I wanted in a dog (I had always been a 'big dog person'), but when they brought her out, she immediately jumped into my lap and looked up at me as if to say, 'Where have you been? I've been waiting!'\n\nBringing Bella home changed everything. Suddenly, I had a reason to get out of bed in the morning. Her need for walks got me outside and moving, even on my worst days. Her silly antics made me laugh for the first time in months. Bella needed a consistent schedule, which helped me create structure in my chaotic life.\n\nSix months later, my friends hardly recognize the person I've become. I'm more social (dog parks are great for meeting people), more active, and happier than I've been in years. Bella taught me that sometimes the love and purpose we need comes in unexpected packages. I didn't just rescue Bella—she rescued me right back.",
          images: [
            "https://images.pexels.com/photos/4588052/pexels-photo-4588052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/5122188/pexels-photo-5122188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/6131917/pexels-photo-6131917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          ],
          adopterImage: "https://randomuser.me/api/portraits/men/36.jpg",
          shelter: "Seattle Animal Shelter",
          featured: false
        },
        {
          id: 6,
          title: "Simba: The Gentle Giant",
          petName: "Simba",
          petType: "Cat",
          breed: "Maine Coon",
          adopterName: "Jennifer Adams",
          location: "Portland, OR",
          date: "February 18, 2023",
          story: "I've always been fascinated by Maine Coons, so when I saw Simba's profile on PawfectMatch, I immediately applied to adopt him. At 18 pounds and still growing, he was surrendered by his previous owners who couldn't afford his care. When I met him at the shelter, I was struck by how gentle he was despite his impressive size.\n\nBringing Simba home was an adventure—he explored every corner of my apartment with curiosity rather than fear. He's adapted beautifully to life with me and my roommate, showing an almost dog-like personality. He greets us at the door, follows us from room to room, and even plays fetch with his toy mice.\n\nSimba has become something of a neighborhood celebrity. When I take him out on his harness for walks, people often stop to ask if he's a small wildcat! Children in my building call him the 'lion cat' and ask to visit him. Despite all the attention, Simba remains humble and loving, purring loudly whenever anyone shows him affection.\n\nI'm grateful to PawfectMatch for connecting me with this magnificent companion. Simba may take up half my bed and knock things off shelves with his magnificent tail, but I wouldn't have it any other way.",
          images: [
            "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          ],
          adopterImage: "https://randomuser.me/api/portraits/women/65.jpg",
          shelter: "Portland Pet Rescue",
          featured: false
        }
      ]
      
      setSuccessStories(mockStories)
      setIsLoading(false)
    }, 1000)
  }, [])
  
  // Filter stories based on search query and filters
  const filteredStories = successStories.filter(story => {
    // Search filter
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.adopterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.story.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Pet type filter
    const matchesPetType = !filters.petType || story.petType.toLowerCase() === filters.petType.toLowerCase()
    
    // Location filter
    const matchesLocation = !filters.location || story.location.toLowerCase().includes(filters.location.toLowerCase())
    
    return matchesSearch && matchesPetType && matchesLocation
  })
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      petType: '',
      location: ''
    })
    setSearchQuery('')
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
            Success Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Heartwarming tales of pets and people who found each other through adoption
          </motion.p>
          
          {/* Search and Filter */}
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
                  placeholder="Search stories..."
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
                        value={filters.petType}
                        onChange={(e) => setFilters({ ...filters, petType: e.target.value })}
                      >
                        <option value="">All Pet Types</option>
                        <option value="dog">Dogs</option>
                        <option value="cat">Cats</option>
                        <option value="other">Other Pets</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <select
                        className="input w-full"
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                      >
                        <option value="">All Locations</option>
                        <option value="San Francisco">San Francisco, CA</option>
                        <option value="Los Angeles">Los Angeles, CA</option>
                        <option value="New York">New York, NY</option>
                        <option value="Chicago">Chicago, IL</option>
                        <option value="Austin">Austin, TX</option>
                        <option value="Seattle">Seattle, WA</option>
                        <option value="Denver">Denver, CO</option>
                      </select>
                    </div>
                    
                    <div className="flex items-end">
                      <button
                        onClick={resetFilters}
                        className="btn bg-primary-50 text-primary-600 hover:bg-primary-100 py-2 px-4 rounded-md text-sm w-full"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Active Filters */}
            {(filters.petType || filters.location || searchQuery) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchQuery && (
                  <div className="flex items-center bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm">
                    Search: {searchQuery}
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-1 text-primary-600 hover:text-primary-800"
                    >
                      <FiX />
                    </button>
                  </div>
                )}
                
                {filters.petType && (
                  <div className="flex items-center bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm">
                    Pet Type: {filters.petType}
                    <button
                      onClick={() => setFilters({ ...filters, petType: '' })}
                      className="ml-1 text-primary-600 hover:text-primary-800"
                    >
                      <FiX />
                    </button>
                  </div>
                )}
                
                {filters.location && (
                  <div className="flex items-center bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm">
                    Location: {filters.location}
                    <button
                      onClick={() => setFilters({ ...filters, location: '' })}
                      className="ml-1 text-primary-600 hover:text-primary-800"
                    >
                      <FiX />
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Featured Stories */}
        {!isLoading && !searchQuery && !filters.petType && !filters.location && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Stories</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {successStories
                .filter(story => story.featured)
                .map(story => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={story.images[0]} 
                        alt={story.petName} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                          Featured
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{story.title}</h3>
                        <div className="flex items-center">
                          <img 
                            src={story.adopterImage} 
                            alt={story.adopterName} 
                            className="w-8 h-8 rounded-full object-cover mr-2"
                          />
                          <p className="text-white text-sm">
                            {story.adopterName} & {story.petName} • {story.location}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {story.story.split('\n\n')[0]}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{story.date}</span>
                        <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                          Read Full Story
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
        
        {/* All Stories or Filtered Results */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {(searchQuery || filters.petType || filters.location) 
              ? `${filteredStories.length} ${filteredStories.length === 1 ? 'Story' : 'Stories'} Found` 
              : 'All Success Stories'
            }
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map(story => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={story.images[0]} 
                      alt={story.petName} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-lg font-bold text-white">{story.title}</h3>
                    </div>
                  </div>
                  <div className="p-5 flex-grow">
                    <div className="flex items-center mb-3">
                      <img 
                        src={story.adopterImage} 
                        alt={story.adopterName} 
                        className="w-8 h-8 rounded-full object-cover mr-2"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{story.adopterName}</p>
                        <p className="text-xs text-gray-500">{story.location}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full mr-2">
                        {story.petType}
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {story.breed}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {story.story.substring(0, 150)}...
                    </p>
                  </div>
                  <div className="px-5 pb-5 mt-auto">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{story.date}</span>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Read More
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-primary-400 mb-4">
                <FiHeart className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No stories found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any success stories matching your search criteria.
              </p>
              <button 
                onClick={resetFilters}
                className="btn btn-primary rounded-md"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Share Your Story CTA */}
        <div className="mt-16 bg-primary-50 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Have a Success Story to Share?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Did you adopt a pet through PawfectMatch? We'd love to hear about your journey and how your new companion has changed your life.
          </p>
          <Link 
            to="/contact" 
            className="btn btn-primary py-3 px-6 rounded-md inline-flex items-center"
          >
            <FiHeart className="mr-2" />
            Share Your Story
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SuccessStoriesPage