import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DateInput from "../components/DateInput";
import Footer from "../components/Footer";
import Header from "../components/Header";

function BookNowForm() {
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 86400000)
  );
  const [formData, setformData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { currentUser, roomToBook } = useSelector((state) => state.user);
  console.log(roomToBook);

  const roomId = useParams().roomId;
  // Replace 'myQueryParam' with your actual query parameter name
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
      checkInDate: selectedDate,
      price: roomToBook.price,
      roomId: roomId,
      userId: currentUser._id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);

      const res = await fetch(`/api/booking/createBooking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate(`/`);

      //    console.log(data)
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const option = {
    dateFormat: "Y-m-d",
    minDate: new Date(Date.now()), // Minimum selectable date is today
    disable: roomToBook.alreadyBooked,
  };

  return (
    <div>
      <Header />
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
        <div className="  max-w-xl mx-auto p-4 ">
          <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img
                src={roomToBook.photo}
                alt="Room photo"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Room Number : {roomToBook.roomNumber}</h2>
              <p>{roomToBook.description}</p>
              <div className="card-actions justify-end">
              
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 bg-base-300 rounded-xl shadow-xl  max-w-xl mx-auto p-4 mt-10">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2">
              <span className="min-w-[25%]">Your Name</span>
              <input
                type="text"
                placeholder="Name "
                className="border-l p-2 w-full  "
                id="name"
                onChange={handleChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <span className="min-w-[25%]">Phone No</span>
              <input
                type="text"
                placeholder="Your Phone No "
                className="border-l p-2 w-full  "
                id="phone"
                onChange={handleChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <span className="min-w-[25%]">Email</span>
              
              <input
                type="email"
                value={currentUser.email}
                defaultValue={currentUser.email}
                placeholder="email "
                className=" p-2 border-l w-full  "
                id="email"
                onChange={handleChange}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <span className="min-w-[25%]">Select Date </span>
              <div className=" p-2 border-l w-full">
                <DateInput
                  options={option}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <span className="min-w-[25%]">Price</span>
              <div className=" p-2 border-l w-full">
                <p>{roomToBook.pricePerNight}</p>
              </div>
            </label>

            <button
              disabled={loading}
              className="border p-3 rounded-lg  bg-slate-700 text-white hover:font-semibold disabled:opacity-80 uppercase hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "loading..." : "Book"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BookNowForm;
