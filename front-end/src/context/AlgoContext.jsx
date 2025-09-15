import React, { createContext, use, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'

export const AlgoContext = createContext();

const AlgoContextProvider = ({ children }) => {
  const [array, setArray] = useState([1, 41, 8, 29, 12, 7]);
  const [sorting, setIsSorting] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(800);
  const [activeAlgo, setActiveAlgo] = useState(null);
  const [highlights, setHighlights] = useState({});
  const [step, setCurrentStep] = useState("");
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  const createLinkedListFromArray = (arr) => {
    return arr.map((value, index) => ({
      id: `node-${Date.now()}-${index}`, // unique id
      value: value,
      next: index < arr.length - 1 ? index + 1 : null,
      isNew: false
    }))
  }

  // data structures
  const [linkedList, setLinkedList] = useState(createLinkedListFromArray([1, 41, 8, 29, 12, 7]));
  const [stack, setStack] = useState([1, 41, 8, 29, 12, 7]);
  const [queue, setQueue] = useState([1, 41, 8, 29, 12, 7]);
  const [heap, setHeap] = useState([1, 41, 8, 29, 12, 7]);
  const [heapSize, setHeapSize] = useState(6);
  const [heapified, setHeapified] = useState(false);

  const changeAnimationSpeed = async (control) => {
    try {
      if (control === 1) {
        animationSpeed += 100;
      } else if (control === 0) {
        animationSpeed -= 100;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const animateSort = async (algorithm, name) => {
    try {
      setIsSorting(true);
      setActiveAlgo(name);

      const arrCopy = [...array];
      const updates = [];

      await algorithm(arrCopy, updates);

      for (const step of updates) {
        setArray([...step.arrayState]);
        setHighlights(step.highlights || ({}));
        setCurrentStep(step.message || "")
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
      }

      setIsSorting(false);
      setActiveAlgo(null);
      setCurrentStep("");
    } catch (error) {
      console.log(error);
      setIsSorting(false);
      setActiveAlgo(null);
      setCurrentStep("An error occured.");
    }
  }

  const animateLinkedList = async (algorithm) => {
    try {
      const listCopy = [...linkedList];
      const updates = [];

      await algorithm(listCopy, updates);

      for (const step of updates) {
        setLinkedList([...step.listState]);
        setHighlights(step.highlights || {});
        setCurrentStep(step.message || "");
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
      }

      setCurrentStep("");
    } catch (error) {
      console.log(error);
    }
  }

  const animateStack = async (algorithm) => {
    try {
      const stackCopy = [...stack];
      const updates = [];

      await algorithm(stackCopy, updates);

      for (const step of updates) {
        setStack([...step.stackState]);
        setHighlights(step.highlights || {});
        setCurrentStep(step.message || "");
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
      }

      setCurrentStep("");
    } catch (error) {
      console.log(error);
    }
  }

  const animateQueue = async (algorithm) => {
    try {
      const queueCopy = [...queue];
      const updates = [];

      await algorithm(queueCopy, updates);

      for (const step of updates) {
        setStack([...step.queueState]);
        setHighlights(step.highlights || {});
        setCurrentStep(step.message || "");
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
      }

      setCurrentStep("");
    } catch (error) {
      console.log(error);
    }
  }

  const animateHeap = async (algorithm) => {
    try {
      setIsSorting(true);

      const heapCopy = [...heap];
      let sizeCopy = heapSize;
      const updates = [];

      await algorithm(heapCopy, sizeCopy, updates);

      for (const step of updates) {
        setHeap([...step.heapState]);
        if (step.heapSize !== undefined) setHeapSize(step.heapSize);
        setHighlights(step.highlights || {});
        setCurrentStep(step.message || "");
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
      }

      setCurrentStep("");
      setHighlights({});
    } catch (error) {
      console.log(error);
      setCurrentStep("An error occurred.");
    }
  }

  const getBarColor = (index) => {
    if (highlights.merging?.left?.includes(index)) return 'bg-blue-500'
    if (highlights.merging?.right?.includes(index)) return 'bg-indigo-500'
    if (highlights.splitting?.left?.includes(index)) return 'bg-blue-500'
    if (highlights.splitting?.right?.includes(index)) return 'bg-indigo-500'
    if (highlights.inserted?.includes(index)) return 'bg-pink-400'
    if (highlights.shiftedIndex === index) return 'bg-red-400'; // keep this consistent
    if (highlights.min?.includes(index)) return 'bg-red-400'
    if (highlights.comparing?.includes(index)) return 'bg-orange-400';
    if (highlights.swapping?.includes(index)) return 'bg-purple-400';
    if (highlights.sorted?.includes(index)) return 'bg-green-400';
    if (highlights.shifting?.includes(index)) return 'bg-yellow-400';
    if (highlights.extracted?.includes(index)) return 'bg-red-400';
    if (highlights.pivot === index) return 'bg-yellow-400';

    return 'bg-blue-300';
  }

  const renderArray = () => {
    const maxValue = Math.max(...array, 0);

    const getBarYOffset = (index) => {
      const depth = highlights.depth || 0;
      const baseOffset = 30;

      if (highlights.comparing?.includes(index)) {
        return -100 - (depth * 20)
      }

      if (
        highlights.merging?.left?.includes(index) ||
        highlights.merging?.right?.includes(index) ||
        highlights.splitting?.left?.includes(index) ||
        highlights.splitting?.right?.includes(index)
      ) {
        return -baseOffset * depth;
      }

      if (highlights.extracted?.includes(index)) return -80;

      return 0;
    }

    return (
      <div className='flex flex-col items-center'>
        <div className='flex items-end gap-1 h-72'>
          {array.map((val, index) => {
            return (
              <motion.div
                key={index}
                layout
                animate={{
                  height: val != null ? (val / maxValue) * 180 : 20,
                  x: highlights.shiftedIndex === index ? 52 : 0, // shift right by one
                  y: getBarYOffset(index)
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                }}
                className={`${getBarColor(index)} w-12 text-white text-xs text-center`}
              >
                {val !== null ? val : ''}
              </motion.div>
            )
          })}
        </div>

        {/* floating animation */}
        {highlights.carrying !== undefined && (
          <motion.div
            key="carried"
            initial={{ x: (highlights.carriedOver ?? 0) * 52, y: -60 }}
            animate={{
              x: (highlights.carriedOver ?? 0) * 52,
              y: -80
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
            className='absolute text-white bg-red-400 px-3 py-1 rounded'
            style={{ top: '10px' }}
          >
            {highlights.carrying}
          </motion.div>
        )}

        {/* index labels */}
        <div className='flex gap-1 mt-2'>
          {array.map((_, index) => (
            <div key={index} className='w-12 text-center'>
              {index}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const renderLinkedList = () => {
    // Map Tailwind colors to actual hex values
    const colorMap = {
      'bg-blue-300': '#93c5fd',
      'bg-blue-500': '#3b82f6',
      'bg-indigo-500': '#6366f1',
      'bg-orange-400': '#fb923c',
      'bg-purple-400': '#c084fc',
      'bg-green-400': '#4ade80',
      'bg-yellow-400': '#facc15',
      'bg-red-400': '#f87171',
      'bg-pink-400': '#f472b6',
    };

    // Function to get hex color from Tailwind class
    const getHexColor = (index) => {
      const colorClass = getBarColor(index);
      return colorMap[colorClass] || '#3b82f6'; // default to blue-500
    };

    return (
      <div className='flex flex-col items-center'>
        <div className='flex mt-50'>
          {linkedList.map((node, index) => {

            const isNewNode = node.isNew;
            const isHighlighted = highlights.updatingPointer?.includes(index);

            return (
              <div key={node.id} className='flex items-center relative'>
                <motion.div
                  layout
                  initial={{
                    y: isNewNode ? -80 : 0, // initially enter
                    opacity: isNewNode ? 0 : 1,
                    scale: isNewNode ? 0.8 : 1
                  }}
                  animate={{
                    y: 0, // stay at y level
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                    duration: 0.6
                  }}
                  className={`${getBarColor(index)} w-10 h-10 flex items-center text-white text-xs justify-center border rounded-full z-10`}
                >
                  {node.value}
                </motion.div>

                {/* add arrow between each node */}
                {node.next !== null && (
                  <div className='relative h-1 w-8 gap-8'>
                    <motion.div
                      key={`arrow-${node.id}-${node.next}`}
                      className={`absolute h-full ${getBarColor(index)} rounded-full`}
                      initial={{
                        width: highlights.newArrow === index ? 0 : '100%',
                        opacity: highlights.oldArrow === index ? 1 : 1
                      }}
                      animate={{
                        width: '100%',
                        opacity: highlights.oldArrow === index ? 0 : 1
                      }}
                      transition={{
                        width: {
                          duration: highlights.newArrow === index ? 0.8 : 0,
                          ease: 'easeInOut',
                          delay: highlights.newArrow === index ? 0.3 : 0
                        },
                        opacity: {
                          duration: highlights.oldArrow === index ? 0.3 : 0,
                          delay: highlights.oldArrow === index ? 0.1 : 0
                        }
                      }}
                    >
                    </motion.div>
                    <motion.div
                      key={`arrowhead-${node.id}-${node.next}`}
                      className='absolute right-0 -top-2'
                      initial={{
                        opacity: highlights.newArrow === index ? 0 : 1
                      }}
                      animate={{
                        opacity: highlights.oldArrow === index ? 0 : 1
                      }}
                      transition={{
                        delay: highlights.newArrow === index ? 1.1 : highlights.oldArrow ? 0.1 : 0,
                        duration: 0.2
                      }}
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: '10px solid transparent',
                        borderBottom: '10px solid transparent',
                        borderLeft: `12px solid ${getHexColor(index)}`
                      }}
                    >
                    </motion.div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* index labels */}
        <div className='flex gap-7 mt-2'>
          {linkedList.map((_, index) => (
            <div key={index} className={`w-12 text-center text-xs ${index === 0 ? 'font-bold' :
              index === linkedList.length - 1 ? 'font-bold' : ""
              }`}>
              {index === 0 ? <>{index}<br />Head</> : index === linkedList.length - 1 ? <>{index}<br />Tail</> : index}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderStack = () => {
    return (
      <div className='flex flex-col items-center'>
        <div className='relative border-l-2 border-r-2 border-b-2 border-gray-400 rounded-b-md p-2 min-h-40 bg-gray-100 flex justify-center'>
          <div className='flex flex-col-reverse items-center gap-1'>
            {stack.length === 0 ? (
              <div className="text-gray-500 italic py-16">Empty Stack</div>
            ) : (
              <AnimatePresence>
                {stack.map((val, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ y: -20, opacity: 0 }} // pushed
                    animate={{ y: 0, opacity: 1 }} // settle
                    exit={{ y: -20, opacity: 0 }} // popped
                    transition={{ duration: 0.3 }}
                    className={`w-32 h-8 ${getBarColor(index)} flex items-center justify-center text-white rounded-md border-2`}
                  >
                    {val}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderQueue = () => {
    return (
      <div className='flex flex-col items-center'>
        <div className='flex items-end gap-1'>
          {queue.map((val, index) => (
            <motion.div
              key={val}
              layout
              initial={{ y: -20, opacity: 0 }} // enqueue
              animate={{ y: 0, opacity: 1 }} // settle
              exit={{
                x: highlights.extracted === index ? -100 : 0, // slide first element left
                y: index === 0 ? 0 : -20,
                opacity: 0
              }} // dequeue
              transition={{ duration: 0.3 }}
              className={`w-12 h-8 ${getBarColor(index)} flex items-center justify-center text-white rounded-md border-2`}
            >
              {val}
            </motion.div>
          ))}

        </div>

        {/* index labels */}
        <div className='flex gap-1 mt-2'>
          {queue.map((_, index) => (
            <div key={index} className='w-12 text-center'>
              {index}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderHeap = () => {
    const size = heapSize; // only show active heap
    if (!heap || size === 0) return null;

    const containerWidth = 640;   // tweak for spacing
    const nodeRadius = 22;        // circle radius (content-box)
    const levelGap = 90;          // vertical spacing
    const topPad = 24;

    const levels = Math.floor(Math.log2(size)) + 1;
    const containerHeight = topPad + (levels - 1) * levelGap + nodeRadius * 2 + 24;

    // compute node centers
    const positions = Array.from({ length: size }, (_, i) => {
      const level = Math.floor(Math.log2(i + 1));
      const levelNodes = 2 ** level;
      const indexInLevel = i - (2 ** level - 1);
      const x = (containerWidth / (levelNodes + 1)) * (indexInLevel + 1);
      const y = topPad + level * levelGap;
      return { x, y };
    });

    // helper to draw line to circle edges (not required, but looks cleaner)
    const edgePoint = (from, to, r) => {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const len = Math.hypot(dx, dy) || 1;
      return { x: from.x + (dx / len) * r, y: from.y + (dy / len) * r };
    };

    return (
      <div
        className="relative"
        style={{ width: containerWidth, height: containerHeight }}
      >
        {/* SVG edges */}
        <svg
          className="absolute top-0 left-0"
          width={containerWidth}
          height={containerHeight}
          viewBox={`0 0 ${containerWidth} ${containerHeight}`}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: size }, (_, i) => {
            const lines = [];
            const p = positions[i];

            const L = 2 * i + 1;
            const R = 2 * i + 2;

            if (L < size) {
              const c = positions[L];
              const p1 = edgePoint(p, c, nodeRadius);
              const p2 = edgePoint(c, p, nodeRadius);
              lines.push(
                <line
                  key={`line-${i}-${L}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              );
            }

            if (R < size) {
              const c = positions[R];
              const p1 = edgePoint(p, c, nodeRadius);
              const p2 = edgePoint(c, p, nodeRadius);
              lines.push(
                <line
                  key={`line-${i}-${R}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              );
            }

            return lines;
          })}
        </svg>

        {/* nodes */}
        {Array.from({ length: size }, (_, i) => {
          const pos = positions[i];
          return (
            <motion.div
              key={i}
              initial={false}
              // Use left/top in pixels (no transforms), so we match SVG's coordinate space
              animate={{
                left: pos.x - nodeRadius,
                top: pos.y - nodeRadius,
                opacity: 1
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`absolute flex items-center justify-center rounded-full border-2 text-white text-sm ${getBarColor(
                i
              )}`}
              style={{
                width: nodeRadius * 2,
                height: nodeRadius * 2
              }}
            >
              {heap[i]}
            </motion.div>
          );
        })}
      </div>
    );
  };


  const value = {
    array, setArray,
    setIsSorting, animationSpeed, setAnimationSpeed,
    activeAlgo, animateSort, renderArray,
    highlights, setHighlights, navigate, step,
    linkedList, setLinkedList, renderLinkedList, animateLinkedList,
    createLinkedListFromArray,
    stack, setStack, renderStack, animateStack,
    queue, setQueue, renderQueue, animateQueue,
    isPlaying, setIsPlaying, changeAnimationSpeed,
    heap, setHeap, heapSize, setHeapSize,
    animateHeap, renderHeap, heapified, setHeapified
  }

  return (
    <AlgoContext.Provider value={value}>
      {children}
    </AlgoContext.Provider>
  )
}

export default AlgoContextProvider
