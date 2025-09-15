import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AlgoContext } from '../context/AlgoContext';

const ControlPanel = () => {

  const [control, setControl] = useState('');
  const { setIsPlaying, changeAnimationSpeed } = useContext(AlgoContext);

  return (
    <div className='flex justify-center w-full border rounded-md'>
      <div className='grid grid-cols-4 gap-2 py-4 px-4'>
        <div className='flex justify-center'>
          <button onClick={(e) => changeAnimationSpeed(0)} className='border rounded-lg py-2 px-2 hover:bg-pink-400 shadow-lg italic'>Decrease Speed</button>
        </div>
        <div className='flex justify-center'>
          <button onClick={(e) => setIsPlaying(false)} className='border rounded-lg py-2 px-4 hover:bg-pink-400 shadow-lg italic'>Pause</button>
        </div>
        <div className='flex justify-center'>
          <button onClick={(e) => changeAnimationSpeed(true)} className='border rounded-lg py-2 px-5 hover:bg-pink-400 shadow-lg italic'>Play</button>
        </div>
        <div className='flex justify-center'>
          <button onClick={(e) => changeAnimationSpeed(1)} className='border rounded-lg py-2 px-2 hover:bg-pink-400 shadow-lg italic'>Increase Speed</button>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel
