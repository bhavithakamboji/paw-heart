// Mock pet data
const pets = [
  {
    id: '1',
    name: 'Max',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    gender: 'Male',
    size: 'Large',
    color: 'Golden',
    status: 'Available',
    location: 'San Francisco, CA',
    distance: 5.2,
    description: 'Max is a friendly, energetic Golden Retriever who loves to play fetch and go for walks. He\'s great with kids and other pets.',
    traits: ['Playful', 'Friendly', 'Trained'],
    image: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1485637/pexels-photo-1485637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4668425/pexels-photo-4668425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    shelter: {
      id: '1',
      name: 'Happy Tails Rescue',
      image: 'https://images.pexels.com/photos/1612861/pexels-photo-1612861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'San Francisco, CA',
      phone: '(415) 555-1234',
      email: 'info@happytailsrescue.org'
    },
    healthRecords: {
      vaccinated: true,
      neutered: true,
      microchipped: true,
      specialNeeds: false
    },
    isFavorite: true
  },
  {
    id: '2',
    name: 'Luna',
    type: 'Cat',
    breed: 'Siamese',
    age: '1 year',
    gender: 'Female',
    size: 'Medium',
    color: 'Cream & Brown',
    status: 'Available',
    location: 'Los Angeles, CA',
    distance: 3.7,
    description: 'Luna is a beautiful Siamese cat who loves to curl up on your lap. She\'s quiet but affectionate once she warms up to you.',
    traits: ['Quiet', 'Affectionate', 'Indoor'],
    image: 'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/127027/pexels-photo-127027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    shelter: {
      id: '2',
      name: 'Feline Friends Shelter',
      image: 'https://images.pexels.com/photos/7725610/pexels-photo-7725610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Los Angeles, CA',
      phone: '(213) 555-5678',
      email: 'contact@felinefriends.org'
    },
    healthRecords: {
      vaccinated: true,
      neutered: true,
      microchipped: false,
      specialNeeds: false
    },
    isFavorite: false
  },
  {
    id: '3',
    name: 'Buddy',
    type: 'Dog',
    breed: 'Labrador Mix',
    age: '4 years',
    gender: 'Male',
    size: 'Large',
    color: 'Black',
    status: 'Available',
    location: 'Chicago, IL',
    distance: 8.1,
    description: 'Buddy is a lovable Labrador mix who\'s great with families. He\'s already house-trained and knows several commands.',
    traits: ['Loyal', 'Family-friendly', 'Trained'],
    image: 'https://images.pexels.com/photos/2253276/pexels-photo-2253276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/2253276/pexels-photo-2253276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1591939/pexels-photo-1591939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1739095/pexels-photo-1739095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2523934/pexels-photo-2523934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    shelter: {
      id: '3',
      name: 'Midwest Animal Rescue',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Chicago, IL',
      phone: '(312) 555-9012',
      email: 'info@midwestanimalrescue.org'
    },
    healthRecords: {
      vaccinated: true,
      neutered: true,
      microchipped: true,
      specialNeeds: false
    },
    isFavorite: false
  },
  {
    id: '4',
    name: 'Oliver',
    type: 'Cat',
    breed: 'Tabby',
    age: '3 years',
    gender: 'Male',
    size: 'Medium',
    color: 'Orange & White',
    status: 'Available',
    location: 'New York, NY',
    distance: 2.4,
    description: 'Oliver is a charming tabby who loves to play with toys. He\'s independent but also enjoys cuddling with his humans.',
    traits: ['Playful', 'Independent', 'Good with cats'],
    image: 'https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/177809/pexels-photo-177809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/669015/pexels-photo-669015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    shelter: {
      id: '4',
      name: 'NYC Pet Rescue',
      image: 'https://images.pexels.com/photos/6685484/pexels-photo-6685484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'New York, NY',
      phone: '(212) 555-3456',
      email: 'adopt@nycpetrescue.org'
    },
    healthRecords: {
      vaccinated: true,
      neutered: true,
      microchipped: true,
      specialNeeds: false
    },
    isFavorite: false
  },
  {
    id: '5',
    name: 'Charlie',
    type: 'Dog',
    breed: 'Beagle',
    age: '1 year',
    gender: 'Male',
    size: 'Small',
    color: 'Tri-color',
    status: 'Available',
    location: 'Austin, TX',
    distance: 6.3,
    description: 'Charlie is a curious and playful Beagle puppy who loves to explore. He\'s great with other dogs and would thrive in an active household.',
    traits: ['Energetic', 'Curious', 'Social'],
    image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/879788/pexels-photo-879788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    shelter: {
      id: '5',
      name: 'Texas Paws Rescue',
      image: 'https://images.pexels.com/photos/11398590/pexels-photo-11398590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Austin, TX',
      phone: '(512) 555-7890',
      email: 'info@texaspawsrescue.org'
    },
    healthRecords: {
      vaccinated: true,
      neutered: false,
      microchipped: true,
      specialNeeds: false
    },
    isFavorite: false
  },
  {
    id: '6',
    name: 'Bella',
    type: 'Dog',
    breed: 'Pomeranian',
    age: '3 years',
    gender: 'Female',
    size: 'Small',
    color: 'Orange',
    status: 'Available',
    location: 'Seattle, WA',
    distance: 4.9,
    description: 'Bella is a sweet and fluffy Pomeranian who loves cuddles and short walks. She\'s perfect for apartment living.',
    traits: ['Affectionate', 'Calm', 'Apartment-friendly'],
    image: 'https://images.pexels.com/photos/4588052/pexels-photo-4588052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/4588052/pexels-photo-4588052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5122188/pexels-photo-5122188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6568951/pexels-photo-6568951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6131917/pexels-photo-6131917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    shelter: {
      id: '6',
      name: 'Seattle Animal Shelter',
      image: 'https://images.pexels.com/photos/3280908/pexels-photo-3280908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Seattle, WA',
      phone: '(206) 555-2345',
      email: 'adopt@seattleanimalshelter.org'
    },
    healthRecords: {
      vaccinated: true,
      neutered: true,
      microchipped: true,
      specialNeeds: false
    },
    isFavorite: false
  },
  {
    id: '7',
    name: 'Simba',
    type: 'Cat',
    breed: 'Maine Coon',
    age: '2 years',
    gender: 'Male',
    size: 'Large',
    color: 'Orange & White',
    status: 'Available',
    location: 'Denver, CO',
    distance: 7.2,
    description: 'Simba is a majestic Maine Coon with a friendly disposition. He gets along well with other pets and enjoys interactive play.',
    traits: ['Intelligent', 'Gentle', 'Good with others'],
    image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    shelter: {
      id: '7',
      name: 'Rocky Mountain Cat Rescue',
      image: 'https://images.pexels.com/photos/7725687/pexels-photo-7725687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Denver, CO',
      phone: '(303) 555-6789',
      email: 'contact@rockymountaincatrescue.org'
    },
    healthRecords: {
      vaccinated: true,
      neutered: true,
      microchipped: false,
      specialNeeds: false
    },
    isFavorite: false
  },
  {
    id: '8',
    name: 'Rocky',
    type: 'Dog',
    breed: 'Boxer',
    age: '5 years',
    gender: 'Male',
    size: 'Large',
    color: 'Fawn',
    status: 'Available',
    location: 'Phoenix, AZ',
    distance: 5.8,
    description: 'Rocky is a gentle giant who loves to lounge around the house. He\'s well-behaved and would make a great companion for a family.',
    traits: ['Loyal', 'Calm', 'House-trained'],
    image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1563761/pexels-photo-1563761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4588435/pexels-photo-4588435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2318990/pexels-photo-2318990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    shelter: {
      id: '8',
      name: 'Desert Paws Shelter',
      image: 'https://images.pexels.com/photos/6131655/pexels-photo-6131655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Phoenix, AZ',
      phone: '(602) 555-0123',
      email: 'info@desertpawsshelter.org'
    },
    healthRecords: {
      vaccinated: true,
      neutered: true,
      microchipped: true,
      specialNeeds: true
    },
    isFavorite: false
  }
];

