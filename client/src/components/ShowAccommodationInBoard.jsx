import React, { useEffect, useState } from "react";
import { MdHotel, MdLocationPin, MdReviews } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function ShowAccommodationInBoard({ acc }) {
    //console.log(acc)
    const [avgRating,setAvgRating] = useState(5);
    const {data} = useFetch(`/api/review/getAvgRatingOfAcc/${acc._id}`);

    useEffect(() => {
        setAvgRating(data.avgRating || 5);
    }, [data]);


    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/acc/${acc._id}`); // Use template literals to create dynamic path
    };
    

  return (
   
    // <div onClick={handleClick} className="cursor-pointer flex flex-col border-2 shadow-xl mb-4 rounded-lg hover:bg-slate-700">
    //   <div className="flex flex-row">
    //     <img src={acc.avatar} alt="accommodation" width="300" height="300" />

    //     <div className="pl-5">
    //       <div className="">
    //         <h1 className="text-3xl justify-center mx-auto font-semibold ">
    //           {acc.name}
    //         </h1>
    //         {/* <h3 className="ml-10">
    //             {acc.title}
    //         </h3> */}
    //         <p className="my-1 px-1 rounded-lg font-medium ">Number of Rooms: {acc.rooms.length}</p>
    //         <p className="px-1 rounded-lg font-medium  mb-1">Ratings: {acc.rating}</p>
    //         <p className="px-1 rounded-lg font-medium ">Lowest Price: <span className="text-lg font-bold">1000</span></p>
    //       </div>
    //     </div>
    //   </div>
    // </div>




     <div className="card w-[700px] bg-base-100 border shadow-xl mx-auto flex flex-row ">
     <figure className="w-[350px]">
       <img
         src={acc.avatar}
         alt="AccommodationPic"
       />
     </figure>
     <div className="card-body">
       <h2 className="card-title">{acc.name}</h2>
       <div className="flex gap-4  rounded p-2">
        <MdHotel className="text-2xl"/> Room Available: {acc.rooms.length}
       </div>
       <div className="flex flex-row gap-4  rounded p-2">
        <MdReviews className="text-2xl"/> 
        <p>Avg Rating :     {avgRating}</p>
       </div>
       <div className="flex flex-row gap-4  rounded p-2">
        <MdLocationPin className="text-2xl"/> 
        <p>     {acc.location_details}</p>
       </div>

       
    
    
    
       <div className="card-actions justify-end">
         <button onClick={() => handleClick()} className="btn btn-primary">See Deatils</button>
       </div>
     </div>
   </div>
  
  );
}

export default ShowAccommodationInBoard;
