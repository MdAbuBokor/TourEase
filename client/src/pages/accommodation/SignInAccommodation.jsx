import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import HeaderAccomodation from '../../components/Header.accommodation.jsx';
import { signInFailure, signInStart, signInSuccess } from '../../redux/accommodation/accommodationSlice.js';
export default function SignInAccommodation() {
const [formData, setFormData]=useState({});
const dispatch = useDispatch();
const {loading,error} =useSelector((state)=>state.accommodation)
const navigate = useNavigate();
const handleChange = (e)=>{
  setFormData({
    ...formData,
    [e.target.id]:e.target.value,
  });
};

const handleSubmit =async (e ) =>{
  e.preventDefault();

  try {
    
  dispatch(signInStart());
  const res =await fetch('/api/accommodation/signInAccommodation',{
    method: 'POST',
    headers:{
      'Content-Type'  : 'application/json'
    },
    body: JSON.stringify(formData),
  })

  const data = await res.json();
  if(data.success===false){
 dispatch(signInFailure(data.message));
    return;
  }
dispatch(signInSuccess(data))
  navigate('/accommodation')
  } 
  
  
  catch (err) {
    dispatch(signInFailure(err.message))
  }
    

}


  return (
    <div className="">
      <HeaderAccomodation />

    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In Accommodation</h1>
 <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4'>

  
  <input type="email" placeholder='email' className='border p-3 rounded-lg ' id='email' onChange={handleChange} />
  
  <input type="password" placeholder='password' className='border p-3 rounded-lg ' id='password' onChange={handleChange} />

  <button disabled ={loading} className='bg-slate-700 text-white p-3  rounded-lg uppercase hover:font-semibold hover:opacity-95 disabled:opacity-80'>{loading ?'Loading' : 'Sign In'}</button>
  {/* <OauthAccommodation /> */}
 </form>
 <div className='flex gap-2 mt-5'>
  <p>Dont have an account?</p>
  <Link to ={"/accommodation/create"}>
  <span className='text-blue-700 font-bold'>Sign Up</span>
  </Link>
 </div>

 {error && ( <p className='text-red-500 mt-5'>{error}</p> ) }


    </div>
    </div>
 
  )
}
