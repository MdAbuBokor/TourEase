import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase.js';
import { signInSuccess } from '../redux/user/userSlice.js';



export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async() => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo : result.user.photoURL
        })
      })
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
      console.log(result);


        
    } catch (error) {
        console.log('could not sign in with google',error);
    }
}
  return (
   <button onClick={handleGoogleClick} type='button' className='bg-red-700 hover:bg-red-500 text-white p-3 rounded-lg uppercase'>
    Continue with Google
   </button>
  )
}
