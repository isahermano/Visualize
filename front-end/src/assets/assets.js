import arraysTN from './arraysTN.png'
import sortingTN from './sortingTN.png'
import linkedlistsTN from './linkedlistsTN.png'
import binaryheapTN from './binaryHeapTN.png'
import bstsTN from './bstsTN.png'
import stackTN from './stackTN.png'
import queueTN from './queueTN.png'

import logo from './logo.png'
import profile_icon from './profile_icon.png'
import search_icon from './search_icon.png'
// import menu_icon from './menu_icon.png'
// import about_img from './about_img.png'
// import contact_img from './contact_img.png'

// importing algorithm logic
import BubbleSort from '../visuals/BubbleSort'
import InsertionSort from '../visuals/InsertionSort'
import SelectionSort from '../visuals/SelectionSort'
import MergeSort from '../visuals/MergeSort'
import QuickSort from '../visuals/QuickSort'
import CountingSort from '../visuals/CountingSort'
import RadixSort from '../visuals/RadixSort'

// importing array logic
import ArrayInsert from '../visuals/ArrayInsert'
import ArrayDelete from '../visuals/ArrayDelete'
import CreateArray from '../visuals/CreateArray'
import QuickSelect from '../visuals/QuickSelect'

// importing linked list logic
import CreateLL from '../visuals/CreateLL'
import InsertLL from '../visuals/InsertLL'
import RemoveLL from '../visuals/RemoveLL'
import SearchLL from '../visuals/SearchLL'

// importing stack logic
import Push from '../visuals/Push'
import Pop from '../visuals/Pop'
import CreateStack from '../visuals/CreateStack'
import PeekStack from '../visuals/PeekStack'

// importing stack logic
import Enqueue from '../visuals/Enqueue'
import Dequeue from '../visuals/Dequeue'
import CreateQueue from '../visuals/CreateQueue'
import PeekQueue from '../visuals/PeekQueue'

// importing Binary Heap logic
import CreateBH from '../visuals/CreateBH'
import InsertBH from '../visuals/InsertBH'
import ExtractMax from '../visuals/ExtractMax'
import HeapSort from '../visuals/HeapSort'
import UpdateKey from '../visuals/UpdateKey'
import DeleteBH from '../visuals/DeleteBH'

export const assets = {
    logo,
    search_icon,
    profile_icon
}

export const collections = [
    {
        id: "arrays",
        name: "Arrays",
        thumbnail: [arraysTN]
    },
    {
        id: "sorting",
        name: "Sorting",
        thumbnail: [sortingTN]
    },
    {
        id: "linkedlists",
        name: "Linked Lists",
        thumbnail: [linkedlistsTN]
    },
    {
        id: "stack",
        name: "Stack",
        thumbnail: [stackTN]
    },
    {
        id: "queue",
        name: "Queue",
        thumbnail: [queueTN]
    },
    {
        id: "binaryheaps",
        name: "Binary Heaps",
        thumbnail: [binaryheapTN]
    }
]


