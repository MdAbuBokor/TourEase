import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { app } from '../firebase.js';

// firebase storage code       
// allow read;
// allow write: if
// request.resource.size <2*1024*1024 &&
// request.resource.contentType.matches('image/.*')



export default function Profile() {
  const [file,setfile] = useState(undefined)
  const fileRef = useRef(null)
  const {currentUser} = useSelector(state=>state.user)
  const [filePercent,setfilePercent] = useState(0)
  const [fileUploadError,setfileUploadError] = useState(false)
  const [formData,setformData] = useState({
    
  })
  console.log(formData)
  console.log(filePercent)
  console.log(fileUploadError)
  console.log(file);

  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  },[file]);
  
  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = file.name + new Date().getTime();
    const storageRef = ref(storage,  fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       setfilePercent(Math.round (progress));
      },

      (error) => {
        setfileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          
          setformData({
            ...formData,
            avatar:downloadURL
          })
        });
      }
      
      );
  }


  return (
    <div className='mx-auto max-w-lg p-3'>
      <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input onChange={(e)=>setfile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/* '/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar ||currentUser.avatar} alt=" profile_pic" className='w-24 h-24 rounded-full mx-auto cursor-pointer' />

        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (Note: image must be less than 2 mb)
            </span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePercent}%`}</span>
          ) : filePercent === 100  ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

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
