import React from 'react';
import { CiMenuBurger } from "react-icons/ci";
import { FaCog, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineBedroomChild } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { sidebarToggle, signOutFailure, signOutStart, signOutSuccess } from '../../redux/accommodation/accommodationSlice';

function SidebarNew() {
  const dispatch = useDispatch();
  const { currentAccommodation, sidebarOpened } = useSelector(state => state.accommodation);

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
          const res =await fetch(`/api/accommodation/signOutAccommodation`,{
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
       
      //    console.log(data)
          
        }
        catch (error) {
            dispatch(signOutFailure(error.message));
          
        }
        Swal.fire({
          title: "SignOut!",
          icon: "success"
        });
      }
    });

    // console.log(formData)
     
   }

  return (
    <div className={`left-0  ${sidebarOpened ? "w-32 md:w-64" : "w-fit"} bg-gray-800 text-white h-screen`}>
      <div className="py-4 px-3 md:px-7">
        {/* <div className="">
          <img src={currentAccommodation?.avatar} alt="accomodation_pic" className="rounded-full h-10 w-10 object-cover mx-auto" />
          <p className="text-center mt-2">{currentAccommodation?.name}</p>
        </div> */}
        <div className="">
          <CiMenuBurger onClick={() => dispatch(sidebarToggle())} className='text-3xl ml-1 cursor-pointer' />
        </div>
        <ul className="list-none">
          <li className="flex items-center border-b-4 border-sky-800">
            <Link to="/accommodation" className="text-white hover:bg-gray-700 rounded-md p-2 flex items-center">
              <FaHome className="mr-2" />
              {sidebarOpened && <span className="ml-2">Home</span>}
            </Link>
          </li>
          <li className="flex items-center border-b-4 border-sky-800">
            <Link to="/accommodation/rooms" className="text-white hover:bg-gray-700 rounded-md p-2 flex items-center">
              <MdOutlineBedroomChild className="mr-2" />
              {sidebarOpened && <span className="ml-2">Rooms</span>}
            </Link>
          </li>
          <li className="flex items-center border-b-4 border-sky-800">
            <Link to="/settings" className="text-white hover:bg-gray-700 rounded-md p-2 flex items-center">
              <FaCog className="mr-2" />
              {sidebarOpened && <span>Settings</span>}
            </Link>
          </li>
          <li className="flex items-center border-b-4 border-sky-800">
            <Link to="/accommodation/update" className="text-white hover:bg-gray-700 rounded-md p-2 flex items-center">
              <FaCog className="mr-2" />
              {sidebarOpened && <span>Update</span>}
            </Link>
          </li>
          <li className="flex items-center border-b-4 border-sky-800 hover:bg-red-950 bg-red-500">
            <button onClick={handleSignOut} className="text-white  rounded-md p-2 flex items-center">
              <FaSignOutAlt className="mr-2" />
              {sidebarOpened && <span>SignOut</span>}
            </button>
          </li>

          
          {/* Add more menu items with icons as needed */}
        </ul>
      </div>
    </div>
  );
}

export default SidebarNew;
