import React, { useContext } from 'react'
import { AlgoContext } from '../context/AlgoContext';

const QuickSort = () => {

  const { array, renderArray, animateSort, step } = useContext(AlgoContext);

  const quickSortAlgorithm = async (arr, updates) => {
    try {
      const quickSort = async (arr, start, end) => {
        const partition = async (start, end) => {
          const pivotValue = arr[end];
          let pivotIndex = start;

          // Visualize pivot selection
          updates.push({
            arrayState: [...arr],
            highlights: { pivot: end, comparing: [] },
            message: `Selecting pivot: ${pivotValue} at index ${end}`
          });

          for (let i = start; i < end; i++) {
            // Visualize comparison
            updates.push({
              arrayState: [...arr],
              highlights: {
                comparing: [i],
                pivot: end,
                current: pivotIndex
              },
              message: `Comparing ${arr[i]} with pivot ${pivotValue}`
            });

            if (arr[i] < pivotValue) {
              // Visualize potential swap before doing it
              if (i !== pivotIndex) {
                updates.push({
                  arrayState: [...arr],
                  highlights: {
                    comparing: [i, pivotIndex],
                    pivot: end
                  },
                  message: `Will swap ${arr[i]} (at ${i}) with ${arr[pivotIndex]} (at ${pivotIndex})`
                });
              }

              // Perform swap
              [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];

              // Visualize completed swap
              if (i !== pivotIndex) {
                updates.push({
                  arrayState: [...arr],
                  highlights: {
                    swapping: [i, pivotIndex],
                    pivot: end
                  },
                  message: `Swapped ${arr[pivotIndex]} (now at ${pivotIndex}) with ${arr[i]} (now at ${i})`
                });
              }

              pivotIndex++;
            }
          }

          // Visualize final pivot movement
          updates.push({
            arrayState: [...arr],
            highlights: {
              swapping: [pivotIndex, end],
              pivot: end
            },
            message: `Moving pivot ${pivotValue} to final position ${pivotIndex}`
          });

          // Perform final swap
          [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];

          // Visualize pivot in correct position
          updates.push({
            arrayState: [...arr],
            highlights: {
              pivot: pivotIndex,
              sorted: [pivotIndex],
              comparing: []
            },
            message: `Pivot ${pivotValue} now correctly placed at index ${pivotIndex}`
          });

          return pivotIndex;
        };

        if (start >= end) {
          if (start === end) {
            updates.push({
              arrayState: [...arr],
              highlights: {
                sorted: [start],
                comparing: []
              },
              message: `Single element at index ${start} is sorted`
            });
          }
          return;
        }

        const pivotIndex = await partition(start, end);
        await quickSort(arr, start, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, end);
      };

      await quickSort(arr, 0, arr.length - 1);

      // Final sorted state
      updates.push({
        arrayState: [...arr],
        highlights: {
          sorted: Array.from({ length: arr.length }, (_, i) => i),
          comparing: []
        },
        message: "Array fully sorted!"
      });
    } catch (error) {
      console.error("QuickSort error:", error);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      {renderArray()}
      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={() => animateSort(quickSortAlgorithm, "Quick Sort")}
        className='mt-4 px-4 py-2 bg-pink-400 text-white rounded'
      >
        Start Quick Sort
      </button>
    </div>
  )
}

export default QuickSort
