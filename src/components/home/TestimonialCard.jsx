import { motion } from 'framer-motion'

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg overflow-hidden shadow-md"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={testimonial.petImage} 
          alt="Adopted pet" 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
            <p className="text-sm text-gray-500">{testimonial.location}</p>
          </div>
        </div>
        <p className="text-gray-600 italic">"{testimonial.text}"</p>
      </div>
    </motion.div>
  )
}

export default TestimonialCard