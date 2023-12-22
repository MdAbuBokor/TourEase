import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileLink from './ProfileLink'


export default function Header() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className="flex justify-between items-center max-w-6l mx-auto p-3">
            <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>
                Tour
            </span>
            <span className='text-slate-700'>
                Ease
            </span>
        </h1>
            </Link>
       
        {/* <form action="" className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type="text" placeholder='Search..' className='bg-transparent focus:outline-none w-24 sm:w-64' />
        <FaSearch className='text-slate-600'/>
        </form> */}
        <ul className='flex gap-4 '>
            <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
           
            </Link>
            <Link to={'/about'}> 
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
            </Link>
           
           
            {/* <Link to='/profile'>
            {currentUser ? (
                <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile_pic" />,
        
                currentUser && currentUser.accomodation && currentUser.accomodation.length > 0 && currentUser.{currentUser.accomodation} ? (
                    <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile_pic" />
                    
    
                    
    
                ):
                (
                    <li className='text-slate-700 hover:underline'>Create</li>
                )
                    
                


                

            ):
            (
                <li className='text-slate-700 hover:underline'>Sign in</li>
            )}
                
            </Link> */}

         <ProfileLink />
           
            
        </ul> 
        </div>

        
      
    </header>
  )
}
