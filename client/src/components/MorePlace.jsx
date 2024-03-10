import React from 'react';
import { Link } from 'react-router-dom';
import places from "../assets/constant/places.json";

function MorePlace() {
  return (
    <>
    <div className="text-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Select Other places too </h1>

    </div>
  
    <div className="grid grid-cols-1 gap-4">
      {places.map((place, index) => (
          <Link to={`/place/${place["place-name"]}`}  key={index}>
        <div
         
          className="bg-[#000000] m-2 rounded-lg bg-cover bg-center min-h-[20vh] max-h-[20vh]"
          style={{ backgroundImage: `url(${place["place-img"]})` }}
        >
          <div className="bg-black rounded-lg bg-opacity-40min-h-[20vh] max-h-[20vh] relative">
            <div className="flex flex-col items-center justify-center absolute right-4  glass">
              <h1 className=" text-2xl font-bold text-white">{place["place-name"]}</h1>
            </div>
           
          </div>
        </div>
        </Link>


        
      ))}
    </div>
  </>
  )
}

export default MorePlace