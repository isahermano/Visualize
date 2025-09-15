import React, { useEffect, useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlgoContext } from '../context/AlgoContext';
import { toast } from 'react-toastify';

const CreateArray = ({ inputs }) => {

  const { setArray, renderArray } = useContext(AlgoContext)
  const [showArray, setShowArray] = useState(false);

  const method = inputs[0];
  const size = parseInt(inputs[1]) || 5;
  const max = parseInt(inputs[2]) || 50;
  const min = parseInt(inputs[3]) || 1;

  const createArrayAlgo = () => {
    try {
      if (method === "custom") {
        // Process custom array input
        const customArray = inputs[4]
          ?.split(',')
          .map(val => parseInt(val.trim()))
          .filter(val => !isNaN(val)) || [] // [] so that array is empty
        setArray(customArray.length ? customArray : [1, 2, 3, 4, 5]); // have default value
      } else {
        const randomArray = Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1) + min));
        setArray(randomArray)
      }
      setShowArray(true);
    } catch (error) {
      console.log(error);
      toast.error("Error creating array")
    }
  }

  return (
    <div className='flex flex-col items-center pt-40'>
      {showArray && (
        <div className='mb-8'>
          {renderArray()}
        </div>
      )}

      <button onClick={createArrayAlgo}
        className='mt-4 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
      >
        Generate Array
      </button>
    </div>
  )
}

export default CreateArray
