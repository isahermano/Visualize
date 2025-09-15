import React, {useContext} from 'react'
import { AlgoContext } from '../context/AlgoContext';
import { toast } from 'react-toastify';

const ArrayDelete = ({inputs}) => {

  const { array, step, renderArray, animateSort } = useContext(AlgoContext);
  const index = parseInt(inputs[0]);

  const deleteAlgorithm = async(arr, updates) => {
    if(index > arr.length || index < 0) {
      toast.error("Enter a valid index.")
      return;
    }

    updates.push({
      arrayState: [...array],
      highlights: {extracted: [index]},
      message: `Deleting element ${array[index]} at index ${index}`
    })
    
    // delete element
    arr[index] = null;

    // final deletion complete
    updates.push({
      arrayState: [...arr],
      highlights: { sorted: Array.from({ length: array,length }, (_, index) => index) },
      message: "Deletion complete"
    });
  }

  return (
     <div className='flex flex-col items-center pt-40'>
      {renderArray()}
      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={() => animateSort(deleteAlgorithm, "Insertion Sort")}
        className='mt-4 px-4 py-2 bg-pink-400 text-white rounded'
      >
        Delete value
      </button>
    </div>
  )
}

export default ArrayDelete
