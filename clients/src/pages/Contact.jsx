import React from 'react';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaInstagram, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className='min-h-screen w-full  pt-30 bg-black text-white'>
    

      {/* Main Content */}
      <div className='container mx-auto px-6 py-16 max-w-7xl'>
        {/* Hero Text */}
        <div className='text-center mb-20'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent'>
            Contact Us
          </h1>
          <p className='text-xl text-gray-400 max-w-2xl mx-auto'>
            Curiosity isn't a weakness - it's the first step to understanding. Those who never ask remain in the dark.
          </p>
        </div>

        {/* Contact Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mb-20'>
          {/* Contact Info */}
          <div className='bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300'>
            <h2 className='text-2xl font-bold mb-6 text-white'>Get in Touch</h2>
            
            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-blue-900/30 rounded-lg text-blue-400'>
                  <FaEnvelope className='text-xl' />
                </div>
                <div>
                  <h3 className='font-medium text-gray-400'>Email</h3>
                  <a href="mailto:aairo.contact@gmail.com" className='text-blue-400 hover:underline'>
                   aairosociety@gmail.com
                  </a>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='p-3 bg-green-900/30 rounded-lg text-green-400'>
                  <FaWhatsapp className='text-xl' />
                </div>
                <div>
                  <h3 className='font-medium text-gray-400'>WhatsApp Group</h3>
                  <p className='text-green-400 hover:underline cursor-pointer'>
                    Join our community chat
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='p-3 bg-purple-900/30 rounded-lg text-purple-400'>
                  <FaMapMarkerAlt className='text-xl' />
                </div>
                <div>
                  <h3 className='font-medium text-gray-400'>Address</h3>
                  <p className='text-gray-300'>
                    4th Block, lower ground<br />
                    Dr. Akhilesh Das Gupta Institute of Professional Studies<br />
                    Shastri Park, Delhi-110053
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className='bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 hover:border-purple-500 transition-all duration-300'>
            <h2 className='text-2xl font-bold mb-6 text-white'>Follow Us</h2>
            
            
          </div>
        </div>

        {/* Subtle Footer */}
        {/* <div className='text-center text-gray-500 text-sm'>
          © {new Date().getFullYear()} AAIRO. All rights reserved.
        </div> */}
      </div>
    </div>
  )
}

export default Contact;