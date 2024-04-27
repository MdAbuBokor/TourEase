import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function PrivateRoute() {
    const {currentUser} = useSelector(state=>state.user)
    currentUser==null?(
      Swal.fire({
        title: "Error!",
        text: "Login First",
        icon: "error",
        confirmButtonText: "Ok",
      })
    ):null
    
  return (
  
    
   currentUser? <Outlet/> :  <Navigate to='/signin' />
  )
}
