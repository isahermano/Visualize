import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const QuickSelect = ({ k, mode, array, isPlaying }) => {
  const [visualArray, setVisualArray] = useState(array)
  const [pivotIndex, setPivotIndex] = useState(null)
  const [pivotValue, setPivotValue] = useState(null)

  useEffect(() => {
    if (isPlaying) {
      // Pick a random pivot
      const randomIndex = Math.floor(Math.random() * visualArray.length)
      setPivotIndex(randomIndex)
      setPivotValue(visualArray[randomIndex])
    }
  }, [isPlaying])

  return (
    <div className='flex flex-col items-center pt-40'>
      {/* Display array boxes */}
      <div className='flex flex-wrap gap-2 justify-center mt-4'>
        {visualArray.map((val, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`text-white w-12 h-12 flex items-center justify-center rounded shadow transition-colors duration-300
              ${
                i === pivotIndex
                  ? 'bg-yellow-400'
                  : val < pivotValue
                  ? 'bg-green-400'
                  : val > pivotValue
                  ? 'bg-red-400'
                  : 'bg-blue-200'
              }`}
          >
            {val}
          </motion.div>
        ))}
      </div>

      {/* Array Indices */}
      <div className="flex gap-2 text-sm text-gray-600 mt-2">
        {visualArray.map((_, i) => (
          <div key={i} className="w-12 text-center">
            {i}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 text-sm text-gray-500 space-y-1">
        <div><span className="inline-block w-4 h-4 bg-yellow-400 mr-2"></span>Pivot</div>
        <div><span className="inline-block w-4 h-4 bg-green-400 mr-2"></span>Less than pivot</div>
        <div><span className="inline-block w-4 h-4 bg-red-400 mr-2"></span>Greater than pivot</div>
      </div>
    </div>
  )
}

export default QuickSelect
