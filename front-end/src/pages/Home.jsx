import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collections } from '../assets/assets'; // Adjust the import path as needed

const Home = () => {
  // Color variants for cards
  const cardColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-yellow-500 to-yellow-600',
    'from-red-500 to-red-600',
    'from-indigo-500 to-indigo-600',
    'from-pink-500 to-pink-600'
  ];

  return (
    <div className='min-h-screen py-18 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>Visualize. Anywhere.</h1>
          <p className='text-xl text-gray-700 max-w-2xl mx-auto'>
            An interactive tool to analyze and understand algorithms through visualizations.
          </p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'
            >
              <Link to={`/collections/${collection.id}`} className='block'>
                {/* Image Container */}
                <div className='relative h-48 overflow-hidden'>
                  <img 
                    src={collection.thumbnail[0]} 
                    alt={collection.name}
                    className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${cardColors[index % cardColors.length]} opacity-0 hover:opacity-20 transition-opacity duration-300`}></div>
                </div>
                
                {/* Content */}
                <div className='p-5'>
                  <div className='flex items-center mb-3'>
                    <h2 className='text-xl font-semibold text-gray-900'>{collection.name}</h2>
                  </div>
                  <div className='flex items-center text-sm text-gray-500 font-medium'>
                    <span>Explore visualizations</span>
                    {/* arrow */}
                    <svg className='w-4 h-4 ml-1' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Start Your Visual Learning Journey</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Select any category above to begin exploring algorithm visualizations. Our interactive tools help you understand how algorithms work step by step.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;