import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Oauth from './../components/Oauth';

export default function SignUp() {
const [formData, setFormData]=useState({});
const [error,setError] =useState(null);
const [loading,setLoading]=useState(false)
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
    
  setLoading(true);
  const res =await fetch('/api/auth/signup',{
    method: 'POST',
    headers:{
      'Content-Type'  : 'application/json'
    },
    body: JSON.stringify(formData),
  })

  const data = await res.json();
  if(data.success===false){
    setError(data.message);
    setLoading(false);
    console.log(data)
    return;
  }
  setLoading(false)
  setError(null)
  navigate('/signin')
  } 
  
  
  catch (err) {
    setLoading(false);
    setError(err.message);
  }
    

}


  return (
    <div>
    <Header />
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
 <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4'>
 <label className="input input-bordered flex items-center gap-2">
 <span className="min-w-[25%]">Username</span>
  <input type="text"  placeholder='username ' className=' p-2 border-l w-full  ' id ='email' onChange={handleChange}/>
</label>

<label className="input input-bordered flex items-center gap-2">
 <span className="min-w-[25%]">Email</span>
  <input type="email"  placeholder='email ' className=' p-2 border-l w-full  ' id ='email' onChange={handleChange}/>
</label>
<label className="input input-bordered flex items-center gap-2">
 <span className="min-w-[25%]">Password</span>
  <input type="password"  placeholder='password ' className=' p-2 border-l w-full  ' id ='password' onChange={handleChange}/>
</label>

 



  <button disabled ={loading} className='btn btn-primary'>{loading ?'Loading' : 'Sign Up'}</button>
  <Oauth/>
 </form>

 <div className='flex gap-2 mt-5'>
  <p>Have an account already?</p>
  <Link to ={"/signin"}>
  <span className='font-bold'>Sign in</span></Link>
 </div>

 {error && ( <p className='text-red-500 mt-5'>{error}</p> ) }


    </div>
    </div>
 
  )
}
