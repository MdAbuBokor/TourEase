

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { app } from "../firebase.js";

export default function AddRoom({onClose,roomsAlreadyHave}) {


  const [file, setfile] = useState(undefined);
  const fileRef = useRef(null);
  const [filePercent, setfilePercent] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [formData, setformData] = useState({});

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const {currentAccommodation} = useSelector(state=>state.accommodation)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const navigate = useNavigate()


  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload = (file) => {

                // console.log(lastWord)
    const storage = getStorage(app);
    const fileName = file.name + new Date().getTime();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfilePercent(Math.round(progress));
      },

      (error) => {
        setfileUploadError(true);
        setError(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        
          setformData({
            ...formData,
           photo:downloadURL,
          });
         
        
        });
      }
    );
  };






  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setformData({
      ...formData,
      [e.target.id]: value,
    });
  };

 
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);


      // Replace the endpoint and method with your actual API endpoint and method
      const res = await fetch(`/api/room/createRoom/${currentAccommodation._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
     // console.log(JSON.stringify(formData))

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
      setUpdateSuccess(true);
      //navigate('/accommodation'); // Redirect to the accommodations page after successful creation
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  
    Swal.fire({
      title: "Room Added Succesfully!",
      icon: "success"
    });
    onClose()
   
  };

  // const handleImageClick = (e) => {
  //   setImage(e.target.src);
  // };

  return (
    <div className="">
      <div className="p-3 max-w-lg mx-auto bg-white shadow-slate-500 rounded-lg mb-10">
      {/* Images Section */}
     
        <div className="">
          <div className="images lg:h-1/2 rounded-lg shadow-md">
            <div className="active-image mb-2 lg:mb-0">
              <img className="h-full" src={ formData.photo ? formData.photo :  "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg " } alt="" />
              
              <input
                  onChange={(e) => setfile(e.target.files[0])}
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/* "
                />
                <button
                  onClick={() => fileRef.current.click()}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-full"
                >
                  Add Image
                </button>
            </div>

            <p className="text-sm self-center mx-auto justify-center bg-green-500">
                  {fileUploadError ? (
                    <span className="text-red-700">
                      Error Image upload (Note: image must be less than 2 mb)
                    </span>
                  ) : filePercent > 0 && filePercent < 100 ? (
                    <span className=" text-center text-slate-700">{`Uploading ${filePercent}%`}</span>
                  ) : filePercent === 100 ? (
                    <span className="text-green-700 text-center">
                       uploaded successfully !.
                    </span>
                  ) : (
                    ""
                  )}
                </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

        {/* Room Information Section */}
        <div className="">
          <div className="flex justify-center">
           {roomsAlreadyHave?<>
            <p className="text-red-700 text-center">Room Number Already Exist</p>
            {roomsAlreadyHave?.map((room) => (
                  <p key={room._id} className="badge">
                    {room.roomNumber}
                  </p>
                ))}
            </>:null}
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Room Information</h2>
            {/* ... Your room information components ... */}
            <div className="">
              <div>
                <label className="text-gray-600">Room Number:</label>
               
                <input
                  type="text"
                  className="font-semibold border-2 w-full py-1"
                  placeholder="Enter Room Number"
                 
                  id="roomNumber"
                  onChange={handleChange}

                />
              </div>

              {/* <div>
                <label className="text-gray-600">Room Type:</label>
                <input
                  type="text"
                  className="font-semibold border-2 w-full py-1"
                 
                  id="roomType"
                  onChange={handleChange}
                />
              </div> */}
                <div>
                <label className="text-gray-600">Capacity:</label>
                <input
                  type="text"
                  className="font-semibold border-2 w-full py-1"
                placeholder="Enter Room Capacity (eg. 2)"
                  id="capacity"
                  onChange={handleChange}
                />
              </div>


            <div>
                <label className="text-gray-600">Description:</label>
                <textarea
                  type="text"
                  className=" border-2 w-full py-1 "
                  placeholder="Oceanfront bliss awaits. Slide open the glass doors and step onto your private balcony, where the salty breeze carries the rhythmic whisper of waves."
                  id="description"
                  onChange={handleChange}
                />
              </div>

            
              <div>
                <label className="text-gray-600">Price Per Night:</label>
                <input
                  type="text"
                  className="font-semibold border-2 w-full py-1"
                  placeholder="Enter Price Per Night (eg. 1000)"
                  id="pricePerNight"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-gray-600">King Beds Count:</label>
                <input
                  type="number"
                  className="border-2 w-full py-1"
                  placeholder="Enter King Beds Count (eg. 1 or 0)"
                  id="kingBeds"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-gray-600">Queen Beds Count:</label>
                <input
                  type="number"
                  className="border-2 w-full py-1"
                  placeholder="Enter Queen Beds Count (eg. 1 or 0)"
                  id="queenBeds"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-gray-600">Single Beds Count:</label>
                <input
                  type="number"
                  className="border-2 w-full py-1"
                  placeholder="Enter Single Beds Count (eg. 1 or 0)"
                  id="singleBeds"
                  onChange={handleChange}
                />
              </div>


             

              
              <p className="text-gray-600 mt-5 font-bold"> Select Avialable Facilities:</p>
               
              
<div className="grid grid-cols-2 gap-4 mb-5">
<label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="attachedBathroom"  onChange={handleChange}/>
    <span className="label-text font-bold">Attached Bathroom</span>
  </label>
              <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="roomService" onChange={handleChange}/>
    <span className="label-text font-bold">Room Service</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="Tv" onChange={handleChange}/>
    <span className="label-text font-bold">TV</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="balcony" onChange={handleChange}/>
    <span className="label-text font-bold">Balcony</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="freeWifi" onChange={handleChange} />
    <span className="label-text font-bold">Free Wifi</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="cityView" onChange={handleChange} />
    <span className="label-text font-bold">City View</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="oceanView"  onChange={handleChange}/>
    <span className="label-text font-bold">Ocean View</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="forestView" onChange={handleChange} />
    <span className="label-text font-bold">Forest View</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="airCondition" onChange={handleChange}/>
    <span className="label-text font-bold">Air Condition</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="soundProofed"  onChange={handleChange}/>
    <span className="label-text font-bold">Sound Proofed</span>
  </label>
  </div>
              <button onClick={handleSubmit} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full col-span-2">{loading?"Loading...":"Add Room"}</button>
            </div>
          </div>
        </div>
      </form>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      
      </div>
    </div>
  );
}
