import React, {useContext} from 'react'
import { AlgoContext } from '../context/AlgoContext';

const Dequeue = () => {
  const { queue, setQueue, renderQueue, animateQueue, step } = useContext(AlgoContext);

  const dequeueOperation = async (queueCopy, updates) => {
    const dequeuedValue = queueCopy[0];
    const newQueue = queueCopy.slice(1);

    updates.push({
      queueState: newQueue,
      highlights: { extracted: [0]},
      message: `Dequeue value ${dequeuedValue} from head.`
    })

    setQueue(newQueue)
    console.log(queue);
    
  }

  return (
    <div className='flex flex-col items-center pt-60'>
      <div className='w-full'>
        {renderQueue()}
      </div>

      <div className='flex flex-col justify-center pt-6'>
        <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
        <button onClick={() => (animateQueue(dequeueOperation))}
          className='mt-40 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
        >
          Dequeue Element
        </button>

      </div>
    </div>
  )
}

export default Dequeue
