import React, { useContext } from 'react'
import { AlgoContext } from '../context/AlgoContext';

const Pop = () => {
  const { stack, setStack, setPush, renderStack, animateStack, step } = useContext(AlgoContext);

  const popOperation = async (stackCopy, updates) => {
    if (stack.length === 0) {
      return;
    }

    const newStack = stackCopy.slice(0, -1) // remove last element
    const poppedValue = stackCopy[stack.length - 1];

    updates.push({
      stackState: newStack,
      highlights: { extracted: [stack.length - 1] },
      message: `Popped value ${poppedValue} from the stack`
    })

    setStack(newStack);
  }

  return (
    <div className='flex flex-col items-center items-center min-h-96 pt-10'>
      <div className='w-full max-w-'>
        {renderStack()}
      </div>

      <div className='flex flex-col justify-center pt-6'>
         <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
        <button onClick={() => (animateStack(popOperation))}
          className='mt-40 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
        >
          Pop Element
        </button>
      </div>
    </div>
  )
}

export default Pop
