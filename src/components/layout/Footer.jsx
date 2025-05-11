import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Find a Pet', url: '/pets' },
        { name: 'Shelters', url: '/shelters' },
        { name: 'Success Stories', url: '/success-stories' },
        { name: 'Pet Care Resources', url: '/pet-care' },
        { name: 'About Us', url: '/about' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Pet Care Blog', url: '/pet-care' },
        { name: 'FAQs', url: '/faq' },
        { name: 'Contact Us', url: '/contact' },
        { name: 'Support', url: '/contact' },
        { name: 'Careers', url: '/careers' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', url: '#' },
        { name: 'Privacy Policy', url: '#' },
        { name: 'Cookie Policy', url: '#' },
        { name: 'Accessibility', url: '#' }
      ]
    }
  ]

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/paw-icon.svg" alt="PawfectMatch Logo" className="w-10 h-10" />
              <span className="font-bold text-xl">PawfectMatch</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Connecting loving homes with pets in need. Our mission is to make pet adoption simple, 
              humane, and accessible to everyone.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram size={22} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook size={22} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter size={22} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiYoutube size={22} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.url} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} PawfectMatch. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-500 text-sm">
              Made with ❤️ for animals everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer