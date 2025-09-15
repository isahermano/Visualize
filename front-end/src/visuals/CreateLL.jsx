import React, { useContext, useState } from 'react'
import { AlgoContext } from '../context/AlgoContext'
import { toast } from 'react-toastify';

const CreateLL = ({ inputs }) => {

  const { setLinkedList, renderLinkedList, createLinkedListFromArray } = useContext(AlgoContext);
  const method = inputs[0];
  const size = parseInt(inputs[1]) || 5;
  const min = parseInt(inputs[2]) || 1;
  const max = parseInt(inputs[3]) || 50;
  const [showLL, setShowLL] = useState(false);

  const createLinkedList = () => {
    try {
      let newLinkedList;
    
      if (method === "custom") {
        // Process custom array input
        const customList = inputs[4]
          ?.split(',')
          .map(val => parseInt(val.trim()))
          .filter(val => !isNaN(val)) || [] // [] so that array is empty
        
          newLinkedList = createLinkedListFromArray(customList.length > 0 ? customList : [1, 2, 3, 4, 5])
      } else {
        const randomList = Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1) + min));
        newLinkedList = createLinkedListFromArray(randomList);
      }
      setLinkedList(newLinkedList);
      setShowLL(true);
    } catch (error) {
      console.log(error);
      toast.error("Error creating linked list.")
      setShowLL(false)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      {showLL && (
        <div className='mb-8'>
          {renderLinkedList()}
        </div>
      )}

      <button onClick={createLinkedList}
        className='mt-40 px-4 py-2 bg-pink-400 text-white rounded cursor-pointer'
      >
        Generate Linked List
      </button>
    </div>


  )
}

export default CreateLL
