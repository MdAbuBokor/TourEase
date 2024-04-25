import { useEffect, useState } from "react";
import { FaBed } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import useFetch from "../../hooks/useFetch.js";
import AddRoom from "./AddRoom.jsx";
import UpdateRoom from "./UpdateRoom.jsx";

export default function RoomsComponent() {
  const { currentAccommodation } = useSelector((state) => state.accommodation);

  const { data, loading, error } = useFetch(
    "/api/accommodation/getRooms/" + currentAccommodation._id
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() )
  );
  const [rooms, setRooms] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [Add, setAdd] = useState(false);
  const [UpdateRoomOpen, setUpdateRoomOpen] = useState(false);
  const [RoomToUpdate, setRoomToUpdate] = useState(null);
  //   console.log(currentAccommodation)
  //   console.log(data);

  useEffect(() => {
    if (data) {
      setRooms(data);
    }
  }, [data,updateSuccess]);

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const option = {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    mode: "single",
    
   
    
    minDate: new Date(Date.now()), // Minimum selectable date is today
    
  };

  //sort rooms by roomNumber

  // const sortedRooms = [...rooms].sort((a, b) => a.roomNumber - b.roomNumber);
  //setRooms(sortedRooms);

  const handleAvailability = async (roomId, isAvailable) => {
    Swal.fire({
      title: "Are you sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, toggole it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `/api/room/updateRoom/${currentAccommodation._id}?roomId=${roomId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ availability: !isAvailable }),
            }
          );
          const data = await res.json();
          //console.log(data)

          if (data.success === false) {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
            return;
          }

          Swal.fire({
            title: "Update!",
            text: "Room has been updated.",
            icon: "success",
          });
          setRooms((prevRooms) =>
            prevRooms.map((room) => {
              if (room._id === roomId) {
                return {
                  ...room,
                  availability: !isAvailable,
                };
              }
              return room;
            })
          );

          //    console.log(data)
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. catch",
            icon: "error",
          });
        }
      }
    });

    // console.log(formData)
  };

  const handleRoomUpdate = (room) => {
    setRoomToUpdate(room);
    setUpdateRoomOpen(true);
  };

  const handleDelete = async (roomId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `/api/room/deleteRoom/${currentAccommodation._id}?roomId=${roomId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(),
            }
          );
          const data = await res.json();
          //console.log(data)

          if (data.success === false) {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
            return;
          }

          Swal.fire({
            title: "Deleted!",
            text: "Room has been deleted.",
            icon: "success",
          });
          setRooms(rooms.filter((room) => room._id !== roomId));

          //    console.log(data)
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. catch",
            icon: "error",
          });
        }
      }
    });

    // console.log(formData)
  };

  return (
    <div className="p-3 ">
       {/* <label className="input input-bordered flex items-center gap-2">
              <span className="min-w-[25%]">Select Date </span>
              <div  className=" p-2 border-l w-full">
                <DateInput
                  options={option}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  handleFormChange={handleChange}

                />
              </div>
            </label> */}
    <div className="stats shadow w-full">
  
    <div className="stat">
      <div className="stat-figure text-primary">
        <MdBedroomParent className="w-8 h-8" />
      </div>
      <div className="stat-title">Total Rooms</div>
      <div className="stat-value text-primary">{rooms.length}</div>
      <div className="stat-desc"></div>
    </div>
    
    <div className="stat">
      <div className="stat-figure text-secondary">
      <FaBed className="w-8 h-8" />
      </div>
      <div className="stat-title">Available Rooms</div>
      <div className="stat-value text-secondary">{rooms.length}</div>
      <div className="stat-desc"></div>
    </div>
    <div className="stat">
      <div className="stat-figure text-secondary">
      <FaBed className="w-8 h-8" />
      </div>
      <div className="stat-title">Boked Rooms</div>
      <div className="stat-value text-error">{rooms.length}</div>
      <div className="stat-desc"></div>
    </div>
    
    
    {/* <div className="stat">
      <div className="stat-figure text-secondary">
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
      </div>
      <div className="stat-value">86%</div>
      <div className="stat-title">Tasks done</div>
      <div className="stat-desc text-secondary">31 tasks remaining</div>
    </div> */}
    
  </div>
      <div className=" border-sky-200 border-2 rounded-lg mt-10 max-w-7xl">
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-primary" onClick={() => setAdd(!Add)}>
          {Add ? "Close" : "Add Room"}
        </button>

        {Add && <AddRoom 
        roomsAlreadyHave={rooms}
        onClose={() => setAdd(false)} />}
        {UpdateRoomOpen && (
          <UpdateRoom
            data={RoomToUpdate}
            onClose={() => setUpdateRoomOpen(false)}
            onUpdate={setUpdateSuccess}

          />
        )}

        <table className="w-full">
          <thead>
            <tr className=" items-center border-y-2">
              <th className="font-bold justify-center border-r-2 p-2 ">
                Room Number
              </th>
              {/* <th className="font-bold justify-center border-r-2 p-2 ">
                Available
              </th> */}
              <th className="font-bold justify-center border-r-2 p-2 ">
                Capacity
              </th>
              <th className="font-bold justify-center border-r-2 p-2 ">
                Price
              </th>
              <th className="font-bold justify-center border-r-2 p-2 ">
                Description
              </th>
              <th className="font-bold justify-center border-r-2 p-2 ">Edit</th>
              <th className="font-bold justify-center border-r-2 p-2 ">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms?.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-xl font-bold p-10">
                  No rooms found
                  <br />
                  <button
                    onClick={() => setAdd(true)}
                    className="bg-sky-400 text-white p-2 rounded-lg"
                  >
                    Add A Room
                  </button>
                </td>
              </tr>
            )}
            {rooms?.map((room, index) => (
              <tr
                key={room._id}
                className={
                  index % 2 === 0
                    ? "bg-base-200 border-b-2"
                    : "bg-base-300 border-b-2"
                }
              >
                <td className="  text-center justify-center border-r-2 p-2 ">
                  {room.roomNumber}
                </td>
                {/* <td
                  onClick={() =>
                    handleAvailability(room._id, room.availability)
                  }
                  className={`cursor-pointer text-center flex justify-center border-r-2 p-2 rounded-lg ${!room.alreadyBooked.includes(selectedDate)
                     ? "btn btn-primary" : "btn btn-error"
                  }`}
                >
                  {!room.alreadyBooked.includes(selectedDate) ? "Available" : "Booked"}
                </td> */}

                <td className=" text-center justify-center border-r-2 p-2 ">
                  {room.capacity}
                </td>
                <td className=" text-center justify-center border-r-2 p-2 ">
                  {room.pricePerNight}
                </td>
                <td className="  text-center justify-center border-r-2 p-2 truncate   max-w-[200px]">
                  {room.description}
                </td>

                <td
                  className="border-b-2 cursor-pointer text-center  btn flex justify-center border-r-2 p-2 btn-primary rounded-lg"
                  onClick={() => handleRoomUpdate(room)}
                >
                  Edit
                </td>

                <td
                  onClick={() => handleDelete(room._id)}
                  className="border-b-2 cursor-pointer text-center justify-center border-r-2 p-2 bg-red-600 rounded-lg"
                >
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