export const algorithms = [
    {
        id: "insertion",
        name: "Insertion Sort",
        worstCase: "O(n²)",
        bestCase: "O(n)",
        worstSpace: "O(1)",
        desc: "Builds the final sorted array one item at a time by inserting each element into its proper position.",
        type: 'algorithm',
        dataStructure: 'sorting',
        hasComplexity: true,
        route: 'sorting',
        fileName: InsertionSort,
    },
    {
        id: "bubble",
        name: "Bubble Sort",
        worstCase: "O(n²)",
        bestCase: "O(n)",
        worstSpace: "O(1)",
        desc: "Compares adjacent elements, swapping them if they're in the wrong order.",
        type: 'algorithm',
        dataStructure: 'sorting',
        hasComplexity: true,
        route: 'sorting',
        fileName: BubbleSort,
    },
    {
        id: "selection",
        name: "Selection Sort",
        worstCase: "O(n²)",
        bestCase: "O(n²)",
        worstSpace: "O(1)",
        desc: "Divides the unsorted array into two parts: sorted and unsorted, repeatedly selecting the smallest element from the unsorted portion.",
        type: 'algorithm',
        dataStructure: 'sorting',
        hasComplexity: true,
        route: 'sorting',
        fileName: SelectionSort,
    },
    {
        id: "merge",
        name: "Merge Sort",
        worstCase: "O(n log(n))",
        bestCase: "O(n log(n))",
        worstSpace: "O(n)",
        desc: "A divide and conquer algorithm that divides the input array around the pivot, and recursively sorts the sub-arrays.",
        type: 'algorithm',
        dataStructure: 'sorting',
        hasComplexity: true,
        route: 'sorting',
        fileName: MergeSort,
    },
    {
        id: "quick",
        name: "Quick Sort",
        worstCase: "O(n²)",
        bestCase: "O(n log(n))",
        worstSpace: "O(n)",
        desc: "Selects a pivot element and partitions the array around the pivot, and recursively sorts the sub-arrays.",
        type: 'algorithm',
        dataStructure: 'sorting',
        hasComplexity: true,
        route: 'sorting',
        fileName: QuickSort,
    },
    {
        id: "counting",
        name: "Counting Sort",
        worstCase: "O(n+k)",
        bestCase: "O(n+k)",
        worstSpace: "O(n+k)",
        desc: "Counts the number of objects having distinct key values, then calculates the position of each object in the output sequence.",
        type: 'algorithm',
        dataStructure: 'sorting',
        hasComplexity: true,
        route: 'sorting',
        fileName: CountingSort,
    },
    {
        id: "radix",
        name: "Radix Sort",
        worstCase: "O(n*d)",
        bestCase: "O(n*d)",
        worstSpace: "O(n+k)",
        desc: "Sorts numbers by processing individual digits, from least significant to most significant digit.",
        type: 'algorithm',
        dataStructure: 'sorting',
        hasComplexity: true,
        route: 'sorting',
        fileName: RadixSort,
    }
]

export const arrays = [
    {
        name: "Create",
        type: 'function',
        dataStructure: 'arrays',
        hasComplexity: false,
        worstCase: 'O(n)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: '',
        route: 'arrays',
        fileName: CreateArray,
        inputs: [
            {
                label: "Creation Method",
                type: "select",
                options: ["random", "custom"],
                defaultValue: "random"
            },
            // random array parameters
            {
                label: "Size",
                type: "number",
                min: 1,
                max: 10,
                defaultValue: 10,
                condition: { method: "random" }
            },
            {
                label: "Min Value",
                type: "number",
                defaultValue: 11,
                condition: { method: "random" }
            },
            {
                label: "Max Value",
                type: "number",
                defaultValue: 50,
                condition: { method: "random" }
            },
            // custom array input
            {
                label: "Enter Values (comma separated)",
                type: "text",
                placeholder: "e.g. 1, 2, 3, 4",
                condition: { method: "custom" }
            },
        ]
    },
    {
        name: "Insert",
        type: 'function',
        dataStructure: 'arrays',
        hasComplexity: false,
        worstCase: 'O(n)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Insert operation on array data structure',
             route: 'arrays',
        fileName: ArrayInsert,
        inputs: [
            { label: "Value to insert", type: "number" },
            { label: "Index (optional)", type: "number", optional: true },
        ]
    },
    {
        name: "Delete",
             route: 'arrays',
        fileName: ArrayDelete,
        type: 'function',
        dataStructure: 'arrays',
        hasComplexity: false,
        worstCase: 'O(n)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: '',
        inputs: [
            { label: "Index to delete", type: "number" }
        ]
    },
    {
        name: "QuickSelect",
        type: 'function',
        dataStructure: 'arrays',
        hasComplexity: false,
        worstCase: 'O(n)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Finds the k-th smallest element in an unordered list',
             route: 'arrays',
        fileName: QuickSelect,
        inputs: [
            {
                label: "k-th element",
                type: "number",
                options: ["min", "max"],
                defaultValue: "min"
            }
        ]
    }
]

