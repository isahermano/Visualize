import React, { useState } from 'react'
import { algorithms } from '../assets/assets'
import ControlPanel from '../components/ControlPanel';

const Sorting = () => {
   const [selectedAlgo, setSelectedAlgo] = useState(null);

   const renderAlgorithmVisualization = () => {
      if(!selectedAlgo) {
        return <div className='p-4 text-center text-gray-500'>Select an algorithm to visualize:</div>
      }
      const AlgorithmComponent = selectedAlgo.fileName;
      return <AlgorithmComponent />
   }

  return (
    <div className='grid gap-4'>
      <div className='min-h-[400px] border rounded-lg p-4 bg-white shadow'>
        {renderAlgorithmVisualization()}
      </div>

      <ControlPanel/>
      
      {algorithms.map((algo)=> (
        <button
            key={algo.name}
            className='p-4 border rounded shadow hover:bg-pink-400 cursor-pointer'
            onClick={()=>setSelectedAlgo(algo)}
        >
           <h2 className='text-lg font-bold'>{algo.name}</h2>
           <p>Best Case: {algo.bestCase}</p>
           <p>Worst Case: {algo.worstCase}</p>
        </button>
      ))}
    </div>
  )
}

export default Sorting
