import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
import { AlgoContext } from '../context/AlgoContext'

import React, { useContext, useState } from 'react'

const Navbar = () => {
    return (
        <div className='w-full border-b border-gray-200'>
            <div className='flex items-center justify-between py-5 font-medium'>
                <Link to='/'>
                    <img src={assets.logo} className='w-36'/>
                </Link>

                {/* pages */}
                <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                    <NavLink to='/' className='flex flex-col items-center gap-1'>
                        <p>HOME</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/about' className='flex flex-col items-center gap-1'>
                        <p>ABOUT</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/algorithms' className='flex flex-col items-center gap-1'>
                        <p>ALGORITHMS</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                </ul>

                {/* Login/Profile Icon */}
                <div className="flex items-center gap-4">
                <Link to="/login">
                    <img 
                    src={assets.profile_icon} 
                    alt="Profile" 
                    className="w-5 h-5 cursor-pointer hover:opacity-80 transition"
                    />
                </Link>
                </div>


            </div>
        </div>
    )
}

export default Navbar
