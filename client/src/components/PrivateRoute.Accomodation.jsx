import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.js';

export default function PrivateRouteAccomodation() {
    const {currentUser} = useSelector(state=>state.user)
    const { data, loading, error } = useFetch(currentUser ? `/api/user/getuser/${currentUser._id}` : '');

    
  if (loading) {
    // Optionally, you can render a loading indicator here
    return (
        <div className='center mx-auto my-auto'>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <AtomicSpinner />
          </div>
        </div>
      );
      
  }

  if (error) {
    // Handle the error condition
    return <div>Error loading data</div>;
  }

  // Ensure data.accomodation is not undefined before checking its value
  const hasAccommodation = data && data.accomodation;
  console.log(data)


  return (
  
    
   hasAccommodation? <Outlet/> :  <Navigate to='/createAccomodation' />
  )
}
