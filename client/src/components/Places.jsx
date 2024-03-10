import React from 'react';
import { Link } from 'react-router-dom';
import places from "../assets/constant/places.json";

function Places() {
  return (
    <>
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold mb-4">Select Your Next Tour Place</h1>
        <p className="text-lg text-gray-600">Explore our amazing destinations</p>
      </div>
    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {places.map((place, index) => (
            <Link to={`/place/${place["place-name"]}`}  key={index}>
          <div
           
            className="bg-[#000000] m-2 rounded-lg bg-cover bg-center min-h-[50vh]"
            style={{ backgroundImage: `url(${place["place-img"]})` }}
          >
            <div className="bg-black rounded-lg bg-opacity-40 min-h-[50vh] relative">
              <div className="flex flex-col items-center justify-center absolute right-4 bottom-5">
                <h1 className="lg:text-6xl text-4xl font-bold text-white">{place["place-name"]}</h1>
              </div>
             
            </div>
          </div>
          </Link>


          
        ))}
      </div>
    </>
  );
}

export default Places;
