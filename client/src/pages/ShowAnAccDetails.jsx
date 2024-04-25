import React, { useEffect, useState } from "react";
import {
  FaBiking,
  FaCoffee,
  FaHandsWash,
  FaParking,
  FaPhone,
  FaShoppingBag,
  FaSwimmingPool,
  FaWifi,
  FaWineGlassAlt,
} from "react-icons/fa";
import { FaLocationDot, FaSpa } from "react-icons/fa6";
import { IoIosRestaurant } from "react-icons/io";
import {
  MdEmail,
  MdMovieFilter,
  MdOutlineSportsGymnastics,
} from "react-icons/md";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RoomsBoard from "../components/RoomsBoard";
import ShowReviews from "../components/ShowReviews";

function ShowAnAccDetails() {
  const { accId } = useParams();

  const [acc, setAcc] = useState({});
  const { data, loading, error } = useFetch(
    `/api/accommodation/getAccommodation/${accId}`
  );

  useEffect(() => {
    if (data) setAcc(data);
  }, [data]);

  return (
    <div className="">
      <Header />
      <div className=" justify-center   grid px-5 lg:px-20">
        <div className="">
          <img
            src={acc.avatar}
            alt=""
            className="min-w-[100%] max-h-[50vh] object-cover"
          />
        </div>

        <div className="p-5">
          <p className="text-2xl font-bold">
            {acc.name}
            <span className="text-sm badge badge-info font-semibold ml-5">
              {acc.type}
            </span>
          </p>

          {/* <p className='font-semibold ml-5'>{acc.title}</p> */}
          <p className="text-slate-500 flex">
            <FaLocationDot className="mr-2 mt-1" />
            <span>{acc.location_details}</span>
          </p>

          <p className="text-slate-500 flex">
            <FaPhone className="mr-2 mt-1" />
            <span>{acc.phone}</span>
          </p>

          <p className="text-slate-500 flex">
            <MdEmail className="mr-2 mt-1" />
            <span>{acc.email}</span>
          </p>

          <p className="mt-5 font-bold">About This Accommodation: </p>
          <p className="">{acc.description}</p>

          <p className="mt-5 font-bold">Popular Amentities: </p>
          <div className="grid grid-cols-3 gap-3">
            <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
              <MdOutlineSportsGymnastics className="mr-2" />
              <span className="label-text font-bold">Gym</span>
            </label>
            <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
              <FaSpa className="mr-2" />
              <span className="label-text font-bold">Spa</span>
            </label>
            <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
              <FaWineGlassAlt className="mr-2" />
              <span className="label-text font-bold">Bar</span>
            </label>
            <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
              <FaHandsWash className="mr-2" />
              <span className="label-text font-bold">Laundry</span>
            </label>
            <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
              <IoIosRestaurant className="mr-2" />

              <span className="label-text font-bold">Restaurant</span>
            </label>
            <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
              <FaShoppingBag className="mr-2" />
              <span className="label-text font-bold">Shopping</span>
            </label>
            <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
              <FaParking className="mr-2" />

              <span className="label-text font-bold">Free Parking</span>
            </label>
            <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
              <FaBiking className="mr-2" />

              <span className="label-text font-bold">Bike Rental</span>
            </label>
            <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
              <FaWifi className="mr-2" />
              <span className="label-text font-bold">Free Wifi</span>
            </label>
            <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
              <MdMovieFilter className="mr-2" />

              <span className="label-text font-bold">Movie Nights</span>
            </label>
            <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
              <FaSwimmingPool className="mr-2" />

              <span className="label-text font-bold">Swimming Pool</span>
            </label>
            <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
              <FaCoffee className="mr-2" />

              <span className="label-text font-bold">Coffee Shop</span>
            </label>
          </div>
          <p className='mt-5 font-bold'>Hotel Reviews By: </p>
          <div className="">
        <ShowReviews accommodationId={acc._id} />
      </div>
        </div>
      </div>
     
      <div className="">
        <div className="p-5">
          <RoomsBoard acc={acc} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ShowAnAccDetails;