export const linkedListFunctions = [
    {
        name: "Create",
        type: 'function',
        dataStructure: 'linkedlists',
        hasComplexity: false,
        worstCase: 'O(n)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Create operation on linked list data structure',
        route: 'linkedlists',
        fileName: CreateLL,
        inputs: [
            {
                label: "Creation Method",
                type: "select",
                options: ["random", "custom"],
                defaultValue: "random"
            },
            // random array parameters
            {
                label: "Size",
                type: "number",
                min: 1,
                max: 10,
                defaultValue: 10,
                condition: { method: "random" }
            },
            {
                label: "Min Value",
                type: "number",
                defaultValue: 11,
                condition: { method: "random" }
            },
            {
                label: "Max Value",
                type: "number",
                defaultValue: 50,
                condition: { method: "random" }
            },
            // custom array input
            {
                label: "Enter Values (comma separated)",
                type: "text",
                placeholder: "e.g. 1, 2, 3, 4",
                condition: { method: "custom" }
            },
        ]
    },
    {
        name: "Search",
        type: 'function',
        dataStructure: 'linkedlists',
        hasComplexity: false,
        worstCase: 'O(n)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Search operation on linked list data structure',
         route: 'linkedlists',
        fileName: SearchLL,
        inputs: [{ label: "Value to find", type: "number", placeholder: "" }]
    },
    {
        name: "Insert",
        type: 'function',
        dataStructure: 'linkedlists',
        hasComplexity: false,
        worstCase: 'O(n)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Insert operation on linked list data structure',
         route: 'linkedlists',
        fileName: InsertLL,
        inputs: [
            { label: "Value", type: "number" },
            { label: "Position (optional - default position is tail)", type: "number", optional: true }
        ],
    },
    {
        name: "Remove",
        type: 'function',
        dataStructure: 'linkedlists',
        hasComplexity: false,
        worstCase: 'O(n)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Delete operation on linked list data structure',
         route: 'linkedlists',
        fileName: RemoveLL,
        inputs: [{ label: "Value to remove", type: "number", placeholder: "" }]
    },
]

export const stackFunctions = [
    {
        name: "Create",
        type: 'function',
        dataStructure: 'stack',
        hasComplexity: false,
        worstCase: 'O(1)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Create operation on stack data structure',
         route: 'stack',
        fileName: CreateStack,
        inputs: [
            {
                label: "Creation Method",
                type: "select",
                options: ["random", "custom"],
                defaultValue: "random"
            },
            // random array parameters
            {
                label: "Size",
                type: "number",
                min: 1,
                max: 10,
                defaultValue: 10,
                condition: { method: "random" }
            },
            // custom array input
            {
                label: "Enter Values (comma separated)",
                type: "text",
                placeholder: "e.g. 1, 2, 3, 4",
                condition: { method: "custom" }
            }
        ]
    },
    {
        name: "Push",
        type: 'function',
        dataStructure: 'stack',
        hasComplexity: false,
        worstCase: 'O(1)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Push operation on stack data structure',
         route: 'stack',
        fileName: Push,
        inputs: [{ label: "Value to push", type: "number", placeholder: " " }]
    },
    {
        name: "Pop",
        type: 'function',
        dataStructure: 'stack',
        hasComplexity: false,
        worstCase: 'O(1)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Pop operation on stack data structure',
             route: 'stack',
        fileName: Pop,
        inputs: []
    },
    {
        name: "Peek",
        type: 'function',
        dataStructure: 'stack',
        hasComplexity: false,
        worstCase: 'O(1)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Peek operation on stack data structure',
             route: 'stack',
        fileName: PeekStack,
        inputs: []
    }
]

export const queueFunctions = [
    {
        name: "Create",
        type: 'function',
        dataStructure: 'stack',
        hasComplexity: false,
        worstCase: 'O(1)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Create operation on queue data structure',
        route: 'queue',
        fileName: CreateQueue,
        inputs: [
            {
                label: "Creation Method",
                type: "select",
                options: ["random", "custom"],
                defaultValue: "random"
            },
            // random array parameters
            {
                label: "Size",
                type: "number",
                min: 1,
                max: 10,
                defaultValue: 10,
                condition: { method: "random" }
            },
            // custom array input
            {
                label: "Enter Values (comma separated)",
                type: "text",
                placeholder: "e.g. 1, 2, 3, 4",
                condition: { method: "custom" }
            }
        ]
    },
    {
        name: "Enqueue",
        type: 'function',
        dataStructure: 'stack',
        hasComplexity: false,
        worstCase: 'O(1)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Enqueue operation on queue data structure',
                route: 'queue',
        fileName: Enqueue,
        inputs: [{ label: "Value to enqueue", type: "number", placeholder: " " }]
    },
    {
        name: "Dequeue",
        type: 'function',
        dataStructure: 'stack',
        hasComplexity: false,
        worstCase: 'O(1)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Dequeue operation on queue data structure',
                route: 'queue',
        fileName: Dequeue,
        inputs: []
    },
    {
        name: "Peek",
        type: 'function',
        dataStructure: 'stack',
        hasComplexity: false,
        worstCase: 'O(1)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Peek operation on queue data structure',
                route: 'queue',
        fileName: PeekQueue,
        inputs: []
    }
]

