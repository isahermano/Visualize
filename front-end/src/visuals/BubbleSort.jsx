import React, { useContext } from 'react'
import { AlgoContext } from '../context/AlgoContext'

const BubbleSort = () => {

  const { array, step, renderArray, animateSort } = useContext(AlgoContext);

  const bubbleSortAlgorithm = async (arr, updates) => {
    try {
      const n = arr.length;
      let swapped = false;

      for (let i = 0; i < n; i++) {
        swapped = false; // reset after each pass
        for (let j = 0; j < n - i - 1; j++) {
          updates.push({
            arrayState: [...arr],
            highlights: { comparing: [j, j + 1] },
            message: `Checking if ${arr[j]} (index ${[j]}) > ${arr[j + 1]} (index ${[j]}) and swap if true.`
          })

          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            swapped = true;
            updates.push({
              arrayState: [...arr],
              highlights: { swapping: [j, j + 1] },
              message: `${arr[j]} is greater than ${arr[j + 1]}. Swapping index ${[j]} and index ${[j + 1]}`
            })
          }
        }
        if(!swapped) {
          break; 
        }
      }

      updates.push({
        arrayState: [...arr],
        highlights: { sorted: Array.from({ length: n }, (_, i) => i) },
        message: "List is sorted!"
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col items-center'>
      {renderArray()}
      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={() => animateSort(bubbleSortAlgorithm, "Bubble Sort")}
        className='mt-4 px-4 py-2 bg-pink-400 text-white rounded'
      >
        Start Bubble Sort
      </button>
    </div>
  )
}

export default BubbleSort
