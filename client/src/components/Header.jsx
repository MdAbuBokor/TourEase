import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { signOutFailure, signOutStart, signOutSuccess } from '../redux/user/userSlice';



export default function Header() {
    const dispatch = useDispatch();
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    );
    const {currentUser} = useSelector(state => state.user)

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localTheme = localStorage.getItem('theme');
        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [theme]);

    const toggleTheme = (e) => {

        setTheme(e.target.checked ? 'dark' : 'light');
    }
    const handleSignOut = async ()=>{
        Swal.fire({
          title: "Are you sure to Signout?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "SignOut"
        }).then(async(result) => {
          if (result.isConfirmed) {
            try {
              dispatch(signOutStart());
              const res =await fetch(`/api/auth/signout`,{
                method: 'GET',
                headers:{
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(),
              })
              const data = await res.json();
             if(data.success===false){
                dispatch(signOutFailure(data.message));
                return;
              }
        
              dispatch(signOutSuccess(data));
           
          //    console.log(data)
              
            }
            catch (error) {
                dispatch(signOutFailure(error.message));
              
            }
            Swal.fire({
              title: "SignOut!",
              icon: "success"
            });
          }
        });
    
        // console.log(formData)
         
       }
  return (
    // <header className='bg-slate-200 shadow-md'>
    //     <div className="flex justify-between items-center max-w-6l mx-auto p-3">
    //         <Link to='/'>
    //         <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
    //         <span className='text-slate-500'>
    //             Tour
    //         </span>
    //         <span className='text-slate-700'>
    //             Ease
    //         </span>
    //     </h1>
    //         </Link>
       
    //     {/* <form action="" className='bg-slate-100 p-3 rounded-lg flex items-center'>
    //         <input type="text" placeholder='Search..' className='bg-transparent focus:outline-none w-24 sm:w-64' />
    //     <FaSearch className='text-slate-600'/>
    //     </form> */}
    //     <ul className='flex gap-4 '>
    //         <Link to='/'>
    //         <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
           
    //         </Link>
    //         <Link to={'/about'}> 
    //             <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
    //         </Link>
           
           
    //         {/* <Link to='/profile'>
    //         {currentUser ? (
    //             <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile_pic" />,
        
    //             currentUser && currentUser.accomodation && currentUser.accomodation.length > 0 && currentUser.{currentUser.accomodation} ? (
    //                 <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile_pic" />
                    
    
                    
    
    //             ):
    //             (
    //                 <li className='text-slate-700 hover:underline'>Create</li>
    //             )
                    
                


                

    //         ):
    //         (
    //             <li className='text-slate-700 hover:underline'>Sign in</li>
    //         )}
                
    //         </Link> */}

    //      <ProfileLink />
           
            
    //     </ul> 
    //     </div>

        
      
    // </header>
    <div className="navbar bg-base-100 shadow-xl sticky top-0 z-10">
    <div className="flex-1">
    <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className=''>
                Tour
            </span>
            <span className=''>
                Ease
            </span>
        </h1>
            </Link>
    </div>
    <div className="flex-none">
      {/* <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span className="badge badge-sm indicator-item">8</span>
          </div>
        </div>
        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
          <div className="card-body">
            <span className="font-bold text-lg">8 Items</span>
            <span className="text-info">Subtotal: $999</span>
            <div className="card-actions">
              <button className="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div> */}
      <label className="swap swap-rotate">
  
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" checked={theme == 'dark'} onChange={toggleTheme} className="theme-controller" value="synthwave" />
  
  {/* sun icon */}
  <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
  
  {/* moon icon */}
  <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
  
</label>

      {currentUser?(

      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Profile photo" src={currentUser?.avatar} />
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border-b border-green-500">
          <li className='border-b border-green-500'>
            <Link to='/profile'>Profile</Link>
          </li>
          <li className='border-b border-green-500'><a>Settings</a></li>
          <li >
            <button onClick={handleSignOut}>Sign out</button>
          </li>
        </ul>
      </div>)
      :(
      <Link to='/signin'>
      <button className="btn btn-primary">
        Login 
      </button>
      </Link>)
}
    </div>
  </div>
  )
}
