import React, { useContext, useState } from 'react'
import { AlgoContext } from '../context/AlgoContext'

const PeekQueue = () => {

  const { queue, renderQueue, animateQueue, step } = useContext(AlgoContext);

  const peekHead = async (queueCopy, updates) => {
    const newQueue = [...queueCopy];

    updates.push({
      queueState: newQueue,
      highlights: {},
      message: `Peeking queue...`
    })

    updates.push({
      queueState: newQueue,
      highlights: { sorted: [0] },
      message: `Value stored at head is ${newQueue[0]}`
    })
  }

  const peekTail = async (queueCopy, updates) => {
    const newQueue = [...queueCopy];

    updates.push({
      queueState: newQueue,
      highlights: {},
      message: `Peeking queue...`
    })

    updates.push({
      queueState: newQueue,
      highlights: { sorted: [queueCopy.length - 1] },
      message: `Value stored tail is ${newQueue[queue.length - 1]}`
    })
  }


  const peekOperation = async (queueCopy, updates) => {
    const newQueue = [...queueCopy];

    updates.push({
      queueState: newQueue,
      highlights: {},
      message: `Peeking queue...`
    })

    updates.push({
      queueState: newQueue,
      highlights: { sorted: [queue.length - 1] },
      message: `Value stored at top/head is ${newQueue[queue.length - 1]}`
    })
  }

  return (
    <div className='flex flex-col items-center pt-60'>
      <div className='w-full'>
        {renderQueue()}
      </div>

      <div className='flex flex-col justify-center pt-6'>
        <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
        <div className='grid grid-cols-2 gap-4'>
          <button onClick={() => (animateQueue(peekHead))}
            className='mt-40 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
          >
            Peek Head
          </button>
          <button onClick={() => (animateQueue(peekTail))}
            className='mt-40 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
          >
            Peek Tail
          </button>

        </div>
      </div>
    </div>
  )
}

export default PeekQueue
