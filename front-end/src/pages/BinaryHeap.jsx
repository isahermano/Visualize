import React, { useContext, useState } from 'react'
import { AlgoContext } from '../context/AlgoContext'
import { binaryHeapFunctions } from '../assets/assets';

const BinaryHeap = () => {

  const { highlights } = useContext(AlgoContext);
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [inputValues, setInputValues] = useState({
    0: "random" // default to random generation
  })
  const [isPlaying, setIsPlaying] = useState(false);

  const handleInputChange = (e, index) => {
    const newValues = { ...inputValues, [index]: e.target.value };
    setInputValues(newValues); // array of input values
  }

  const renderHeapVisualization = () => {
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
            <select // drop down tag
              className='w-full p-2 border rounded'
              value={inputValues[index] || input.defaultValue}
              onChange={(e) => {
                setInputValues({ ...inputValues, [index]: e.target.value }) // prevent overwriting
              }}
            >
              {input.options.map((option, i) => ( // list options for drop down
                <option key={i} value={option.value}>
                  {option.label}
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
        {renderHeapVisualization()}
      </div>

      {/* algorithm selection */}
      <div className='grid grid-cols-2 gap-3'>
        {binaryHeapFunctions.map((algo) => (
          <div key={algo.name} className='relative'>
            <button
              className={`p-3 w-full border rounded shadow transition-colors cursor-pointer ${selectedAlgo?.name === algo.name
                ? 'bg-pink-500 text-white'
                : 'bg-white hover: bg-pink-100'
                }`}
              onClick={() => {
                setSelectedAlgo(algo);
                // Initialize inputs with defaults
                const defaults = {};
                algo.inputs.forEach((input, idx) => {
                  defaults[idx] = input.defaultValue ?? "";
                });
                setInputValues(defaults);
              }}
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

export default BinaryHeap
