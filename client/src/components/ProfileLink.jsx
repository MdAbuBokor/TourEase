import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileLink = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      {currentUser ? (
        <div className='flex items-center gap-2'>
          <Link to='/profile'>
            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile_pic" />
          </Link>

          <Link to='/accommodation/create'>
            <button className='border p-1 rounded-lg bg-slate-700 text-white uppercase hover:opacity-90 disabled:opacity-60'>
              Accommodation
            </button>
          </Link>

          {/* Your accommodation logic here */}
        </div>
      ) : (
        <div className=" flex items-center gap-2">

        <Link to='/signin'>
          <span className='text-slate-700 hover:underline'>Sign in</span>
        </Link>

        <Link to='/accommodation/create'>
        <button className='border  rounded-lg bg-slate-700 text-white uppercase hover:opacity-90 disabled:opacity-60'>
          Accommodation
        </button>
        </Link> 
        </div>


      )}
    </div>
  );
};

export default ProfileLink;
