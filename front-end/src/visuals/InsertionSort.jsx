import React, { useContext } from 'react'
import { AlgoContext } from '../context/AlgoContext'

const InsertionSort = () => {

  const { array, step, renderArray, animateSort } = useContext(AlgoContext);

  const insertionSortAlgorithm = async (arr, updates) => {
    try {
      const n = arr.length;

      // insertion sort: will have a sorted and unsorted section of array
      // will insert an element into the sorted section, shifting elements over as needed

      for (let i = 1; i < n; i++) { // start at i=1, since a[0] is trivially sorted
        let temp = arr[i]; // temp = value want to insert in sorted array
        let tempIndex = i;
        let j = i - 1; // used to scan leftwards through sorted section

        // 1. extract temp visually
        updates.push({
          arrayState: [...arr],
          highlights: { extracted: [tempIndex] },
          message: `Extracting ${temp} for insertion.`
        })

        // 2. compare and shift
        while (j >= 0 && arr[j] > temp) { // shift elements to right until we find where temp belongs
          updates.push({
            arrayState: [...arr],
            highlights: { comparing: [j], hole: [j + 1] },
            message: `Comparing ${arr[j]} > ${temp} → shifting right`
          })

          arr[j + 1] = arr[j]; // shift right;    
         
          updates.push({
            arrayState: [...arr],
            highlights: {
              carrying: temp,
              carriedOver: j,
              hole: [j + 1],
              shiftedIndex: j
            },
            message: `Carrying ${temp} over to shift ${arr[j]}`
          })

          j--; // shifting leftwards
        }
        // 3. Insert temp
        arr[j + 1] = temp; // place temp in correct spot
        updates.push({
          arrayState: [...arr],
          highlights: { inserted: [j + 1] },
          message: `Inserted ${temp} into position ${j + 1}.`
        })

        // 4. checking sorted elements
        updates.push({
          arrayState: [...arr],
          highlights: { sorted: Array.from({ length: i + 1 }, (_, index) => index) },
          message: `First ${i + 1} elements are now sorted.`
        })
      }

      // final sorted state
      updates.push({
        arrayState: [...arr],
        highlights: { sorted: Array.from({ length: n }, (_, index) => index) },
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
      <button onClick={() => animateSort(insertionSortAlgorithm, "Insertion Sort")}
        className='mt-4 px-4 py-2 bg-pink-400 text-white rounded'
      >
        Start Insertion Sort
      </button>
    </div>
  )
}

export default InsertionSort
