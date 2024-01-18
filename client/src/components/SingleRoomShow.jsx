import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function SingleRoomShow({ roomId }) {
  const { data, loading, error } = useFetch(`/api/room/getRoom/${roomId}`);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Set the image once data is available
    if (data) {
      setImage(data.image);
    }
  }, [data]);

  const getimage = () => {
    if (data) {
      return image;
    }
  };
 // console.log(data)

  const handleImageClick = (e) => {
    setImage(e.target.src);
  };

  return (
    <div className="lg:flex lg:items-center lg:justify-between">
    {/* Images Section */}
    <div className="rounded-lg shadow-md lg:w-1/2">
      <div className="images lg:h-1/2 rounded-lg shadow-md">
        <div className="active-image mb-2 lg:mb-0">
          <img className="w-full h-full object-cover" src={image} alt="" />
        </div>

      </div>
    </div>
  
    {/* Room Information Section */}
    <div className="lg:w-1/2 lg:ml-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Room Information</h2>
        {/* ... Your room information components ... */}
        <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Room Number:</p>
                <p className="font-semibold">{data.roomNumber}</p>
              </div>
  
              <div>
                <p className="text-gray-600">Room Type:</p>
                <p className="font-semibold">{data.roomType}</p>
              </div>
  
              <div>
                <p className="text-gray-600">Capacity:</p>
                <p className="font-semibold">{data.capacity}</p>
              </div>
  
              <div>
                <p className="text-gray-600">Price Per Night:</p>
                <p className="font-semibold">{data.pricePerNight}</p>
              </div>
  
              <div>
                <p className="text-gray-600">Description:</p>
                <p className="font-semibold">{data.description}</p>
              </div>
  
              <div>
                <p className="text-gray-600">Availability:</p>
                <p
                  className={`font-semibold ${
                    data.availability ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {data.availability ? "Available" : "Not Available"}
                </p>
              </div>
  
              {/* <div>
          <p className="text-gray-600">Facilities:</p>
          <ul className="list-disc pl-4">
          {data.facilities.map((facility, index) => (
              <li key={index} className="font-semibold">
              {facility}
              </li>
              ))}
              </ul>
          </div> */}
  
              <div>
                <p className="text-gray-600">Bed Type:</p>
                <p className="font-semibold">{data.bedType}</p>
              </div>
            </div>
      </div>
    </div>


  </div>
  );
}



