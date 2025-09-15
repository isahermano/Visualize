import React, { useContext } from 'react'
import { AlgoContext } from '../context/AlgoContext'
import { toast } from 'react-toastify';

const InsertBH = ({ inputs }) => {

  const { renderHeap, heapSize, animateHeap, heap, step, heapified } = useContext(AlgoContext);

  const value = parseInt(inputs[0]);

  const parent = (i) => Math.floor((i - 1) / 2)

  const insertAlgo = async (heap, size, updates) => {
    if (isNaN(value)) {
      toast.error("Enter a value")
      return;
    }

    updates.push({
      heapState: [...heap],
      heapSize: size,
      highlights: {},
      message: `Inserting value ${value} into the max heap`
    });

    heap.push(value);
    size += 1;

    updates.push({
      heapState: [...heap],
      heapSize: size,
      highlights: { inserted: [heapSize] },
      message: `Inserting value ${value} at index ${heapSize}`
    });

    let curr = size - 1;
    // heapify 
    while (curr > 0) {
      const parentIndex = parent(curr)

      updates.push({
        heapState: [...heap],
        heapSize: size,
        highlights: { comparing: [curr, parentIndex] },
        message: `Inserting value ${value} at index ${heapSize}`
      });

      // if curr is smaller than or equal to parent, heap property is satisfied 
      if (heap[curr] <= heap[parentIndex]) {
        updates.push({
          heapState: [...heap],
          heapSize: size,
          highlights: { sorted: [curr] },
          message: `${heap[curr]} ≤ ${heap[parentIndex]}, max heap property satisfied`
        });
        break;
      }

      // Current element is greater than parent, swap them
      updates.push({
        heapState: [...heap],
        heapSize: size,
        highlights: { swapping: [curr, parentIndex] },
        message: `${heap[curr]} > ${heap[parentIndex]}, swapping to maintain max heap property`
      });

      [heap[curr], heap[parentIndex]] = [heap[parentIndex], heap[curr]];

      updates.push({
        heapState: [...heap],
        heapSize: size,
        highlights: { sorted: [parentIndex] },
        message: `Swapped! Continue bubbling up from index ${parentIndex}`
      });
    }

    if (curr === 0) {
      updates.push({
        heapState: [...heap],
        heapSize: size,
        highlights: { sorted: [0] },
        message: `Element ${heap[0]} reached root position, max heap property satisfied`
      });
    }

    updates.push({
      heapState: [...heap],
      heapSize: size,
      highlights: { sorted: Array.from({ length: heapSize }, (_, i) => i) },
      message: `Insert operation complete! Value ${value} successfully inserted into max heap.`
    });

  }

  return (
    <div className='flex flex-col items-center pt-40'>
      <div className='mb-8'>
        {heapified && renderHeap()}
      </div>

      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={() => animateHeap(insertAlgo)}
        className='mt-4 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
      >
        Insert Value
      </button>
    </div>
  )
}

export default InsertBH
