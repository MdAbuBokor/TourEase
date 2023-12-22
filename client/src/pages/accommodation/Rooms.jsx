import React from 'react';
import HeaderAccomodation from '../../components/Header.accommodation';
import SidebarNew from '../../components/Sidebar/SidebarNew';

function Rooms() {
  return (
    <div>
      <HeaderAccomodation />

      <div className="flex">
     
       <SidebarNew />
        <div className="flex-1 p-3">
          <h1>Rooms Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt delectus dolores qui soluta possimus accusantium omnis magni, iste exercitationem explicabo quidem placeat cum, maxime repellat molestias consequatur accusamus voluptas est.</h1>
        </div>

        </div>
     
    </div>
  );
}

export default Rooms;
