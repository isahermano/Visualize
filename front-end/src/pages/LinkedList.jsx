import React, { useContext, useState } from 'react'
import { AlgoContext } from '../context/AlgoContext'
import { linkedListFunctions } from '../assets/assets';
import { toast } from 'react-toastify';

const LinkedLists = () => {

  const { highlights } = useContext(AlgoContext);
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [inputValues, setInputValues] = useState({
    0: "random" // default to random generation
  })

  const handleInputChange = (e, index) => {
    const newValues = { ...inputValues, [index]: e.target.value };
    setInputValues(newValues); // array of input values
  }

  const renderLinkedListVisualization = () => {
    if (!selectedAlgo) {
      return <div className='p-4 text-center text-gray-500'>Select an algorithm to visualize</div>
    }
    const AlgorithmComponent = selectedAlgo.fileName;
    return <AlgorithmComponent inputs={inputValues} />
  }

  const renderInputFields = () => {
    if (!selectedAlgo) {
      return null;
    }

    return selectedAlgo.inputs.map((input, index) => {
      if (input.condition && inputValues[0] !== input.condition.method) {
        return null;
      }

      return (
        <div className='mb-3'>
          <label className='block text-sm font-medium mb-1'>
            {input.label}
          </label>

          {input.type === 'select' ? (
            <select
              className='w-full p-2 border rounded'
              value={inputValues[index] || input.defaultValue}
              onChange={(e) => {
                setInputValues({ [index]: e.target.value })
              }}
            >
              {input.options.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={input.type}
              className='w-full p-2 border rounded'
              value={inputValues[index] || ''}
              onChange={(e) => handleInputChange(e, index)}
              placeholder={input.placeholder}
              min={input.min}
              max={input.max}
            />
          )}
        </div>
      )
    })
  }

  return (
    <div className='space-y-6'>
      {/* visualization */}
      <div className='min-h-[400px] border rounded-lg p-4 bg-white shadow'>
        {renderLinkedListVisualization()}
      </div>

      {/* algorithm selection */}
      <div className='grid grid-cols-2 gap-3'>
        {linkedListFunctions.map((algo) => (
          <div key={algo.name} className='relative'>
            <button
              className={`p-3 w-full border rounded shadow transition-colors cursor-pointer ${selectedAlgo?.name === algo.name
                ? 'bg-pink-500 text-white'
                : 'bg-white hover: bg-pink-100'
                }`}
              onClick={() => setSelectedAlgo(algo)}
            >
              <h2 className='font-bold text-md'>{algo.name}</h2>
            </button>
          </div>
        ))}
      </div>

      {selectedAlgo && (
        <div className='border rounded-lg p-4 bg-white shadow'>
          {renderInputFields()}
        </div>
      )}

      {/* current step message */}
      {highlights?.message && (
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">{highlights.message}</p>
        </div>
      )}
    </div>
  )
}


export default LinkedLists


