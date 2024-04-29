import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { app } from "../firebase.js";

export default function UpdateRoom({data,onClose,onUpdate}) {


  const [file, setfile] = useState(undefined);
  const fileRef = useRef(null);
  const [filePercent, setfilePercent] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [formData, setformData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const {currentAccommodation} = useSelector(state=>state.accommodation)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  
const navigate = useNavigate();


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
     console.log(formData)
    try {
        setLoading(true)
        
      
      const res = await fetch(`/api/room/updateRoom/${currentAccommodation._id}?roomId=${data._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data1 = await res.json();
      if (data1.success === false) {
       setError(data1.message)
       setLoading(false)
        return;
      }

     setLoading(false)
     setError(null)
     

      //    console.log(data)
    } catch (er) {
       // console.log(er.message)
      setError(er.message)
      setLoading(false)
    }
    Swal.fire({
      title: "Updated Succesfully!",
      icon: "success",
      timer: 1000,
    });
    onClose()
   // console.log("ssss")
   onUpdate(true);
  };

  const handleImageClick = (e) => {
    setImage(e.target.src);
  };

  return (
    <div className=" bg-black bg-opacity-70 h-full w-full z-10 absolute top-0 left-0">
      <div className="p-3 max-w-lg mx-auto relative bg-white shadow-slate-500 rounded-lg">
      {/* Images Section */}
     
        <div className="">
          <div className="images lg:h-1/2 rounded-lg shadow-md">
            <div className="active-image mb-2 lg:mb-0">
              <img className="h-full" src={ formData.photo || data.photo } alt="" />
              
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
                  Change Image
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

        <form onSubmit={handleSubmit}> <div className="">
         
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
                  defaultValue={data.roomNumber}
                 
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
                defaultValue={data.capacity}
                  id="capacity"
                  onChange={handleChange}
                />
              </div>


            <div>
                <label className="text-gray-600">Description:</label>
                <textarea
                  type="text"
                  className=" border-2 w-full py-1 "
                  defaultValue={data.description}
                  id="description"
                  onChange={handleChange}
                />
              </div>

            
              <div>
                <label className="text-gray-600">Price Per Night:</label>
                <input
                  type="text"
                  className="font-semibold border-2 w-full py-1"
               defaultValue={data.pricePerNight}
                  id="pricePerNight"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-gray-600">King Beds Count:</label>
                <input
                  type="number"
                  className="border-2 w-full py-1"
                  defaultValue={data.kingBeds}
                  id="kingBeds"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-gray-600">Queen Beds Count:</label>
                <input
                  type="number"
                  className="border-2 w-full py-1"
                  defaultValue={data.queenBeds}
                  id="queenBeds"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-gray-600">Single Beds Count:</label>
                <input
                  type="number"
                  className="border-2 w-full py-1"
                  defaultValue={data.singleBeds}
                  id="singleBeds"
                  onChange={handleChange}
                />
              </div>


             

              
              <p className="text-gray-600 mt-5 font-bold"> Select Avialable Facilities:</p>
               
              
<div className="grid grid-cols-2 gap-4 mb-5">
<label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="attachedBathroom" defaultChecked={data.attachedBathroom}  onChange={handleChange}/>
    <span className="label-text font-bold">Attached Bathroom</span>
  </label>
              <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="roomService" defaultChecked={data.roomService} onChange={handleChange}/>
    <span className="label-text font-bold">Room Service</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="Tv" defaultChecked={data.Tv} onChange={handleChange}/>
    <span className="label-text font-bold">TV</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="balcony" defaultChecked={data.balcony} onChange={handleChange}/>
    <span className="label-text font-bold">Balcony</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="freeWifi" defaultChecked={data.freeWifi} onChange={handleChange} />
    <span className="label-text font-bold">Free Wifi</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="cityView" defaultChecked={data.cityView} onChange={handleChange} />
    <span className="label-text font-bold">City View</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="oceanView" defaultChecked={data.oceanView}  onChange={handleChange}/>
    <span className="label-text font-bold">Ocean View</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="forestView" defaultChecked={data.forestView} onChange={handleChange} />
    <span className="label-text font-bold">Forest View</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="airCondition" defaultChecked={data.airCondition} onChange={handleChange}/>
    <span className="label-text font-bold">Air Condition</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="soundProofed" defaultChecked={data.soundProofed}  onChange={handleChange}/>
    <span className="label-text font-bold">Sound Proofed</span>
  </label>
  </div>
              <button onClick={handleSubmit} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full col-span-2">{loading?"Loading...":"Update Room"}</button>
            </div>
          </div>
        </div>

      </form>
      <button
  onClick={onClose}
  className="bg-red-500 text-white px-4 py-2 rounded-lg absolute top-0 right-0"
>
  Close
</button>


      </div>

    </div>
  );
}
