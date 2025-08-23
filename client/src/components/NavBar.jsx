import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const NavBar = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()

  return (
    <div className='fixed z-50 w-full flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 cursor-pointer'>
      <img 
        src={assets.AI} 
        alt='logo' 
        className='w-10 h-10 sm:w-12 sm:h-12 object-contain' 
        onClick={() => navigate('/')}
      />

      {user ? (
        <UserButton /> 
      ) : (
        <button 
          onClick={openSignIn} 
          className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'
        >
          Get Started <ArrowRight className='w-4 h-4'/>
        </button>
      )}
    </div>
  )
}

export default NavBar
