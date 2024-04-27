import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Header from "../components/Header.jsx";
import { app } from '../firebase.js';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutFailure, signOutStart, signOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice.js';
// firebase storage code       
// allow read;
// allow write: if
// request.resource.size <2*1024*1024 &&
// request.resource.contentType.matches('image/.*')



export default function Profile() {
  const [file,setfile] = useState(undefined)
  const fileRef = useRef(null)
  const navigate = useNavigate()
  const {currentUser,loading,error} = useSelector(state=>state.user)
  const [filePercent,setfilePercent] = useState(0)
  const [fileUploadError,setfileUploadError] = useState(false)
  const [formData,setformData] = useState({
    
  })
  const dispatch = useDispatch();
  const [updateSuccess,setUpdateSuccess] = useState(false)
 // console.log(formData)
  // console.log(filePercent)
  // console.log(fileUploadError)
  // console.log(file);

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

  const handleChange = (e)=>{
    setformData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
   // console.log(formData)
    try {
      dispatch(updateUserStart());
      const res =await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
     if(data.success===false){
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true)
    
  //    console.log(data)
      
    }
    catch (error) {
      dispatch(updateUserFailure(error.message));
      
    }
  }

  const handleDelete = async ()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          dispatch(deleteUserStart());
          const res =await fetch(`/api/user/delete/${currentUser._id}`,{
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(),
          })
          const data = await res.json();
         if(data.success===false){
            dispatch(deleteUserFailure(data.message));
            return;
          }
    
          dispatch(deleteUserSuccess(data));
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success"
          });
       
      //    console.log(data)
          
        }
        catch (error) {
          dispatch(deleteUserFailure(error.message));
          
        }
       
      }
    });

   // console.log(formData)
   
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
          navigate("/");
          Swal.fire({
            title: "SignOut!",
            icon: "success"
          });
         
       
      //    console.log(data)
          
        }
        catch (error) {
            dispatch(signOutFailure(error.message));
          
        }

      }
    });

    // console.log(formData)
     
   }

   

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-lg p-3">
        <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setfile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/* "
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt=" profile_pic"
            className="w-24 h-24 rounded-full mx-auto cursor-pointer"
          />

          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (Note: image must be less than 2 mb)
              </span>
            ) : filePercent > 0 && filePercent < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePercent}%`}</span>
            ) : filePercent === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded! Now click update.
              </span>
            ) : (
              ""
            )}
          </p>

          <label className="input input-bordered flex items-center gap-2">
            <span className="min-w-[25%]">Username</span>
            <input
              type="text"
              defaultValue={currentUser.username}
              placeholder="Name "
              className="border-l p-2 w-full  "
              id="username"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <span className="min-w-[25%]">Email</span>
            <input
              type="email"
              defaultValue={currentUser.email}
              placeholder="email "
              className=" p-2 border-l w-full  "
              id="email"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <span className="min-w-[25%]">Password</span>
            <input
              type="password"
              placeholder="password "
              className=" p-2 border-l w-full  "
              id="password"
              onChange={handleChange}
            />
          </label>

          <button
            disabled={loading}
            className="border p-3 rounded-lg uppercase bg-slate-700 text-white hover:font-semibold disabled:opacity-80 uppercase hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "loading..." : "update profile"}{" "}
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span onClick={handleDelete} className="text-red-700 cursor-pointer">
            Delete Account
          </span>
          <span onClick={handleSignOut} className="text-red-400 cursor-pointer">
            Sign out
          </span>
        </div>

        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess ? "Profile updated successfully" : ""}
        </p>
      </div>
    </div>
  );
}
