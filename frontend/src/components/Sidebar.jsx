import { X } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
const Sidebar = () => {
    const [isOpen,setIsOpen] = useState(false) ;
    const loading = true ; 
    const matches = [] ; 
    const toggleSidebar = () => {
        setIsOpen(!isOpen) ;
    } 
    return (
    <div className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-md overflow-hidden transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:w-1/4`}>
        <div className='flex flex-col h-full'>
            {/* Header  */}
            <div className='p-4 pb-[27px] border-b divide-x-4 border-pink-200 flex justify-between items-center'>
                <h2 className='text-xl font-bold text-pink-600'>Matches</h2>
                <button className='lg:hidden p-1 text-gray-500 hover:text-gray-700 focus:outline-none' onClick={toggleSidebar}>
                    <X size={24}></X>
                </button>
        
            </div>

            <div className='flex-grow overflow-auto p-4 z-10 relative'>
                
            </div> 
        </div>

        
        

    </div>
  )
}

const noMatchesFound = () => {
    return (
        <div className='flex justify-center items-center h-full text-center'>
            <p className='text-gray-500'>No matches found</p>
        </div>
    )
}

export default Sidebar