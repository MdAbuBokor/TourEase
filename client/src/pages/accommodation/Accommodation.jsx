import React from 'react';
import HeaderAccomodation from '../../components/Header.accommodation';
import RoomsComponent from '../../components/RoomsComponent';
import SidebarNew from '../../components/Sidebar/SidebarNew';

function Accommodation() {
  return (
    <div className="flex h-screen justify-center">
      <SidebarNew />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAccomodation />
        <div className="flex-1 overflow-y-auto p-4 ">
        <p>Accomodation Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quod facere eaque repudiandae dolorum inventore corrupti labore voluptatibus quae deserunt aliquid harum tempore, a sint ad est iste similique minima.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam debitis ut maxime ratione numquam excepturi, eum, aspernatur, iusto tempora quam id quis iste cumque amet earum culpa blanditiis possimus tenetur. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia illo facere laboriosam? Officiis alias voluptates quaerat! Iusto, sapiente adipisci numquam explicabo asperiores facilis repellendus molestias voluptatum. Quos fuga voluptatem voluptate! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod similique ea ipsa ut voluptatem? Fuga rerum tempora sed voluptatum hic. Nam sed qui veritatis fugiat, quia suscipit quas sunt obcaecati!</p>
        <RoomsComponent />
       

        </div>
      </div>
    </div>
  );
}

export default Accommodation;
