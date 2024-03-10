import React from "react";
import { useNavigate } from "react-router-dom";

function ShowAccommodationInBoard({ acc }) {
    //console.log(acc)
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/acc/${acc._id}`); // Use template literals to create dynamic path
    };
    

  return (
   
    <div onClick={handleClick} className="cursor-pointer flex flex-col border-2 shadow-xl mb-4 rounded-lg hover:bg-slate-700">
      <div className="flex flex-row">
        <img src={acc.avatar} alt="accommodation" width="300" height="300" />

        <div className="pl-5">
          <div className="">
            <h1 className="text-3xl justify-center mx-auto font-semibold ">
              {acc.name}
            </h1>
            {/* <h3 className="ml-10">
                {acc.title}
            </h3> */}
            <p className="my-1 px-1 rounded-lg font-medium ">Number of Rooms: {acc.rooms.length}</p>
            <p className="px-1 rounded-lg font-medium  mb-1">Ratings: {acc.rating}</p>
            <p className="px-1 rounded-lg font-medium ">Lowest Price: <span className="text-lg font-bold">1000</span></p>
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default ShowAccommodationInBoard;