export const binaryHeapFunctions = [
    {
        name: "Create",
        type: 'function',
        dataStructure: 'binaryheap',
        hasComplexity: true,
        worstCase: 'O(n)',
        bestCase: 'O(n)',
        worstSpace: 'O(1)',
        desc: 'Build a max heap from an unsorted array using bottom-up approach (optimal)',
        route: 'binaryheap',
        fileName: CreateBH,
        inputs: [
            {
                label: "Array Method",
                type: "select",
                options: [
                    { label: "Random Array", value: "random" },
                    { label: "Custom Array", value: "custom" }
                ],
                defaultValue: "random"
            },
            {
                label: "Size",
                type: "number",
                placeholder: "e.g. 8",
                condition: { method: "random" }
            },
            {
                label: "Enter Values (comma separated)",
                type: "text",
                placeholder: "e.g. 4, 10, 3, 5, 1",
                condition: { method: "custom" }
            },
             {
                label: "Creation Method",
                type: "select",
                options: [
                    { label: "Bottom-up (O(n))", value: "bottom-up" },
                    { label: "Top-down (O(nlogn))", value: "top-down" }
                ],
                defaultValue: "bottom-up"
            },
        ]
    },
    {
        name: "Insert",
        type: 'function',
        dataStructure: 'binaryheap',
        hasComplexity: true,
        worstCase: 'O(log n)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Insert a new element into the max heap while maintaining heap property',
        route: 'binaryheap',
        fileName: InsertBH,
        inputs: [
            {
                label: "Value to Insert",
                type: "number",
                min: 1,
                max: 99,
                defaultValue: null,
                placeholder: "e.g. 1"
            }
        ]
    },
    {
        name: "Extract Max",
        type: 'function',
        dataStructure: 'binaryheap',
        hasComplexity: true,
        worstCase: 'O(log n)',
        bestCase: 'O(log n)',
        worstSpace: 'O(1)',
        desc: 'Remove and return the maximum element from the heap',
        route: 'binaryheap',
        fileName: ExtractMax,
        inputs: []
    },
    {
        name: "Heap Sort",
        type: 'function',
        dataStructure: 'binaryheap',
        hasComplexity: true,
        worstCase: 'O(n log n)',
        bestCase: 'O(n log n)',
        worstSpace: 'O(1)',
        desc: 'Sort an array using heap sort algorithm (in-place sorting)',
        route: 'binaryheap',
        fileName: HeapSort,
        inputs: [
            {
                label: "Array Method",
                type: "select",
                options: [
                    { label: "Random Array", value: "random" },
                    { label: "Custom Array", value: "custom" }
                ],
                defaultValue: "random"
            },
            {
                label: "Size",
                type: "number",
                min: 3,
                max: 10,
                defaultValue: 8,
                condition: { method: "random" }
            },
            {
                label: "Enter Values (comma separated)",
                type: "text",
                placeholder: "e.g. 4, 10, 3, 5, 1",
                condition: { method: "custom" }
            }
        ]
    },
    {
        name: "Update Key",
        type: 'function',
        dataStructure: 'binaryheap',
        hasComplexity: true,
        worstCase: 'O(log n)',
        bestCase: 'O(1)',
        worstSpace: 'O(1)',
        desc: 'Update the value of an element at a given index and restore heap property',
        route: 'binaryheap',
        fileName: UpdateKey,
        inputs: [
            {
                label: "Index to Update",
                type: "number",
                min: 0,
                max: 9,
                defaultValue: null,
                placeholder: "Leave empty for random"
            },
            {
                label: "New Value",
                type: "number",
                min: 1,
                max: 99,
                defaultValue: null,
                placeholder: "Leave empty for random"
            }
        ]
    },
    {
        name: "Delete",
        type: 'function',
        dataStructure: 'binaryheap',
        hasComplexity: true,
        worstCase: 'O(log n)',
        bestCase: 'O(log n)',
        worstSpace: 'O(1)',
        desc: 'Delete an element at a specific index and restore heap property',
        route: 'binaryheap',
        fileName: DeleteBH,
        inputs: [
            {
                label: "Index to Delete",
                type: "number",
                min: 0,
                max: 9,
                defaultValue: null,
                placeholder: "Leave empty for random"
            }
        ]
    }
]