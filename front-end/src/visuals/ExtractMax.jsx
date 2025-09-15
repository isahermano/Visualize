import React, { useContext, useState } from 'react'
import { AlgoContext } from '../context/AlgoContext'

const ExtractMax = () => {
  const { animateHeap, renderHeap, heap, heapSize, step } = useContext(AlgoContext);
  
  const [extractedValue, setExtractedValue] = useState(null);
  const [showHeap, setShowHeap] = useState(false);

  const leftChild = (i) => 2 * i + 1;
  const rightChild = (i) => 2 * i + 2;

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

  const extractMaxAlgorithm = async (arr, heapSize, updates) => {
    updates.push({
      heapState: [...arr],
      heapSize: heapSize,
      highlights: {},
      message: `Starting extract max operation from heap`
    });

    if (heapSize <= 0) {
      updates.push({
        heapState: [...arr],
        heapSize: heapSize,
        highlights: {},
        message: `Heap is empty! Cannot extract maximum.`
      });
      return;
    }

    const maxValue = arr[0];

    updates.push({
      heapState: [...arr],
      heapSize: heapSize,
      highlights: { extracted: [0] },
      message: `Maximum value is ${maxValue} at root (index 0)`
    });

    if (heapSize === 1) {
      updates.push({
        heapState: [...arr],
        heapSize: heapSize - 1,
        highlights: { inactive: [0] },
        message: `Only one element in heap. Extracted ${maxValue}. Heap is now empty.`
      });
      return;
    }

    updates.push({
      heapState: [...arr],
      heapSize: heapSize,
      highlights: { swapping: [0, heapSize - 1] },
      message: `Moving last element ${arr[heapSize - 1]} to root position`
    });

    arr[0] = arr[heapSize - 1];
    const newHeapSize = heapSize - 1;

    updates.push({
      heapState: [...arr],
      heapSize: newHeapSize,
      highlights: { current: 0, inactive: [heapSize - 1] },
      message: `Moved ${arr[0]} to root. Heap size reduced to ${newHeapSize}. Now heapifying down.`
    });

    await heapifyDown(arr, newHeapSize, 0, updates);

    updates.push({
      heapState: [...arr],
      heapSize: newHeapSize,
      highlights: {
        heapified: Array.from({ length: newHeapSize }, (_, i) => i),
        inactive: [heapSize - 1]
      },
      message: `Extract max operation complete! Extracted ${maxValue}. Max heap property restored.`
    });
  }

  const handleExtractMax = async () => {
    if (heapSize <= 0) {
      alert('Heap is empty! Cannot extract maximum.');
      return;
    }

    const maxVal = heap[0];
    setExtractedValue(maxVal);

    await animateHeap(extractMaxAlgorithm, "Extract Maximum");
  };


  return (
    <div className='flex flex-col items-center pt-40'>
      <div className='mb-8'>
          {renderHeap()}
      </div>

      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={handleExtractMax}
        className='mt-4 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
      >
        Extract Max
      </button>
    </div>
  )
}

export default ExtractMax
