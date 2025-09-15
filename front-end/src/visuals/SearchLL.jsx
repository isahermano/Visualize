import React, { useContext } from 'react'
import { AlgoContext } from '../context/AlgoContext'

const SearchLL = ({ inputs }) => {

  const { linkedList, animateLinkedList, renderLinkedList, step } = useContext(AlgoContext);
  const value = parseInt(inputs[0]);

  const searchLinkedList = async (list, updates) => {
    let elementFound = false;
    let curr = 0;

    while (curr !== null) {
      updates.push({
        listState: [...list],
        highlights: { comparing: [curr] },
        message: `Comparing element ${list[curr].value} with ${value}`
      })

      if (list[curr].value === value) {
        updates.push({
          listState: [...list],
          highlights: { sorted: [curr] },
          message: `${value} found at index ${curr}`
        })
        elementFound = true;
        return;
      }

      curr = list[curr].next;
    }

    if (!elementFound) {
      updates.push({
        listState: [...list],
        highlights: { comparing: [curr] },
        message: `Element not in linked list`
      })
    }
  }

  return (
    <div className='flex flex-col items-center'>
      {renderLinkedList()}

      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={() => animateLinkedList(searchLinkedList, "Search Linked List")}
        className='mt-40 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
      >
        Search Linked List
      </button>
    </div>
  )
}

export default SearchLL
