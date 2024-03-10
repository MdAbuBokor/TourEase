import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Oauth from '../components/Oauth.jsx';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice.js';
export default function SignIn() {
const [formData, setFormData]=useState({});
const dispatch = useDispatch();
const {currentUser,loading,error} =useSelector((state)=>state.user)
const navigate = useNavigate();

useEffect(() => {

  if (currentUser) {
    navigate('/');
  }
}, [currentUser, navigate]);
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
  const res =await fetch('/api/auth/signin',{
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
  navigate('/')
  } 
  
  
  catch (err) {
    dispatch(signInFailure(err.message))
  }
    

}


  return (
    <div>
    <Header />
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
 <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4'>

  
 <label className="input input-bordered flex items-center gap-2">
 <span className="min-w-[25%]">Email</span>
  <input type="email" placeholder='email ' className=' p-2 border-l w-full  ' id ='email' onChange={handleChange}/>
</label>
<label className="input input-bordered flex items-center gap-2">
 <span className="min-w-[25%]">Password</span>
  <input type="password"  placeholder='password ' className=' p-2 border-l w-full  ' id ='password' onChange={handleChange}/>
</label>
  <button disabled ={loading} className='btn btn-primary'>{loading ?'Loading' : 'Sign In'}</button>




  
  
  <Oauth />
 </form>

 <div className='flex gap-2 mt-5'>
  <p>Dont have an account?</p>
  <Link to ={"/signup"}>
  <span className='text-blue-700 font-bold'>Sign Up</span>
  </Link>
 </div>

 {error && ( <p className='text-red-500 mt-5'>{error}</p> ) }


    </div>
    </div>
 
  )
}
