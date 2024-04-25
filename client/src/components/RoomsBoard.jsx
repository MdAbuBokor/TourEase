import React, { useEffect, useState } from "react";
import { FaBed, FaRestroom, FaToilet, FaTv, FaVolumeMute, FaWifi } from "react-icons/fa";
import { FaEarthOceania, FaPeopleGroup } from "react-icons/fa6";
import { MdBalcony, MdForest } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { roomSelction } from "../redux/user/userSlice";

function RoomsBoard({ acc }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Import useNavigate hook
  console.log(acc._id)

  const [rooms, setRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `/api/accommodation/getRooms/${acc._id}`
  );

  useEffect(() => {
    if (data) {
      setRooms(data);
    }
  }, [data]);

  const handleBookButton = (roomId, room) => { // Pass roomId as argument
    dispatch(roomSelction(room));
    navigate(`/bookform/${roomId}`); // Use navigate with room ID parameter
  };

  return (
    <div className="  p-4 shadow-2xl mx-auto">
      <div className="">
        <p className=" font-bold">
          Total Rooms in {acc.name}: {rooms.length}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-10 lg:grid-cols-3 xl:grid-cols-3 gap-2 mx-auto">
        {rooms.map((room) => (
          // <div
          //   key={room._id}
          //   className="lg:grid lg:grid-cols-2 mb-4 border-2 border-gray-500 shadow-black shadow-lg bg-white rounded-lg"
          // >
          //   <div className="w-full h-60 justify-center overflow-hidden">
          //     <img src={room.photo} alt="room photo" />
          //   </div>
          //   <div className="p-5">
          //     <table className="border-2 border-gray-500 w-full">
          //       <thead>
          //         <tr className="border-2 border-gray-300 bg-green-600">
          //           <th>Room Number</th>
          //           <th>Room Type</th>
          //           <th>Capacity</th>
          //           <th>Bed Type</th>
          //           <th>Price Per Night</th>
          //         </tr>
          //       </thead>
          //       <tbody>
          //         <tr>
          //           <td className="font-semibold text-2xl">{room.roomNumber}</td>
          //           <td>{room.roomType}</td>
          //           <td className="font-semibold text-2xl">{room.capacity}</td>
          //           <td>{room.bedType}</td>
          //           <td className="font-semibold text-2xl">{room.pricePerNight}</td>
          //         </tr>
          //       </tbody>
          //     </table>
          //     {/* ... rest of the code remains the same ... */}
          //   </div>
          // </div>
          <div key={room._id} className="card w-96 bg-base-100 shadow-xl mx-auto">
            <figure>
              <img
                src={room.photo}
                alt="Room_pic"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Room No: {room.roomNumber}</h2>
              <p>Room Informatin:</p>
              <div className="grid grid-cols-2 gap-4">
                <p className="flex gap-4 border px-2"><FaBed className="mt-1"/>Total beds:  {room.queenBeds+room.kingBeds+room.singleBeds}</p>

                {room.kingBeds > 0 && <p className="flex gap-4 border px-2"><FaBed className="mt-1"/>King beds:  {room.kingBeds}</p>}

                {room.queenBeds > 0 && <p className="flex gap-4 border px-2"><FaBed className="mt-1"/>Queen beds:  {room.queenBeds}</p>}

                {room.singleBeds > 0 && <p className="flex gap-4 border px-2"><FaBed className="mt-1"/>Single beds:  {room.singleBeds}</p>}

                {/* {room.pricePerNight > 0 && <p className="flex gap-4 border px-2"><FaBed className="mt-1"/>Price:  {room.pricePerNight}</p>} */}

                {room.capacity > 0 && <p className="flex gap-4 border px-2"><FaPeopleGroup className="mt-1"/>Capacity:  {room.capacity}</p>}

                {room.attachedBathroom ? (
  <p className="flex gap-4 border px-2">
    <FaToilet className="mt-1" /> Attached Bathroom
  </p>
) : (
  <p className="flex gap-4 border px-2">
    <FaToilet className="mt-1" /> No Attached Bathroom
  </p>
)}

{room.airCondition ? (
  <p className="flex gap-4 border px-2">
    <TbAirConditioning  className="mt-1" /> Air Condition
  </p>
) : (
 null
)}

{room.roomService ? (
  <p className="flex gap-4 border px-2">
    <FaRestroom className="mt-1" /> Room Service Avaialble
  </p>
) : (
 null
)}

{room.Tv ? (
  <p className="flex gap-4 border px-2">
    <FaTv className="mt-1" /> TV
  </p>
) : (
 null
)}

{room.balcony ? (
  <p className="flex gap-4 border px-2">
    <MdBalcony className="mt-1" /> Balcony
  </p>
) : (
 null
)}

{room.freeWifi ? (
  <p className="flex gap-4 border px-2">
    <FaWifi className="mt-1" /> Free Wifi
  </p>
) : (
 null
)}

{room.oceanView ? (
  <p className="flex gap-4 border px-2">
    <FaEarthOceania className="mt-1" /> Ocean View
  </p>
) : (
 null
)}
{room.cityView ? (
  <p className="flex gap-4 border px-2">
    <FaWifi className="mt-1" /> City View
  </p>
) : (
 null
)}
{room.forestView ? (
  <p className="flex gap-4 border px-2">
    <MdForest className="mt-1" /> Forest View
  </p>
) : (
 null
)}
{room.soundProofed ? (
  <p className="flex gap-4 border px-2">
    <FaVolumeMute className="mt-1" /> Sound Proofed
  </p>
) : (
 null)}

                

              </div>
              
          
            
              <div className="card-actions justify-center mt-3">
                <button onClick={() => handleBookButton(room._id, room)} className="btn btn-primary">More Info and Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomsBoard;
