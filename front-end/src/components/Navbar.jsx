import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
import { AlgoContext } from '../context/AlgoContext'

import React, { useContext, useState } from 'react'

const Navbar = () => {

    const [visible, setVisible] = React.useState(false);

    const { setShowSearch, navigate, token, setToken } = useContext(AlgoContext);

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

                <div className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 ${visible ? 'w-64' : 'w-0 overflow-hidden'}`}>
                    <div className='flex flex-col text-gray-600'>
                        <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer border-b'>
                            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Close" />
                            <p>Close</p>
                        </div>
                        <NavLink onClick={() => setVisible(false)} className={'py-3 pl-6 border-b'} to='/'>HOME</NavLink>
                        <NavLink onClick={() => setVisible(false)} className={'py-3 pl-6 border-b'} to='/about'>ABOUT</NavLink>
                        <NavLink onClick={() => setVisible(false)} className={'py-3 pl-6 border-b'} to='/algorithms'>ALGORITHMS</NavLink>
                        
                           {token ? (
                            <>
                                <p onClick={() => { navigate('/profile'); setVisible(false); }} className='py-3 pl-6 border-b cursor-pointer'>My Profile</p>
                                <p onClick={() => { navigate('/orders'); setVisible(false); }} className='py-3 pl-6 border-b cursor-pointer'>Orders</p>
                                <p onClick={() => { logout(); setVisible(false); }} className='py-3 pl-6 border-b cursor-pointer'>Logout</p>
                            </>
                        ) : (
                            <NavLink onClick={() => setVisible(false)} className={'py-3 pl-6 border-b'} to='/login'>LOGIN</NavLink>
                        )}
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    {/* Profile icon - shown on ALL screens */}
                    <Link to="/login">
                        <img 
                            src={assets.profile_icon} 
                            alt="Profile" 
                            className="w-6 h-6 cursor-pointer hover:opacity-80 transition"
                        />
                    </Link>

                    {/* Hamburger menu - shown only on mobile */}
                    <div className='sm:hidden cursor-pointer' onClick={() => setVisible(true)}>
                        <img src={assets.menu_icon} alt="Menu" className='w-6 h-6' />
                    </div>
                </div>

                {visible && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
                        onClick={() => setVisible(false)}
                    />
                )}

                </div>
        </div>
    )
}

export default Navbar
