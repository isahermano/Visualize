import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlgoContext } from '../context/AlgoContext'
import { toast } from 'react-toastify'

const ArrayInsert = ({ inputs }) => {

  const { array, step, renderArray, animateSort, isPlaying } = useContext(AlgoContext);
  const value = parseInt(inputs[0]);
  const insertIndex = parseInt(inputs[1]) || array.length; // default: insert at end of array

  const insertAlgorithm = async (arr, updates) => {
    if(insertIndex < 0) {
      toast.error("Enter a valid index");
      return;
    }
    
    let newArray = [...arr]

    // if inserting beyond current length, pad with nulls
    if (insertIndex >= newArray.length) {
      const padding = Array(insertIndex - newArray.length).fill(null);
      newArray = [...newArray, ...padding]

      // Show padding being added
      updates.push({
        arrayState: [...newArray],
        highlights: { shifting: Array.from({ length: padding.length }, (_, i) => arr.length + i) },
        message: `Adding padding to reach index ${insertIndex}`
      });
    }

    // if inserting within array bounds, shift elements right
    else if (insertIndex < newArray.length) {
      // add null at end to make space for shifting
      newArray.push(null);

      // shift elements to make space
      for (let i = newArray.length - 1; i > insertIndex; i--) {
        newArray[i] = newArray[i - 1];
        newArray[i - 1] = null;

        updates.push({
          arrayState: [...newArray],
          highlights: { shifting: [i] },
          message: `Shifting elements to make space`
        })
      }
    }

    // insert new value
    newArray[insertIndex] = value;

    updates.push({
      arrayState: [...newArray],
      highlights: { inserted: [insertIndex] },
      message: `Inserted value ${value} at index ${insertIndex}`
    })

    // final state
    updates.push({
      arrayState: [...newArray],
      highlights: { sorted: [insertIndex] },
      message: `Insertion complete`
    })
  }

  return (
    <div className='flex flex-col items-center pt-40'>
      {renderArray()}
      <p className="mt-4 text-center text-lg text-gray-700">{step}</p>
      <button onClick={() => animateSort(insertAlgorithm, "Insertion Sort")}
        className='mt-4 px-4 py-2 bg-pink-400 text-white rounded'
      >
        Insert value
      </button>
    </div>
  )
}

export default ArrayInsert
