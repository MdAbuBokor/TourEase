
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const AddRoom = ({onClose}) => {
//   const [formData, setFormData] = useState({});

//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { currentAccommodation } = useSelector((state) => state.accommodation);

 


  

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };









 


//   return (


      
//     <div className="bg-black bg-opacity-70 h-full w-full z-10 absolute top-0 left-0">
      
   
//     <div className='p-3 max-w-lg mx-auto bg-white shadow-slate-500 rounded-lg'>
//     <button
//          className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 hover:font-semibold disabled:opacity-80 right-0'
//          onClick={onClose}
        
//         >
//           Close
//         </button>
     

//       <h1 className='text-3xl text-center font-semibold my-7'>Add New Room</h1>

//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
     

//         <label htmlFor="roomNumber">Room Number:</label>
//         <input type="number" placeholder='Room Number' className='border p-3 rounded-lg' id='roomNumber' onChange={handleChange} />
//         <label htmlFor="roomType">Room Type:</label>
//         <select placeholder='Room Type' className='border p-3 rounded-lg' id='roomType' onChange={handleChange}>
//         <option  value="singleRoom">Single Room</option>
//         <option value="studio">Studio</option>
//         <option value="adjoiningRoom">Adjoining Room</option>
//         <option value="deluxeRoom">Deluxe Room</option>
//         <option value="doubleRoom">Double Room</option>
//         <option value="presidentialSuite">Presidential Suite</option>
//         <option value="cabana">Cabana</option>
//         <option value="suite">Suite</option>
//         <option value="twin">Twin</option>
//         <option value="quadRoom">Quad Room</option>
//         <option value="queenRoom">Queen Room</option>
//         <option value="kingRoom">King Room</option>
//         <option value="penthouse">Penthouse</option>
//         <option value="tripleRoom">Triple Room</option>
//         <option value="murphyRoom">Murphy Room</option>
//         <option value="villa">Villa</option>
//         <option value="accessibleRoom">Accessible Room</option>
//         <option value="apartments">Apartments</option>
//         <option value="balconyRoom">Balcony Room</option>
//         <option value="duplex">Duplex</option>
//         <option value="miniSuiteHotelRoom">Mini Suite Hotel Room</option>
//         <option value="others">Others</option>
//         {/* Add more options as needed */}
//         </select>


//         <label htmlFor="capacity">Capacity:</label>
//         <input type="number" placeholder='Capacity' className='border p-3 rounded-lg' id='capacity' onChange={handleChange} />

//         <label htmlFor="pricePerNight">Price Per Night:</label>
//         <input type="number" placeholder='Price Per Night' className='border p-3 rounded-lg' id='pricePerNight' onChange={handleChange} />
        
        


//         {/* ... Other form inputs ... */}

        

//         <button
//           disabled={loading}
//           className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 hover:font-semibold disabled:opacity-80'
//         >
//           {loading ? 'Loading' : 'Add  Room'}
//         </button>

//       </form>
      
     

//       {error && <p className='text-red-500 mt-5'>{error}</p>}
     


//     </div>
//     </div>
//     ) 
// };

// export default AddRoom;





import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { app } from "../firebase.js";

export default function AddRoom({onClose}) {


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
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
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
      setUploadSuccess(true);
      navigate('/accommodation'); // Redirect to the accommodations page after successful creation
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

  const handleImageClick = (e) => {
    setImage(e.target.src);
  };

  return (
    <div className="">
      <div className="p-3 max-w-lg mx-auto bg-white shadow-slate-500 rounded-lg">
      {/* Images Section */}
     
        <div className="">
          <div className="images lg:h-1/2 rounded-lg shadow-md">
            <div className="active-image mb-2 lg:mb-0">
              <img className="h-full" src={ formData.photo ? formData.photo : "https://media.designcafe.com/wp-content/uploads/2023/07/05141750/aesthetic-room-decor.jpg" } alt="" />
              
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
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Room Information</h2>
            {/* ... Your room information components ... */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600">Room Number:</label>
                <input
                  type="text"
                  className="font-semibold border-2 w-full py-1"
                 
                  id="roomNumber"
                  onChange={handleChange}

                />
              </div>

              <div>
                <label className="text-gray-600">Room Type:</label>
                <input
                  type="text"
                  className="font-semibold border-2 w-full py-1"
                 
                  id="roomType"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-gray-600">Capacity:</label>
                <input
                  type="text"
                  className="font-semibold border-2 w-full py-1"
                
                  id="capacity"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-gray-600">Price Per Night:</label>
                <input
                  type="text"
                  className="font-semibold border-2 w-full py-1"
                  
                  id="pricePerNight"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-gray-600">Description:</label>
                <input
                  type="text"
                  className="font-semibold border-2 w-full py-1 "
                
                  id="description"
                  onChange={handleChange}
                />
              </div>

              

              {/* <div>
              <label className="text-gray-600">Availability:</label>
              <input
                type="text"
                className={`font-semibold border-b-2 w-full py-1 ${
                  data.availability ? 'text-green-600' : 'text-red-600'
                }`}
                defaultValue={data.availability ? 'Available' : 'Not Available'}
              />
            </div> */}

              {/* <div>
              <label className="text-gray-600">Facilities:</label>
              <ul className="list-disc pl-4">
                {data.facilities.map((facility, index) => (
                  <li key={index} className="font-semibold">
                    {facility}
                  </li>
                ))}
              </ul>
            </div> */}

              <div>
                <label className="text-gray-600">Bed Type:</label>
                <input
                  type="text"
                  className="font-semibold border-b-2 w-full py-1"
               
                  id="bedType"
                  onChange={handleChange}
                  
                />
              </div>
              <button onClick={handleSubmit} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full col-span-2">Add Room</button>
            </div>
          </div>
        </div>
      </form>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      
      </div>
    </div>
  );
}
