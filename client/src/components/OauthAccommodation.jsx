import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase.js';
import { signInFailure, signInStart, signInSuccess } from '../redux/accommodation/accommodationSlice.js';




export default function OauthAccommodation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async() => {
    try {
      dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
    
      const res = await fetch('/api/accommodation/googleAccommodation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: result.user.email
        })
      //  console.log(body)
      })
      const data = await res.json();
    
      dispatch(signInSuccess(data));
      navigate("/accommodation");
      //console.log(result);


        
    } catch (error) {
        console.log('could not sign in with google',error);
        dispatch(signInFailure(error.message));
    }
}
  return (
   <button onClick={handleGoogleClick} type='button' className='bg-red-700 hover:bg-red-500 text-white p-3 rounded-lg uppercase'>
    Continue with Google
   </button>
  )
}
