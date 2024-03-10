import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { roomSelction } from "../redux/user/userSlice";

function RoomsBoard({ acc }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch =useDispatch();
  const navigate = useNavigate(); // Import useNavigate hook

  const [rooms, setRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `/api/accommodation/getRooms/${acc._id}`
  );

  useEffect(() => {
    if (data) {
      setRooms(data);
    }
  }, [data]);

  const handleBookButton = (roomId,room) => { // Pass roomId as argument
  dispatch(roomSelction(room));
    navigate(`/bookform/${roomId}`); // Use navigate with room ID parameter
  };

  return (
    <div className="bg-slate-300 border-4 border-gray-500  p-4 shadow-2xl ">
      <div className="mx-auto text-center">
        <p className="text-xl font-semibold">
          Total Rooms in {acc.name}: {rooms.length}
        </p>
      </div>
      <div className="xl:grid xl:grid-cols-2 gap-2">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="lg:grid lg:grid-cols-2 mb-4 border-2 border-gray-500 shadow-black shadow-lg bg-white rounded-lg"
          >
            <div className="w-full h-60 justify-center overflow-hidden">
              <img src={room.photo} alt="room photo" />
            </div>
            <div className="p-5">
              <table className=" border-2 border-gray-500 w-full">
                <tr className="border-2 border-gray-300 bg-green-600">
                  <td>Room Number: </td>
                  <td className="text-white font-semibold text-2xl">
                    {room.roomNumber}
                  </td>
                </tr>
                <tr>
                  <td>Room Type: </td>
                  <td>{room.roomType}</td>
                </tr>
                <tr className="border-2 border-gray-300 bg-green-600">
                  <td>Capacity: </td>
                  <td className="text-white font-semibold text-2xl">
                    {room.capacity}
                  </td>
                </tr>
                <tr>
                  <td>Bed Type: </td>
                  <td>{room.bedType}</td>
                </tr>
                <tr className="border-2 border-gray-300 bg-green-600">
                  <td>Price Per Night: </td>
                  <td className="text-white font-semibold text-2xl">
                    {room.pricePerNight}
                  </td>
                </tr>
              </table>
              {currentUser ? (
                <div className="">
                  <button
                    onClick={() => handleBookButton(room._id,room)} // Pass room ID
                    className="btn btn-primary"
                  >
                    Book
                  </button>
                </div>
              ) : (
                <button className="bg-slate-700 font-bold text-white p-3 rounded-lg uppercase hover:opacity-80 hover:font-semibold w-full">
                  <Link to="/signin">Login for Book Now</Link>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomsBoard;