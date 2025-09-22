import React from 'react'
import {Routes,Route} from 'react-router-dom'
import NavBar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/contact'
import Arrays from './pages/Arrays'
import { ToastContainer, toast } from 'react-toastify';
import Sorting from './pages/Sorting'
import LinkedList from './pages/LinkedList'
import Stacks from './pages/Stacks'
import Queue from './pages/Queue'
import BinaryHeap from './pages/BinaryHeap'
import Footer from './components/Footer'
import Algorithms from './pages/Algorithms'
import SearchBar from './components/SearchBar'
import Login from './pages/Login' 

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <NavBar/>
      <SearchBar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/collections/arrays' element={<Arrays/>} />
          <Route path ='/collections/sorting' element={<Sorting />}/>
          <Route path ='/collections/linkedlists' element={<LinkedList />}/>
          <Route path ='/collections/stack' element={<Stacks />}/>
          <Route path ='/collections/queue' element={<Queue />}/>
          {/* this definition allows us to extract id when using useParams() */}
          {/* <Route path='/algorithm/:id/' element={AlgorithmPage} />  */}
          <Route path ='/collections/binaryheaps' element={<BinaryHeap />}/>
          <Route path ='/algorithms' element={<Algorithms />}/>
           <Route path='/login' element={<Login/>} />
        </Routes>
      <Footer/>
    </div>
  )
}

export default App
