import React, { useContext, useState } from 'react'
import { AlgoContext } from '../context/AlgoContext'
import { toast } from 'react-toastify';

const InsertLL = ({ inputs }) => {

  const { linkedList, setLinkedList, renderLinkedList, animateLinkedList, step } = useContext(AlgoContext);
  const value = parseInt(inputs[0]);
  const position = parseInt(inputs[1]);

  const insertLinkedList = async (list, updates) => {
    if (position < 0 || position > list.length) {
      toast.error("Enter a valid index")
      return;
    }

    // case 1: inserting at tail (default)
    if (isNaN(position) || position === list.length) {
      const newNode = {
        id: `node-${Date.now()}`,
        value: value,
        next: null,
        isNew: true
      }

      const newList = [...list]
      if (newList.length > 0) {
        newList[newList.length - 1].next = newList.length; // point to new node
      }
      newList.push(newNode);

      updates.push({
        listState: newList,
        highlights: {
          newNode: [newList.length - 1],
          newArrow: newList.length - 2 >= 0 ? newList.length - 2 : null
        },
        message: `Inserted ${value} at tail`
      })

      // Clear highlights
      updates.push({
        listState: newList.map(node => ({ ...node, isNew: false })),
        highlights: {},
        message: `Insertion complete`
      });

      // case 2: inserting at head
    } else if (position === 0) {
      const newNode = {
        id: `node-${Date.now()}`,
        value: value,
        next: 0, // point to curr head
        isNew: true
      }

      const updatedList = list.map(node => ({
        ...node,
        next: node.next !== null ? node.next + 1 : null
      }))

      const newList = [newNode, ...updatedList];

      updates.push({
        listState: newList,
        highlights: {
          newNode: [0],
          newArrow: 0
        },
        message: `Inserted ${value} at head`
      })

      // Clear highlights
      updates.push({
        listState: newList.map(node => ({ ...node, isNew: false })),
        highlights: {},
        message: `Insertion complete`
      });

      // case 3: inserting in the middle
    } else {
      // step 1: show old pointer will be updated
      updates.push({
        listState: list,
        highlights: {
          updatingPointer: [position - 1],
          oldArrow: position - 1
        },
        message: `Updating pointer from node at index ${position - 1}`
      })

      const newNode = {
        id: `node-${Date.now()}`,
        value: value,
        next: position, // point to what will be next node
        isNew: true
      }

      const beforeNewNode = list.slice(0, position);
      const afterNewNode = list.slice(position).map(node => ({
        ...node,
        next: node.next !== null ? node.next + 1 : null // shift indices
      }))

      if (beforeNewNode.length > 0) {
        beforeNewNode[beforeNewNode.length - 1].next = position; // update pointer
      }

      const newList = [...beforeNewNode, newNode, ...afterNewNode];

      // step 2: show new node being inserted
      updates.push({
        listState: newList,
        highlights: {
          newNode: [position],
          updatingPointer: [position - 1],
        },
        message: `Inserted ${value} at position ${position}`
      })

      // step 3: animate new arrows
      updates.push({
        listState: newList,
        highlights: {
          newNode: [position],
          newArrow: position - 1,
          newArrow2: position
        },
        message: `Reconnecting pointers`
      })

      // Clear highlights
      updates.push({
        listState: newList.map(node => ({ ...node, isNew: false })),
        highlights: {},
        message: `Insertion complete`
      });
    }
  }

  return (
    <div className='flex flex-col items-center'>

      {renderLinkedList()}
      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={() => (animateLinkedList(insertLinkedList), "Insert Linked List")}
        className='mt-40 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
      >
        Insert Element
      </button>
    </div>
  )
}

export default InsertLL
