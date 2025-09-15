import React, { useContext } from 'react'
import { AlgoContext } from '../context/AlgoContext'

const CountingSort = () => {
    const { array, step, renderArray, animateSort } = useContext(AlgoContext);

    const countingSortAlgorithm = async (arr, updates) => {
        const max = Math.max(...arr, 0);
        const min = Math.min(...arr, max);
        const range = max - min + 1;
        const count = new Array(range);

        // count occurrences of each element
        for (let i = 0; i < arr.length; i++) {
            count[arr[i] - min]++;
        }

        // modify count array to contain actual position
        for (let i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }

        const sortedArray = new Array(arr.length);

        // populate new array
        for (let i = arr.length - 1; i >= 0; i--) {
            sortedArray[count[arr[i] - min] - 1] = arr[i];
            count[arr[i] - min]--;
        }
        
        // copy arr back into original
        for (let i = 0; i < arr.length; i++) {
            arr[i] = sortedArray[i];
        }
    }

    return (
        <div className='flex flex-col items-center'>
            {renderArray()}
            <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
            <button onClick={() => animateSort(countingSortAlgorithm, "Counting Sort")}
                className='mt-4 px-4 py-2 bg-pink-400 text-white rounded'
            >
                Start Counting Sort
            </button>
        </div>
    )
}

export default CountingSort
