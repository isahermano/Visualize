import React, { useContext } from 'react'
import { AlgoContext } from '../context/AlgoContext'
import { toast } from 'react-toastify';

const Enqueue = ({ inputs }) => {
  const { queue, setQueue, renderQueue, animateQueue, step } = useContext(AlgoContext);
  const value = parseInt(inputs[0]);

  const enqueueOperation = async (queueCopy, updates) => {
    if (isNaN(value)) {
      toast.error("Enter a value");
      return;
    }

    const newQueue = [...queueCopy];
    newQueue.push(value)

    updates.push({
      queueState: newQueue,
      highlights: { inserted: [queue.length] },
      message: `Enqueue value ${value} at tail of queue`
    })

    setQueue(newQueue);
  }

  return (
    <div className='flex flex-col items-center pt-60'>
      <div className='w-full'>
        {renderQueue()}
      </div>

      <div className='flex flex-col justify-center pt-6'>
        <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
        <button onClick={() => (animateQueue(enqueueOperation))}
          className='mt-40 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
        >
          Enqueue Element
        </button>

      </div>
    </div>
  )
}

export default Enqueue
