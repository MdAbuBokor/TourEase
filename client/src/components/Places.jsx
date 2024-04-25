import React from 'react';
import { Link } from 'react-router-dom';
import places from "../assets/constant/places.json";

function Places() {
  return (
    <div className=''>
      <div className="text-center mt-8 mx-auto">
        <h1 className="text-4xl font-bold mb-4">Select Your Next Tour Place</h1>
        <p className="text-lg text-gray-600">Explore our amazing destinations</p>
      </div>
    
      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto">
        {places.map((place, index) => (
        

<div key={index} className="card card-compact w-96  bg-base-100 shadow-xl mx-auto">
<figure><img src={place["place-img"]} alt="Place_image" /></figure>
<div className="card-body">
  <h2 className="card-title font-bold ">{place["place-name"]}</h2>
  <p className=' font-semibold'>{place["description"]}</p>
  <div className="card-actions justify-end">
    <Link to={`/place/${place["place-name"]}`}>
    <button className="btn btn-primary">Explore </button>
    </Link>
  </div>
</div>
</div>


          
        ))}
      </div>
    </div>
  );
}

export default Places;
