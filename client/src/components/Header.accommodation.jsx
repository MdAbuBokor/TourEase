import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function HeaderAccomodation() {
  const { currentAccommodation } = useSelector(state => state.accommodation);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/accommodation'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Tour</span>
            <span className='text-slate-700'>Ease</span>
          </h1>
        </Link>

        <ul className='flex gap-4 '>
          <Link to='/accommodation'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
          </Link>

          {currentAccommodation ? (
            <Link to='/accommodation/profile'>
              <img className='rounded-full h-7 w-7 object-cover' src={currentAccommodation.avatar} alt="profile_pic" />
            </Link>
          ) : (
            <Link to='/accommodation/signin'>
              <li className='text-slate-700 hover:underline'>Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
