import React, { useContext } from 'react'
import { AlgoContext } from '../context/AlgoContext';
import { toast } from 'react-toastify';

const HeapSort = ({ inputs }) => {
  const { animateHeap, renderHeap, heap, setHeap, setHeapSize, step } = useContext(AlgoContext);
  const arrayMethod = inputs[0] || "random"
  const size = inputs[1] || 6
  const customInput = inputs[2] || "1, 41, 8, 29, 12, 7";
  const leftChild = (i) => 2 * i + 1;
  const rightChild = (i) => 2 * i + 1;

  const heapifyDown = async (arr, heapSize, i, updates) => {
    let largest = i;
    const left = leftChild(i);
    const right = rightChild(i);

    updates.push({
      heapState: [...arr],
      heapSize: heapSize,
      highlights: {
        current: i,
        leftChild: left < heapSize ? left : undefined,
        rightChild: right < heapSize ? right : undefined
      },
      message: `Heapifying down from index ${i}. Checking children.`
    });

    if (left < heapSize && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < heapSize && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      updates.push({
        heapState: [...arr],
        heapSize: heapSize,
        highlights: { swapping: [i, largest] },
        message: `${arr[largest]} > ${arr[i]}, swapping indices ${i} and ${largest}`
      });

      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      updates.push({
        heapState: [...arr],
        heapSize: heapSize,
        highlights: { heapified: [i] },
        message: `Swapped! Continue heapifying down from index ${largest}`
      });

      await heapifyDown(arr, heapSize, largest, updates);
    } else {
      updates.push({
        heapState: [...arr],
        heapSize: heapSize,
        highlights: { heapified: [i] },
        message: `Node at index ${i} satisfies max heap property`
      });
    }
  };

  const buildMaxHeap = async (arr, updates) => {
    const n = arr.length

    updates.push({
      heapState: [...arr],
      heapSize: n,
      highlights: {},
      message: `Phase 1: Building max heap from unsorted array`
    });

    const startIndex = Math.floor(n / 2) - 1

    for (let i = startIndex; i >= 0; i--) {
      updates.push({
        heapState: [...arr],
        heapSize: n,
        highlights: { swapping: [i] },
        message: `Building heap: processing node at index ${i}`
      });

      await heapifyDown(arr, n, i, updates)
    }

    updates.push({
      heapState: [...arr],
      heapSize: n,
      highlights: { sorted: Array.from({ length: n }, (_, i) => i) },
      message: `Max heap built successfully! Largest element ${arr[0]} is at root.`
    });
  }

  const heapSortAlgo = async (arr, heapSize, updates) => {
    const n = arr.length;

    updates.push({
      heapState: [...arr],
      heapSize: n,
      highlights: {},
      message: `Starting Heap Sort on array of ${n} elements`
    });

    await buildMaxHeap(arr, updates)

    updates.push({
      heapState: [...arr],
      heapSize: n,
      highlights: {},
      message: `Phase 2: Repeatedly extract maximum and place at end`
    });

    for (let i = n - 1; i > 0; i--) {
      updates.push({
        heapState: [...arr],
        heapSize: i + 1,
        highlights: {
          swapping: [0, i],
          sorted: Array.from({ length: n - i - 1 }, (_, idx) => i + 1 + idx)
        },
        message: `Extracting maximum ${arr[0]} and placing it at position ${i}`
      });

      [arr[0], arr[i]] = [arr[i], arr[0]];

      updates.push({
        heapState: [...arr],
        heapSize: i,
        highlights: {
          sorted: Array.from({ length: n - i }, (_, idx) => i + idx),
          current: 0
        },
        message: `Placed ${arr[i]} in sorted position. Heap size now ${i}. Heapifying root.`
      });

      await heapifyDown(arr, i, 0, updates);

      updates.push({
        heapState: [...arr],
        heapSize: i,
        highlights: {
          sorted: Array.from({ length: n - i }, (_, idx) => i + idx)
        },
        message: `Heap property restored. ${n - i} elements sorted so far.`
      });
    }

    updates.push({
      heapState: [...arr],
      heapSize: 0,
      highlights: { sorted: Array.from({ length: n }, (_, i) => i) },
      message: `Heap Sort complete! All ${n} elements are now sorted in ascending order.`
    });
  }

  const handleHeapSort = async () => {
    let newArray = [];

    if (arrayMethod === "custom") {
      const values = customValues.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
      if (customInput.length === 0) {
        toast.error("Enter a valid array")
        return
      }
      newArray = values;
      setHeapSize([...newArray])
      setHeapSize(newArray.length)
    } else if (arrayMethod === "random") {
      newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 50) + 1);
      setHeap([...newArray]);
      setHeapSize(newArray.length);
    } else {
      // Use current heap
      newArray = [...heap];
    }

    await animateHeap(heapSortAlgo, "Heap Sort");
  }

  return (
     <div className='flex flex-col items-center pt-40'>
      <div className='mb-8'>
          {renderHeap()}
      </div>

      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={handleHeapSort}
        className='mt-4 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
      >
        Sort Heap
      </button>
    </div>
  )
}

export default HeapSort
