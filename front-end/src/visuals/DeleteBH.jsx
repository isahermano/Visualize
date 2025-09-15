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

const deleteAlgorithm = async (arr, heapSize, updates, index) => {
  updates.push({
    heapState: [...arr],
    heapSize: heapSize,
    highlights: {},
    message: `Starting delete operation for element at index ${index}`
  });

  if (heapSize <= 0) {
    updates.push({
      heapState: [...arr],
      heapSize: heapSize,
      highlights: {},
      message: `Heap is empty! Cannot delete element.`
    });
    return;
  }

  const valueToDelete = arr[index];

  updates.push({
    heapState: [...arr],
    heapSize: heapSize,
    highlights: { extracted: [index] },
    message: `Deleting element ${valueToDelete} at index ${index}`
  });

  // If this is the last element, just remove it
  if (index === heapSize - 1) {
    updates.push({
      heapState: [...arr],
      heapSize: heapSize - 1,
      highlights: { inactive: [index] },
      message: `Element was at last position. Simply removed. Heap size reduced to ${heapSize - 1}.`
    });
    return;
  }

  const lastValue = arr[heapSize - 1];

  updates.push({
    heapState: [...arr],
    heapSize: heapSize,
    highlights: { swapping: [index, heapSize - 1] },
    message: `Replacing deleted element with last element ${lastValue}`
  });

  arr[index] = lastValue;
  const newHeapSize = heapSize - 1;

  updates.push({
    heapState: [...arr],
    heapSize: newHeapSize,
    highlights: { current: index, inactive: [heapSize - 1] },
    message: `Replaced! Heap size reduced to ${newHeapSize}. Now restoring heap property.`
  });

  // Check if we need to bubble up (if replacement is larger than parent)
  if (index > 0 && arr[index] > arr[parent(index)]) {
    updates.push({
      heapState: [...arr],
      heapSize: newHeapSize,
      highlights: { current: index, parent: parent(index) },
      message: `${arr[index]} > parent ${arr[parent(index)]}, need to bubble up`
    });
    
    await heapifyUp(arr, index, updates, newHeapSize);
  } 
  // Check if we need to sink down
  else {
    const left = leftChild(index);
    const right = rightChild(index);
    let needsHeapifyDown = false;
    
    if (left < newHeapSize && arr[index] < arr[left]) {
      needsHeapifyDown = true;
    }
    if (right < newHeapSize && arr[index] < arr[right]) {
      needsHeapifyDown = true;
    }
    
    if (needsHeapifyDown) {
      updates.push({
        heapState: [...arr],
        heapSize: newHeapSize,
        highlights: { current: index },
        message: `${arr[index]} is smaller than one of its children, need to sink down`
      });
      
      await heapifyDown(arr, newHeapSize, index, updates);
    } else {
      updates.push({
        heapState: [...arr],
        heapSize: newHeapSize,
        highlights: { heapified: [index] },
        message: `Replacement element is in correct position, heap property satisfied`
      });
    }
  }

  updates.push({
    heapState: [...arr],
    heapSize: newHeapSize,
    highlights: { 
      heapified: Array.from({ length: newHeapSize }, (_, i) => i),
      inactive: [heapSize - 1]
    },
    message: `Delete operation complete! Element ${valueToDelete} removed. Max heap property restored.`
  });
};

const DeleteBH = ({inputs}) => {
  const { animateHeap, renderHeap, heap, heapSize, step } = useContext(AlgoContext);
  const deleteIndex = inputs[0] || 0;
  const [deletedValue, setDeletedValue] = useState(null);

  const handleDelete = async () => {
    let index;
    
    if (heapSize <= 0) {
      alert('Heap is empty! Cannot delete element.');
      return;
    }
    
    // Validate and set index
    if (deleteIndex === '' || isNaN(deleteIndex)) {
      index = Math.floor(Math.random() * heapSize);
    } else {
      index = parseInt(deleteIndex);
      if (index < 0 || index >= heapSize) {
        alert(`Invalid index! Please enter a value between 0 and ${heapSize - 1}`);
        return;
      }
    }

    const valueToDelete = heap[index];
    setDeletedValue(valueToDelete);
    
    await animateHeap((arr, size, updates) => deleteAlgorithm(arr, size, updates, index), "Delete Element");
  };

  return (
    <div className='flex flex-col items-center pt-40'>
      <div className='mb-8'>
        {renderHeap()}
      </div>

      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={handleDelete}
        className='mt-4 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
      >
        Delete value
      </button>
    </div>
  )
}

export default DeleteBH