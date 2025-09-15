import React, { useContext } from 'react'
import { AlgoContext } from '../context/AlgoContext';

const SelectionSort = () => {

  const { array, step, renderArray, animateSort } = useContext(AlgoContext);

  const selectionsSortAlgorithm = async (arr, updates) => {
    try {
      const n = arr.length;

      for (let i = 0; i <= n - 1; i++) {
        let min = arr[i];
        let minIndex = i;

        // initialize min selection
        updates.push({
          arrayState: [...arr],
          highlights: { min: [minIndex] },
          message: `Starting pass ${i + 1}: Initial min is ${min} at index ${minIndex}`

        })

        // find min in unsorted section
        for (let j = i + 1; j < n; j++) {

          // highlight comparison
          updates.push({
            arrayState: [...arr],
            highlights: { min: [minIndex], comparing: [minIndex, j] },
            message: `Comparing ${arr[j]} at index ${j} < ${min} (min)`
          })

          if (arr[j] < min) {
            min = arr[j];
            minIndex = j;

            // highlight new min
            updates.push({
              arrayState: [...arr],
              highlights: { min: [minIndex] },
              message: `Element ${arr[j]} is less than ${min}. Set ${arr[j]} at index ${j} as the new min.`
            })
          }
        }

        // perform swap (only if needed)
        if (minIndex !== i) {
          // swap elements
          arr[minIndex] = arr[i];
          arr[i] = min;

          updates.push({
            arrayState: [...arr],
            highlights: {
              min: [minIndex],
              swapping: [i, minIndex]
            },
            message: `Swapped ${arr[i]} to index ${i}`
          })
        }

        // progressive sorting visual (marking new sorted element)
        updates.push({
          arrayState: [...arr],
          highlights: {
            sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
            min: [i]
          },
          message: `${arr[i]} is now in its final position`
        });
      }

      updates.push({
        arrayState: [...arr],
        highlights: { sorted: Array.from({ length: n }, (_, i) => i) },
        message: `List is sorted!`
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col items-center'>
      {renderArray()}
      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={() => animateSort(selectionsSortAlgorithm, "Selection Sort")}
        className='mt-4 px-4 py-2 bg-pink-400 text-white rounded'
      >
        Start Selection Sort
      </button>
    </div>
  )
}

export default SelectionSort
