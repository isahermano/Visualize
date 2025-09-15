import React, { useContext } from 'react'
import { AlgoContext } from '../context/AlgoContext';

const PeekStack = () => {
  const { stack, setStack, setPush, renderStack, animateStack, step } = useContext(AlgoContext);

  const peekOperation = async (stackCopy, updates) => {
    const newStack = [...stackCopy];

    updates.push({
      stackState: newStack,
      highlights: {},
      message: `Peeking stack...`
    })

    updates.push({
      stackState: newStack,
      highlights: { sorted: [stack.length - 1] },
      message: `Value stored at top/head is ${newStack[stack.length - 1]}`
    })
  }

  return (
    <div className='flex flex-col items-center items-center min-h-96 pt-10'>
      <div className='w-full max-w-'>
        {renderStack()}
      </div>

      <div className='flex flex-col justify-center pt-6'>
        <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
        <button onClick={() => (animateStack(peekOperation))}
          className='mt-40 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
        >
          Peek Element
        </button>
      </div>
    </div>
  )
}

export default PeekStack
