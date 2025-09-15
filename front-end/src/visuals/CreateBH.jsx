import React, { useContext, useState } from 'react'
import { AlgoContext } from '../context/AlgoContext'

const CreateBH = ({ inputs }) => {
  const { heap, renderHeap, setHeap, setHeapSize, animateHeap, step } = useContext(AlgoContext);
  const [showHeap, setShowHeap] = useState(false);
  const arrayMethod = inputs[0] || "random";
  const size = inputs[1] || 6;
  const customInput = inputs[2] || "1, 41, 8, 29, 12, 7";
  const creationMethod = inputs[3] || "bottom-up";

  // Helper: swap
  const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  // Heapify for bottom-up
  const heapify = (arr, n, i, updates) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    updates.push({
      heapState: [...arr],
      heapSize: n,
      message: `Heapifying node at index ${i}`,
      highlights: { comparing: [i] }
    });

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
      updates.push({
        heapState: [...arr],
        heapSize: n,
        message: `Left child ${arr[left]} is larger than ${arr[i]}`,
        highlights: { comparing: [i, left] }
      })
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
      updates.push({
        heapState: [...arr],
        heapSize: n,
        message: `Right child ${arr[right]} is larger than ${arr[i]}`,
        highlights: { comparing: [i, right] }
      })
    }

    if (largest !== i) {
      swap(arr, i, largest)
      updates.push({
        heapState: [...arr],
        heapSize: n,
        message: `Swapped ${arr[largest]} and ${arr[i]}`,
        highlights: { swapping: [i, largest] }
      });
      heapify(arr, n, largest, updates);
      // Add update after recursive call completes
      updates.push({
        heapState: [...arr],
        heapSize: n,
        message: `Completed heapifying subtree at index ${largest}`,
        highlights: { comparing: [largest] }
      });
    } else {
      updates.push({
        heapState: [...arr],
        heapSize: n,
        message: `Node at index ${i} is already in correct position`,
        highlights: { comparing: [i] }
      });
    }
  };

  // Build heap bottom-up
  const buildHeapBottomUp = (arr, updates) => {
    const n = arr.length;
    updates.push({
      heapState: [...arr],
      heapSize: n,
      message: "Starting bottom-up heap construction",
      highlights: {}
    });

    // start from last non-leaf node and heapify each node
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      updates.push({
        heapState: [...arr],
        heapSize: n,
        message: `Heapifying subtree rooted at index ${i}`,
        highlights: { comparing: [i] }
      });
      heapify(arr, n, i, updates);
    }

    updates.push({
      heapState: [...arr],
      heapSize: n,
      message: "Heap construction complete!",
      highlights: { sorted: Array.from({ length: n }, (_, i) => i) }
    });
  };

  // Build heap top-down (insert elements one by one)
  const buildHeapTopDown = (arr, updates) => {
    const heap = [];

    const siftUp = (i, updates) => {
      while (i > 0) {
        const parent = Math.floor((i - 1) / 2);
        if (heap[parent] < heap[i]) {
          swap(heap, parent, i);
          updates.push({
            heapState: [...heap],
            heapSize: heap.length,
            message: `Sifted up: swapped ${heap[i]} with parent ${heap[parent]}`,
            highlights: { swapping: [parent, i] }
          });
          i = parent;
        } else {
          updates.push({
            heapState: [...heap],
            heapSize: heap.length,
            message: `Element ${heap[i]} is in correct position`,
            highlights: { sorted: [i] }
          });
          break;
        }
      }
    };

    updates.push({
      heapState: [...heap],
      heapSize: 0,
      message: "Starting top-down heap construction",
      highlights: {}
    });

    arr.forEach((val, idx) => {
      heap.push(val);
      updates.push({
        heapState: [...heap],
        heapSize: heap.length,
        message: `Inserted ${val} at position ${heap.length - 1}`,
        highlights: { inserted: [heap.length - 1] }
      });

      if (heap.length > 1) {
        updates.push({
          heapState: [...heap],
          heapSize: heap.length,
          message: `Sifting up element at position ${heap.length - 1}`,
          highlights: { comparing: [heap.length - 1] }
        });
        siftUp(heap.length - 1, updates);
      }
    });

    updates.push({
      heapState: [...heap],
      heapSize: heap.length,
      message: "Top-down heap construction complete!",
      highlights: { sorted: Array.from({ length: heap.length }, (_, i) => i) }
    });

    return heap;
  };

 const handleCreateHeap = async () => {
    try {
      setShowHeap(true);
      
      // Create the algorithm function that matches AlgoContext expectations
      const heapCreationAlgorithm = async (heapArray, currentHeapSize, updates) => {
        let arr = [];

        if (arrayMethod === "custom") {
          arr = customInput
            ?.split(',')
            .map(val => parseInt(val.trim()))
            .filter(val => !isNaN(val)) || [];

          if (arr.length === 0) {
            arr = [1, 41, 8, 29, 12, 7];
          }
        } else {
          const min = 1;
          const max = 100;
          arr = Array.from({ length: parseInt(size) || 6 }, () => 
            Math.floor(Math.random() * (max - min + 1) + min)
          );
        }

        // Set the initial heap state
        setHeap(arr);
        setHeapSize(arr.length);

        if (creationMethod === "bottom-up") {
          buildHeapBottomUp([...arr], updates);
        } else {
          buildHeapTopDown([...arr], updates);
        }
      };

      // Use the animateHeap function from context
      await animateHeap(heapCreationAlgorithm, "Create Binary Heap");
      
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='flex flex-col items-center pt-40'>
      <div className='mb-8'>
        {showHeap && (
          renderHeap())}
      </div>

      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={handleCreateHeap}
        className='mt-4 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
      >
        Create Binary Heap
      </button>
    </div>
  )
}

export default CreateBH;