// Fetch featured pets
export const fetchFeaturedPets = () => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(pets);
    }, 1000);
  });
};

// Fetch all pets with filtering options
export const fetchPets = (filters = {}) => {
  return new Promise((resolve) => {
    // In a real API, you would apply filters server-side
    let filteredPets = [...pets];
    
    // Apply filters
    if (filters.type) {
      filteredPets = filteredPets.filter(pet => pet.type.toLowerCase() === filters.type.toLowerCase());
    }
    
    if (filters.breed) {
      filteredPets = filteredPets.filter(pet => pet.breed.toLowerCase().includes(filters.breed.toLowerCase()));
    }
    
    if (filters.age) {
      filteredPets = filteredPets.filter(pet => {
        const ageNum = parseInt(pet.age);
        if (filters.age === 'puppy-kitten' && ageNum < 1) return true;
        if (filters.age === 'young' && ageNum >= 1 && ageNum <= 3) return true;
        if (filters.age === 'adult' && ageNum > 3 && ageNum <= 8) return true;
        if (filters.age === 'senior' && ageNum > 8) return true;
        return false;
      });
    }
    
    if (filters.size) {
      filteredPets = filteredPets.filter(pet => pet.size.toLowerCase() === filters.size.toLowerCase());
    }
    
    if (filters.gender) {
      filteredPets = filteredPets.filter(pet => pet.gender.toLowerCase() === filters.gender.toLowerCase());
    }
    
    // Simulate API delay
    setTimeout(() => {
      resolve(filteredPets);
    }, 1000);
  });
};

// Fetch a single pet by ID
export const fetchPetById = (id) => {
  return new Promise((resolve, reject) => {
    const pet = pets.find(p => p.id === id);
    
    // Simulate API delay
    setTimeout(() => {
      if (pet) {
        resolve(pet);
      } else {
        reject(new Error('Pet not found'));
      }
    }, 1000);
  });
};

// Submit adoption application
export const submitApplication = (petId, applicationData) => {
  return new Promise((resolve) => {
    // In a real app, this would send the data to an API
    console.log('Submitting application for pet', petId, applicationData);
    
    // Simulate API delay and success
    setTimeout(() => {
      resolve({
        success: true,
        applicationId: `APP-${Date.now()}`,
        message: 'Your application has been submitted successfully!'
      });
    }, 1500);
  });
};

// Toggle favorite status
export const toggleFavorite = (petId, isFavorite) => {
  return new Promise((resolve) => {
    // In a real app, this would update the favorite status in the database
    console.log(`${isFavorite ? 'Adding' : 'Removing'} pet ${petId} ${isFavorite ? 'to' : 'from'} favorites`);
    
    // Simulate API delay and success
    setTimeout(() => {
      resolve({
        success: true,
        isFavorite
      });
    }, 500);
  });
};