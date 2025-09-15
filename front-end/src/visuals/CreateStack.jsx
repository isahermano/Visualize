import React, { useContext, useState } from 'react'
import { AlgoContext } from '../context/AlgoContext'
import { toast } from 'react-toastify';

const CreateStack = ({ inputs }) => {

  const { setStack, renderStack } = useContext(AlgoContext);
  const [showStack, setShowStack] = useState(false);

  const method = inputs[0];
  const size = parseInt(inputs[1]);

  const createStackAlgo = () => {
    try {
      if (method === "custom") {
        // Process custom array input
        const customStack = inputs[2]
          ?.split(',')
          .map(val => parseInt(val.trim()))
          .filter(val => !isNaN(val)) || [] // [] so that array is empty
        setStack(customStack.length ? customStack : [1, 2, 3, 4, 5]); // have default value
      } else {
        const randomStack = Array.from({ length: size }, () => Math.floor(Math.random() * (100 - 1 + 1) + 1));
        setStack(randomStack)
      }
      setShowStack(true);
    } catch (error) {
      console.log(error);
      toast.error("Error creating array")
    }
  }

  return (
    <div className='flex flex-col justify-between items-center min-h-96 pt-10'>
      {showStack && (
        <div className='w-full flex-1'>
          {renderStack()}
        </div>
      )}
      <div className='w-full flex justify-center pt-6 my-auto'>
        <button onClick={createStackAlgo}
          className='px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
        >
          {showStack ? 'Regenerate Stack' : 'Generate Stack'}
        </button>
      </div>
    </div>
  )
}

export default CreateStack
