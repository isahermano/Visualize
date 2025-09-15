import React, { useMemo, useState } from 'react'
import { algorithms, arrays, stackFunctions, queueFunctions, linkedListFunctions } from '../assets/assets'
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Algorithms = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDataType, setSelectedDataType] = useState('');
    const [timeComplexityFilter, setTimeComplexityFilter] = useState('');
    const [spaceComplexityFilter, setSpaceComplexityFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const allVisualizations = useMemo(() => {
        return [
            ...algorithms,
            ...arrays,
            ...stackFunctions,
            ...queueFunctions,
            ...linkedListFunctions
        ]
    })

    const filteredAlgorithms = useMemo(() => {
        return allVisualizations.filter(algo => {
            const categoryMatch = selectedCategory === '' || (selectedCategory === 'algorithms' && algo.type === 'algorithm') || (selectedCategory === 'functions' && algo.type === 'function');
            const dataTypeMatch = selectedDataType === '' || (algo.dataStructure === selectedDataType.toLowerCase())

            let timeMatch = true;
            if (timeComplexityFilter !== '') {
                if (timeComplexityFilter === 'n') {
                    timeMatch = algo.bestCase.includes('O(n)') || algo.worstCase.includes('O(n)')
                } else if (timeComplexityFilter === 'n2') {
                    timeMatch = algo.bestCase.includes('O(n²)') || algo.worstCase.includes('O(n²)')
                } else if (timeComplexityFilter === 'nlogn') {
                    timeMatch = algo.bestCase.includes('O(n log(n)') || algo.worstCase.includes('O(n log(n)')
                }
            }

            let spaceMatch = true;
            if (spaceComplexityFilter !== '') {
                if (spaceComplexityFilter === 'constant') {
                    spaceMatch = algo.worstSpace.includes('O(1)')
                } else if (spaceComplexityFilter === 'linear') {
                    spaceMatch = algo.worstSpace.includes('O(n)')
                } else if (spaceComplexityFilter === 'other') {
                    spaceMatch = !algo.worstSpace.includes('O(1)') && !algo.worstSpace.includes('O(n)');
                }
            }

            const searchMatch = searchQuery === '' || algo.name.toLowerCase().includes(searchQuery.toLowerCase()) || (algo.desc && algo.desc.toLowerCase().includes(searchQuery.toLowerCase()));

            return categoryMatch && dataTypeMatch && timeMatch && spaceMatch && searchMatch;
        })
    }, [allVisualizations, selectedCategory, selectedDataType, timeComplexityFilter, spaceComplexityFilter, searchQuery])

    const getDataTypeColor = (dataStructure) => {
        switch (dataStructure) {
            case 'arrays': return 'bg-blue-100 text-blue-800';
            case 'linkedlists': return 'bg-purple-100 text-purple-800';
            case 'stack': return 'bg-green-100 text-green-800';
            case 'queue': return 'bg-yellow-100 text-yellow-800';
            case 'sorting': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type) => {
        return type === 'algorithm' ? 'bg-indigo-100 text-indigo-800' : 'bg-teal-100 text-teal-800';
    };

    return (
        <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-6xl mx-auto'>
                {/* Header section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-12'
                >
                    <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>Explore Algorithms</h1>
                    <p className='text-xl text-gray-700 max-w-2xl mx-auto'>Explore and understand algorithms through interactive visualizations</p>
                </motion.div>

                {/* Filters Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='bg-gray-100 shadow-lg rounded-2xl mb-8 p-6'
                >
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                        {/* search input */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Search Algorithms</label>
                            <input type="text" placeholder='Search by name...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 cursor-pointer'
                            />
                        </div>

                        {/* type filter */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Type</label>
                            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 cursor-pointer'
                            >
                                <option value="all">All Types</option>
                                <option value="algorithms">Algorithms</option>
                                <option value="functions">Functions</option>
                            </select>
                        </div>

                        {/* data structure filter */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Data Structure</label>
                            <select value={selectedDataType} onChange={(e) => setSelectedDataType(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 cursor-pointer'
                            >
                                <option value="all">All Structures</option>
                                <option value="sorting">Sorting</option>
                                <option value="arrays">Arrays</option>
                                <option value="linked lists">Linked Lists</option>
                                <option value="stack">Stack</option>
                                <option value="queue">Queue</option>
                            </select>
                        </div>

                        {/* time complexity */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Time Complexity</label>
                            <select value={selectedCategory} onChange={(e) => setTimeComplexityFilter(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 cursor-pointer'
                            >
                                <option value="all">All Complexities</option>
                                <option value="sorting">O(n)</option>
                                <option value="nlogn">O(n log(n))</option>
                                <option value="n2">O(n²)</option>
                            </select>
                        </div>

                        {/* space complexity */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Space Complexity</label>
                            <select value={selectedCategory} onChange={(e) => setSpaceComplexityFilter(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 cursor-pointer'
                            >
                                <option value="">All Complexities</option>
                                <option value="constant">O(1) - Constant</option>
                                <option value="linear">O(n) - Linear</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* active filters */}
                    <div className='flex flex-wrap gap-2 mt-4'>
                        {selectedCategory !== '' && (
                            <span className='px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full'>
                                Type: {selectedCategory}
                            </span>
                        )}

                        {selectedDataType !== '' && (
                            <span className='px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full'>
                                Data Structure: {selectedDataType}
                            </span>
                        )}

                        {timeComplexityFilter !== '' && (
                            <span className='px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full'>
                                Time: {timeComplexityFilter === 'n' ? 'O(n)' : timeComplexityFilter === 'nlogn' ? 'O(n log n)' : 'O(n²)'}
                            </span>
                        )}
                        {spaceComplexityFilter !== '' && (
                            <span className='px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full'>
                                Space: {spaceComplexityFilter === 'constant' ? 'O(1)' : spaceComplexityFilter === 'linear' ? 'O(n)' : 'Other'}
                            </span>
                        )}
                        {searchQuery && (
                            <span className='px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full'>
                                Search: "{searchQuery}"
                            </span>
                        )}
                    </div>
                </motion.div>

                {/* results count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className='mb-6'
                >
                    <p className='text-gray-700'>
                        Showing {filteredAlgorithms.length} of {allVisualizations.length} algorithms.
                    </p>
                </motion.div>

                {/* algorithms grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                >
                    <AnimatePresence>
                        {filteredAlgorithms.map((algorithm) => (
                            <motion.div
                                key={algorithm.id || algorithm.name}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -5 }}
                                className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'
                            >
                                <div className='p-6'>
                                    <div className='flex flex-wrap gap-2 mb-3'>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(algorithm.type)}`}>
                                            {algorithm.type}
                                        </span>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getDataTypeColor(algorithm.dataStructure)}`}>
                                            {algorithm.dataStructure}
                                        </span>
                                    </div>
                                    {/* Name */}
                                    <div className='flex items-center mb-4'>
                                        <h2 className='text-xl font-semibold text-gray-900'>{algorithm.name}</h2>
                                    </div>
                                    <p className='text-gray-600 mb-5'>{algorithm.desc}</p>

                                    {/* complexity badges */}
                                    {algorithm.hasComplexity && (
                                        <div className='grid grid-cols-2 gap-2 mb-5'>
                                            <div>
                                                <p className='text-xs text-gray-500 mb-1'>Best Case Time</p>
                                                <span className={'px-2 py-1 text-xs rounded-full'}>
                                                    {algorithm.bestCase}
                                                </span>
                                            </div>
                                            <div>
                                                <p className='text-xs text-gray-500 mb-1'>Worst Case Time</p>
                                                <span className={'px-2 py-1 text-xs rounded-full'}>
                                                    {algorithm.worstCase}
                                                </span>
                                            </div>
                                            <div>
                                                <p className='text-xs text-gray-500 mb-1'>Space Complexity</p>
                                                <span className={'px-2 py-1 text-xs rounded-full'}>
                                                    {algorithm.worstSpace}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* operation complexity (for functions) */}
                                    {!algorithm.hasComplexity && (
                                        <div className='mb-5'>
                                            <p className='text-xs text-gray-500 mb-2'>Operation Complexity</p>
                                            <div className='flex gap-2'>
                                                <span className='px-2 py-1 text-xs'>Time: {algorithm.worstCase}</span>
                                                <span className='px-2 py-1 text-xs'>Space: {algorithm.worstSpace}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* <Link to={algorithm.fileName}> */}
                                        <button onClick={() => navigate(`/collections/${algorithm.route}`)}className='w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer'>
                                            Visualize
                                        </button>
                                    {/* </Link> */}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredAlgorithms.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-12"
                    >
                        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No visualizations found</h3>
                            <p className="text-gray-600">
                                Try adjusting your filters or search query to see more results.
                            </p>
                        </div>
                    </motion.div>
                )}


                {/* Empty State */}
                {filteredAlgorithms.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-12"
                    >
                        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No algorithms found</h3>
                            <p className="text-gray-600">
                                Try adjusting your filters or search query to see more results.
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default Algorithms
