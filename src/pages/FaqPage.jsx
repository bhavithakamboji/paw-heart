import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiFilter, FiChevronDown, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState('adoption')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState({})
  
  const categories = [
    { id: 'adoption', label: 'Adoption Process' },
    { id: 'pets', label: 'About Our Pets' },
    { id: 'account', label: 'Account & Profile' },
    { id: 'shelters', label: 'For Shelters' },
    { id: 'policies', label: 'Policies' }
  ]
  
  const faqItems = {
    adoption: [
      {
        question: "How does the adoption process work?",
        answer: `Our adoption process is designed to ensure the best match between pets and adopters. First, browse available pets and find your match. Then, submit an adoption application with your information and preferences. The shelter will review your application and may conduct a home check or interview. If approved, you'll finalize the adoption with any required fees, and welcome your new pet home!`
      },
      {
        question: "What are the requirements to adopt a pet?",
        answer: `Requirements vary by shelter, but generally include being at least 18 years old, having a valid ID, proof of residence, and sometimes landlord approval if you rent. Some shelters may require a home check, references, or verification that your living situation is suitable for the specific pet you're interested in adopting.`
      },
      {
        question: "Are there any adoption fees?",
        answer: `Yes, most shelters charge adoption fees which typically cover vaccinations, spaying/neutering, microchipping, and other veterinary care the pet has received. Fees vary by shelter and sometimes by the type, age, and breed of the pet. These fees help shelters continue their rescue work and ensure pets receive proper care.`
      },
      {
        question: "How long does the adoption process take?",
        answer: `The timeline varies depending on the shelter and your specific situation. Some adoptions can be completed in a single day, while others might take a week or more, especially if home checks or additional verifications are required. We strive to make the process as efficient as possible while ensuring the best outcome for both pets and adopters.`
      },
      {
        question: "Can I return a pet if it doesn't work out?",
        answer: `Most shelters have policies for returns, though we strongly encourage working through adjustment periods and challenges. Many issues can be resolved with training, patience, and proper support. If returning is necessary, contact the shelter directly. Their priority is the pet's wellbeing, and they'd rather have the pet returned safely than have it end up in a difficult situation.`
      }
    ],
    pets: [
      {
        question: "Are all pets on PawfectMatch up to date on vaccinations?",
        answer: `Most pets listed on our platform have received their core vaccinations, but the exact medical history varies by pet and shelter. Each pet profile includes health information, including vaccination status. For specific questions about a pet's medical history, we recommend contacting the shelter directly.`
      },
      {
        question: "Do you have purebred pets available for adoption?",
        answer: `Yes, purebred pets do become available for adoption, though mixed breeds are more common. Approximately 25% of shelter animals are purebreds. If you're looking for a specific breed, you can use our search filters or consider connecting with breed-specific rescue groups through our platform.`
      },
      {
        question: "How accurate are the breed descriptions?",
        answer: `For many shelter pets, breed descriptions are best guesses based on appearance and behavior, unless the pet came with documented lineage. For mixed-breed pets, shelters typically list the predominant breeds they believe are in the mix. Some shelters may use DNA testing for more accurate breed identification, but this isn't standard practice.`
      },
      {
        question: "Are the pets housetrained or have behavioral training?",
        answer: `Training levels vary widely among adoptable pets. Some are fully housetrained and know basic commands, while others may need more work. Pet profiles include information about known training and behavior, and many shelters assess pets before listing them. Some shelters also offer post-adoption training resources or classes.`
      },
      {
        question: "Do you have information about a pet's history?",
        answer: `The amount of history available depends on how the pet came to the shelter. For owner surrenders, we often have detailed background information. For strays or rescued pets, history may be limited. Shelters provide all known information on pet profiles, and their staff can often share additional behavioral observations from the pet's time in their care.`
      }
    ],
    account: [
      {
        question: "How do I create an account?",
        answer: `Creating an account is easy! Click the "Register" button in the top right corner of the website. Fill in your basic information including name, email, and password. You'll receive a verification email to confirm your account. Once verified, you can complete your profile with additional details that will help match you with potential pets.`
      },
      {
        question: "Can I save pets to view later?",
        answer: `Yes! Once you're logged in, you can save pets to your favorites by clicking the heart icon on any pet profile or card. Access your saved pets anytime by visiting the "Favorites" section in your dashboard. You'll also receive notifications if there are updates to any of your favorited pets.`
      },
      {
        question: "How do I update my profile information?",
        answer: `To update your profile, log in to your account and navigate to the "Settings" section in your dashboard. Here you can edit your personal information, contact details, preferences, and password. Don't forget to save your changes before exiting the page.`
      },
      {
        question: "Can I delete my account?",
        answer: `Yes, you can delete your account at any time. Go to "Settings" in your dashboard, scroll to the bottom, and select "Delete Account." Please note that this action is permanent and will remove all your data, including saved pets, application history, and messages. If you have active applications, we recommend resolving these before deletion.`
      },
      {
        question: "Is my personal information secure?",
        answer: `We take data security very seriously. Your personal information is encrypted and stored securely. We only share your information with shelters when you explicitly submit an adoption application. We never sell your data to third parties. For more details, please review our Privacy Policy.`
      }
    ],
    shelters: [
      {
        question: "How can our shelter join PawfectMatch?",
        answer: `We welcome shelters and rescue organizations! To join, click on "For Shelters" in the footer and complete the partnership application. We'll review your information, verify your organization's status, and reach out to set up your shelter profile. The process typically takes 3-5 business days.`
      },
      {
        question: "Is there a fee for shelters to use the platform?",
        answer: `PawfectMatch is free for registered non-profit animal shelters and rescue organizations. We offer basic listings at no cost, with optional premium features available for a small monthly fee. Our mission is to help as many pets find homes as possible, regardless of a shelter's budget.`
      },
      {
        question: "How do we add or update pet listings?",
        answer: `Once your shelter account is approved, you can manage pet listings through your shelter dashboard. You can add new pets, update information, mark pets as adopted, and manage applications all in one place. The interface is user-friendly, but we also provide training resources and support if needed.`
      },
      {
        question: "How does the application review process work for shelters?",
        answer: `Applications submitted through PawfectMatch are immediately forwarded to your shelter's dashboard. You'll receive notifications for new applications, and can review applicant information, communicate with potential adopters through our messaging system, and update application status all within the platform. You maintain complete control over your adoption decisions.`
      },
      {
        question: "Can we integrate PawfectMatch with our existing shelter management software?",
        answer: `Yes! We offer integration with popular shelter management systems like Shelterluv, PetPoint, and Rescuegroups. This allows for automatic syncing of pet listings and adoption status. For custom integrations, please contact our shelter support team to discuss options.`
      }
    ],
    policies: [
      {
        question: "What is your privacy policy?",
        answer: `Our privacy policy details how we collect, use, and protect your personal information. We collect basic profile information, pet preferences, and adoption application details. This information is used to facilitate adoptions, improve our services, and communicate with you. We never sell your data to third parties. For the complete policy, please visit our Privacy Policy page.`
      },
      {
        question: "Do you have a return policy for adopted pets?",
        answer: `Return policies are set by individual shelters, not by PawfectMatch. Most shelters ask that if an adoption isn't working out, the pet is returned to them rather than being rehomed independently. This ensures the pet's safety and proper care. Each shelter's specific return policy is typically included in their adoption agreement.`
      },
      {
        question: "How do you verify shelters on your platform?",
        answer: `We have a thorough verification process for shelters that includes checking their non-profit status, licensing, and references. We may also conduct virtual or in-person visits. This ensures that all organizations on our platform maintain high standards of animal care and ethical adoption practices.`
      },
      {
        question: "What happens if I encounter a problem with a shelter?",
        answer: `If you experience issues with a shelter or adoption process, please contact our support team immediately. We take concerns seriously and will investigate all reports. We maintain quality standards for shelter partners and can mediate issues when necessary. Our primary concern is always the welfare of the pets and ensuring a positive adoption experience.`
      },
      {
        question: "Are adoption fees refundable?",
        answer: `Refund policies for adoption fees are determined by individual shelters, not by PawfectMatch. Most shelters have limited refund policies, as these fees cover costs already incurred for the pet's care. Some may offer partial refunds under specific circumstances. The refund policy should be clearly stated in the adoption agreement from the shelter.`
      }
    ]
  }
  
  const toggleItem = (itemIndex) => {
    setExpandedItems(prev => ({
      ...prev,
      [activeCategory + '-' + itemIndex]: !prev[activeCategory + '-' + itemIndex]
    }))
  }
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery 
    ? Object.values(faqItems).flat().filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems[activeCategory]
  
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Find answers to common questions about pet adoption, our platform, and more
          </motion.p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10 w-full"
              placeholder="Search for questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          {/* Category Tabs - Hidden when searching */}
          {!searchQuery && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex overflow-x-auto scrollbar-hide space-x-2 mb-8 pb-2"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>
          )}
          
          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-md divide-y divide-gray-200"
          >
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, index) => {
                const itemKey = searchQuery 
                  ? `search-${index}` 
                  : `${activeCategory}-${index}`
                
                const isExpanded = expandedItems[itemKey]
                
                return (
                  <div key={itemKey} className="transition-colors hover:bg-gray-50">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
                    >
                      <span className="text-lg font-medium text-gray-900 text-left">
                        {item.question}
                      </span>
                      <span className="ml-4 flex-shrink-0">
                        {isExpanded ? (
                          <FiX className="h-5 w-5 text-primary-600" />
                        ) : (
                          <FiChevronDown className="h-5 w-5 text-primary-600" />
                        )}
                      </span>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })
            ) : (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-400 mb-4">
                  <FiSearch className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any FAQs matching "{searchQuery}".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-primary-600 font-medium hover:text-primary-700"
                >
                  Clear search
                </button>
              </div>
            )}
          </motion.div>
          
          {/* Still have questions section */}
          <div className="mt-12 text-center bg-primary-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Feel free to reach out to our support team.
            </p>
            <Link 
              to="/contact" 
              className="btn btn-primary rounded-md inline-flex items-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqPage