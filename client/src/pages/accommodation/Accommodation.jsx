import React from 'react';
import HeaderAccomodation from '../../components/Header.accommodation';
import RoomsComponent from '../../components/RoomsComponent';
import SidebarNew from '../../components/Sidebar/SidebarNew';
import SingleRoomShow from '../../components/SingleRoomShow';

function Accommodation() {
  const roomExample = {
    _id: "6586e02f3a8d8a651c0a7a48",
    roomNumber: "101",
    accommodation: "5fd8a92c8b11a22c9c7e3a1a", 
    roomType: "Standard",
    capacity: 2,
    pricePerNight: 100,
    description: "A cozy room with a beautiful view",
    availability: true,
    facilities: ["Wi-Fi", "TV", "Air Conditioning"],
    bedType: "Queen",
    image: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    image1: "https://images.unsplash.com/photo-1528822941046-3b5513fd5253",
    image2: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
    image3: "https://images.unsplash.com/photo-1559847844-531569f7a647",
    image4: "https://images.unsplash.com/photo-1581654668499-94ec59243b53",
    image5: "https://images.unsplash.com/photo-1502673530728-4c5071653136",
    image6: "https://images.unsplash.com/photo-1502673530728-4c5071653136"
  };
  return (
    <div className="flex h-screen justify-center">
      <SidebarNew />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAccomodation />
        <div className="flex-1 overflow-y-auto p-4 justify-centeritems-center ">
        <p>Accomodation Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quod facere eaque repudiandae dolorum inventore corrupti labore voluptatibus quae deserunt aliquid harum tempore, a sint ad est iste similique minima.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam debitis ut maxime ratione numquam excepturi, eum, aspernatur, iusto tempora quam id quis iste cumque amet earum culpa blanditiis possimus tenetur. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia illo facere laboriosam? Officiis alias voluptates quaerat! Iusto, sapiente adipisci numquam explicabo asperiores facilis repellendus molestias voluptatum. Quos fuga voluptatem voluptate! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod similique ea ipsa ut voluptatem? Fuga rerum tempora sed voluptatum hic. Nam sed qui veritatis fugiat, quia suscipit quas sunt obcaecati!</p>
        <RoomsComponent />
        <SingleRoomShow roomId="6586e02f3a8d8a651c0a7a48"/>
       
       

        </div>
      </div>
    </div>
  );
}

export default Accommodation;
