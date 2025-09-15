import React, { useContext } from 'react'
import { AlgoContext } from '../context/AlgoContext'

const RemoveLL = ({ inputs }) => {

  const { linkedList, animateLinkedList, renderLinkedList, step } = useContext(AlgoContext);
  const value = parseInt(inputs[0]);

  const removeNodeAlgo = async (list, updates) => {
    let curr = 0;
    let prev = null;
    let found = false;

    while (curr !== null) {
      // step 1: search list
      updates.push({
        listState: [...list],
        highlights: { comparing: [curr] },
        message: `Comparing element ${list[curr].value} with ${value}`
      })

      if (list[curr].value === value) {
        found = true;
        // step 2: delete node
        updates.push({
          listState: [...list],
          highlights: { extracting: [curr] },
          message: `Found node to delete with value ${value}`
        })

        prev = curr;
        curr = list[curr].next;
        break;
      }
      curr = list[curr].next;
    }

    if (!found) {
      updates.push({
        listState: [...list],
        highlights: {},
        message: `Value ${value} not found in linked list`
      });
      return;
    }

    // create new list without deleted node
    const newList = list.filter((_, index) => index !== curr);

    // update pointers
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].next !== null) {
        // Adjust next pointer if it points to a node beyond the deleted one
        if (newList[i].next > curr) {
          newList[i].next = newList[i].next - 1;
        }
        // If next pointer was exactly the deleted node, point to the next one
        else if (newList[i].next === curr) {
          newList[i].next = list[curr].next !== null ? list[curr].next - 1 : null;
        }
      }
    }

    // Special case: if we deleted the head, update the head reference
    if (prev === null) {
      updates.push({
        listState: [...newList],
        highlights: { newArrow: [0] },
        message: `Deleted head node. New head is node with value ${newList[0]?.value || 'none'}`
      });
    } else {
      updates.push({
        listState: [...newList],
        highlights: { newArrow: [prev] },
        message: `Updated pointer from previous node to next node`
      });
    }

    // Final state
    updates.push({
      listState: [...newList],
      highlights: {},
      message: `Removal complete. Linked list updated.`
    });

    return newList;

  }


  return (
    <div className='flex flex-col items-center'>
      {renderLinkedList()}

      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={() => animateLinkedList(removeNodeAlgo, "Search Linked List")}
        className='mt-40 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
      >
        Remove Element
      </button>
    </div>
  )
}

export default RemoveLL
