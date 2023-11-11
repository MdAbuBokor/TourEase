import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className='mx-auto max-w-lg p-3'>
      <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt=" profile_pic" className='w-24 h-24 rounded-full mx-auto cursor-pointer' />

        <input type="text" placeholder='Name ' className='border p-3 rounded-lg ' id ='username' />
        <input type="email" placeholder='email ' className='border p-3 rounded-lg ' id ='email' />
        <input type="text" placeholder='password ' className='border p-3 rounded-lg ' id ='password' />
        <button className='border p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-90 disabled:opacity-60'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-400 cursor-pointer'>Sign out</span>
      </div>

    </div>
  )
}
