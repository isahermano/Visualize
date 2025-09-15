import React, { useContext, useState } from 'react'
import { AlgoContext } from '../context/AlgoContext'

// Helper functions
const parent = (i) => Math.floor((i - 1) / 2);
const leftChild = (i) => 2 * i + 1;
const rightChild = (i) => 2 * i + 2;

const heapifyUp = async (arr, i, updates, heapSize) => {
  let current = i;
  
  while (current > 0) {
    const parentIdx = parent(current);
    
    updates.push({
      heapState: [...arr],
      heapSize: heapSize,
      highlights: { current: current, parent: parentIdx, comparing: [current, parentIdx] },
      message: `Bubbling up: comparing ${arr[current]} at index ${current} with parent ${arr[parentIdx]} at index ${parentIdx}`
    });

    if (arr[current] <= arr[parentIdx]) {
      updates.push({
        heapState: [...arr],
        heapSize: heapSize,
        highlights: { heapified: [current] },
        message: `${arr[current]} ≤ ${arr[parentIdx]}, max heap property satisfied`
      });
      break;
    }

    updates.push({
      heapState: [...arr],
      heapSize: heapSize,
      highlights: { swapping: [current, parentIdx] },
      message: `${arr[current]} > ${arr[parentIdx]}, swapping!`
    });

    [arr[current], arr[parentIdx]] = [arr[parentIdx], arr[current]];
    
    updates.push({
      heapState: [...arr],
      heapSize: heapSize,
      highlights: { heapified: [parentIdx] },
      message: `Swapped! Continue bubbling up from index ${parentIdx}`
    });

    current = parentIdx;
  }

  if (current === 0) {
    updates.push({
      heapState: [...arr],
      heapSize: heapSize,
      highlights: { heapified: [0] },
      message: `Element reached root position, max heap property satisfied`
    });
  }
};

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
    message: `Sinking down: checking children of node at index ${i}`
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
      message: `Swapped! Continue sinking down from index ${largest}`
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

const updateKeyAlgorithm = async (arr, heapSize, updates, index, newValue) => {
  const oldValue = arr[index];

  updates.push({
    heapState: [...arr],
    heapSize: heapSize,
    highlights: { current: index },
    message: `Updating key at index ${index} from ${oldValue} to ${newValue}`
  });

  arr[index] = newValue;

  updates.push({
    heapState: [...arr],
    heapSize: heapSize,
    highlights: { current: index },
    message: `Updated! Now need to restore heap property.`
  });

  if (newValue > oldValue) {
    updates.push({
      heapState: [...arr],
      heapSize: heapSize,
      highlights: { current: index },
      message: `New value ${newValue} > old value ${oldValue}. Might need to bubble up.`
    });
    
    await heapifyUp(arr, index, updates, heapSize);
  } else if (newValue < oldValue) {
    updates.push({
      heapState: [...arr],
      heapSize: heapSize,
      highlights: { current: index },
      message: `New value ${newValue} < old value ${oldValue}. Might need to sink down.`
    });
    
    await heapifyDown(arr, heapSize, index, updates);
  } else {
    updates.push({
      heapState: [...arr],
      heapSize: heapSize,
      highlights: { heapified: [index] },
      message: `New value equals old value. No heap property violation.`
    });
  }

  updates.push({
    heapState: [...arr],
    heapSize: heapSize,
    highlights: { heapified: Array.from({ length: heapSize }, (_, i) => i) },
    message: `Update key operation complete! Max heap property restored.`
  });
};

const UpdateKey = ({inputs}) => {
  const { animateHeap, renderHeap, heap, heapSize, step } = useContext(AlgoContext);
  const updateIndex = inputs[0] || 0;
  const newValue = inputs[1] || 10;

  const handleUpdateKey = async () => {
    let index, value;
    
    // Validate and set index
    if (updateIndex === '' || isNaN(updateIndex)) {
      index = Math.floor(Math.random() * heapSize);
    } else {
      index = parseInt(updateIndex);
      if (index < 0 || index >= heapSize) {
        alert(`Invalid index! Please enter a value between 0 and ${heapSize - 1}`);
        return;
      }
    }
    
    // Validate and set value
    if (newValue === '' || isNaN(newValue)) {
      value = Math.floor(Math.random() * 50) + 1;
    } else {
      value = parseInt(newValue);
      if (value < 1 || value > 99) {
        alert('Please enter a value between 1 and 99');
        return;
      }
    }

    await animateHeap((arr, size, updates) => updateKeyAlgorithm(arr, size, updates, index, value), "Update Key");
  };

  return (
    <div className='flex flex-col items-center pt-40'>
      <div className='mb-8'>
          {renderHeap()}
      </div>

      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={handleUpdateKey}
        className='mt-4 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
      >
        Update Key
      </button>
    </div>
  )
}

export default UpdateKey