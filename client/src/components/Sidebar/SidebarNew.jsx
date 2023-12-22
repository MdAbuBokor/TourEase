import React from 'react';
import { CiMenuBurger } from "react-icons/ci";
import { FaCog, FaHome } from 'react-icons/fa';
import { MdOutlineBedroomChild } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sidebarToggle } from '../../redux/accommodation/accommodationSlice';

function SidebarNew() {
  const dispatch = useDispatch();
  const { currentAccommodation, sidebarOpened } = useSelector(state => state.accommodation);

  return (
    <div className={`left-0  ${sidebarOpened ? "w-64" : "w-fit"} bg-gray-800 text-white h-screen`}>
      <div className="py-4 px-3 md:px-7">
        {/* <div className="">
          <img src={currentAccommodation?.avatar} alt="accomodation_pic" className="rounded-full h-10 w-10 object-cover mx-auto" />
          <p className="text-center mt-2">{currentAccommodation?.name}</p>
        </div> */}
        <div className="">
          <CiMenuBurger onClick={() => dispatch(sidebarToggle())} className='text-3xl ml-1' />
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
          {/* Add more menu items with icons as needed */}
        </ul>
      </div>
    </div>
  );
}

export default SidebarNew;
