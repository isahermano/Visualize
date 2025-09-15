import React, { useContext } from 'react'
import { AlgoContext } from '../context/AlgoContext'


const MergeSort = () => {
  const { array, renderArray, animateSort, step } = useContext(AlgoContext);

  const mergeSortAlgorithm = async (arr, updates, depth = 0, start = 0, end = arr.length - 1) => {
    try {
      const merge = (arr, start, mid, end, depth) => {
        const left = arr.slice(start, mid + 1);
        const right = arr.slice(mid + 1, end + 1);
        let i = 0, j = 0, k = start;

        // visualize merge
        updates.push({
          arrayState: [...arr],
          highlights: {
            merging: {
              left: Array.from({ length: left.length }, (_, index) => start + index),
              right: Array.from({ length: right.length }, (_, index) => mid + 1 + index)
            },
            depth: depth
          },
          message: `Merging subarrays...`
        });

        while (i < left.length && j < right.length) {
          updates.push({
            arrayState: [...arr],
            highlights: {
              comparing: [start + i, mid + 1 + j],
              merging: {
                left: [start + i],
                right: [mid + 1 + j]
              },
              depth: depth
            },
            message: `Comparing ${left[i]} and ${right[j]}`
          });

          // compare elements in each sub array and sort
          if (left[i] <= right[j]) {
            arr[k] = left[i];
            updates.push({
              arrayState: [...arr],
              highlights: { inserted: [k], value: left[i] },
              message: `Taking ${left[i]} from left subarray and inserting it at index ${k}`
            });
            i++;
          } else {
            arr[k] = right[j];
            updates.push({
              arrayState: [...arr],
              highlights: { inserted: [k], value: right[j] },
              message: `Taking ${right[j]} from right subarray and inserting it at index ${k}`
            });
            j++;
          }
          k++;
        }

        while (i < left.length) {
          arr[k] = left[i];
          updates.push({
            arrayState: [...arr],
            highlights: { inserted: [k], value: left[i] },
            message: `Copying remaining left subarray element ${left[i]}`
          });
          i++;
          k++;
        }
        while (j < right.length) {
          arr[k] = right[j];
          updates.push({
            arrayState: [...arr],
            highlights: { inserted: [k], value: right[j] },
            message: `Copying remaining right subarray element ${right[j]}`
          });
          j++;
          k++;
        }
      };

      // base case: array is len 0 or 1
      if (start >= end) {
        return;
      }

      const mid = Math.floor((start + end) / 2);

      updates.push({
        arrayState: [...arr],
        highlights: {
          splitting: {
            left: Array.from({ length: mid - start + 1 }, (_, i) => start + i),
            right: Array.from({ length: end - mid }, (_, i) => mid + 1 + i),
          },
          depth: depth
        },
        message: `Splitting array at index ${mid}`
      });

      // split sub arrays
      await mergeSortAlgorithm(arr, updates, depth + 1, start, mid);
      await mergeSortAlgorithm(arr, updates, depth + 1, mid + 1, end);

      // sort + merge sub arrays
      await merge(arr, start, mid, end, depth);

      updates.push({
        arrayState: [...arr],
        highlights: {
          sorted: Array.from({ length: end - start + 1 }, (_, i) => start + i),
          depth: 0
        },
        message: `Merged complete subarray`
      });

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col items-center'>
      {renderArray()}
      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={() => animateSort(mergeSortAlgorithm, "Merge Sort")}
        className='mt-4 px-4 py-2 bg-pink-400 text-white rounded'
      >
        Start Merge Sort
      </button>
    </div>
  )
}

export default MergeSort
