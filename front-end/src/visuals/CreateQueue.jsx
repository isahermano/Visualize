import React, { useContext, useState } from 'react'
import { AlgoContext } from '../context/AlgoContext'
import { toast } from 'react-toastify';

const CreateQueue = ({ inputs }) => {
  const { setQueue, renderQueue } = useContext(AlgoContext);
  const [showQueue, setShowQueue] = useState(false);

  const method = inputs[0];
  const size = parseInt(inputs[1]);

  const createQueueAlgo = () => {
    if (isNaN(size) && method === "random") {
      toast.error("Enter a size")
      return;
    }

    try {
      if (method === "custom") {
        // Process custom array input
        const customQueue = inputs[2]
          ?.split(',')
          .map(val => parseInt(val.trim()))
          .filter(val => !isNaN(val)) || [] // [] so that array is empty
        setQueue(customQueue.length ? customQueue : [1, 2, 3, 4, 5]); // have default value
      } else {
        const randomQueue = Array.from({ length: size }, () => Math.floor(Math.random() * (100 - 1 + 1) + 1));
        setQueue(randomQueue)
      }
      setShowQueue(true);
    } catch (error) {
      console.log(error);
      toast.error("Error creating queue")
    }
  }

  return (
    <div className='flex flex-col items-center pt-60'>
      {showQueue && (
        <div className='w-full flex-1'>
          {renderQueue()}
        </div>
      )}
      <div className='w-full flex justify-center my-auto pt-20'>
        <button onClick={createQueueAlgo}
          className='px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
        >
          {showQueue ? 'Regenerate Queue' : 'Generate Queue'}
        </button>
      </div>
    </div>
  )
}

export default CreateQueue
