import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRouteAccommodation() {
    const currentAccommodation = useSelector(state => state.accommodation.currentAccommodation);
  return (
  
    
   currentAccommodation? <Outlet/> :  <Navigate to='/accommodation/signin' />
  )
}
