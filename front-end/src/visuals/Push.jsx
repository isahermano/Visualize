import React, { useContext } from 'react'
import { AlgoContext } from '../context/AlgoContext';

const Push = ({ inputs }) => {
  const { stack, setStack, renderStack, animateStack, step } = useContext(AlgoContext);

  const value = parseInt(inputs[0]);

  const pushOperation = async (stackCopy, updates) => {
    if (isNaN(value)) {
      toast.error("Enter a value");
      return;
    }
    const newStack = [...stackCopy, value];

    updates.push({
      stackState: newStack,
      highlights: { inserted: [stack.length] },
      message: `Pushed value ${value} at head of stack`
    })

    setStack(newStack)
  }

  return (
    <div className='flex flex-col items-center items-center min-h-96 pt-10'>
      <div className='w-full'>
        {renderStack()}
      </div>

      <div className='flex flex-col justify-center pt-6'>
        <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
        <button onClick={() => (animateStack(pushOperation))}
          className='mt-40 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
        >
          Push Element
        </button>
      </div>
    </div>
  )
}

export default Push
