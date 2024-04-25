import React from 'react';
import AcBookingsTab from '../../components/AcBookingTab';
import HeaderAccomodation from '../../components/Header.accommodation';
import SidebarNew from '../../components/Sidebar/SidebarNew';

function AcBookings() {
  return (
    <div className="flex h-screen justify-center">
      <SidebarNew />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAccomodation />
        <div className="flex-1 overflow-y-auto p-4 justify-center items-center ">
          <AcBookingsTab />
          

           </div>
      </div>
    </div>
  );
}

export default AcBookings