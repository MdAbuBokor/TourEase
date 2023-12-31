import React from 'react';
import HeaderAccomodation from '../../components/Header.accommodation';
import RoomsComponent from '../../components/RoomsComponent';
import SidebarNew from '../../components/Sidebar/SidebarNew';


function Rooms() {
  return (
    <div className="flex h-screen ">
      <SidebarNew />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAccomodation />
        <div className="flex-1 overflow-y-auto p-4">
         <RoomsComponent />
        <div className="">

        </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
