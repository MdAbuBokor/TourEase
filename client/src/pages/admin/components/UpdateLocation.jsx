import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { app } from "../../../firebase";

  
  export default function UpdateLocation({data,onClose,onUpdate}) {
  
  
    const [file, setfile] = useState(undefined);
    const fileRef = useRef(null);
    const [filePercent, setfilePercent] = useState(0);
    const [fileUploadError, setfileUploadError] = useState(false);
    const [formData, setformData] = useState({});
    const dispatch = useDispatch();
    const [updateSuccess, setUpdateSuccess] = useState(false);
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
      setformData({
        ...formData,
        [e.target.id]: e.target.value,
      });
      //console.log(formData)
    };
  
   
   
  
    const handleSubmit = async (e) => {
      e.preventDefault();
       console.log(formData)
      try {
          setLoading(true)
          
        
        const res = await fetch(`/api/location/update/${data._id}`, {
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
                  <label className="text-gray-600">Location Name:</label>
                 
                  <input
                    type="text"
                    className="font-semibold border-2 w-full py-1"
                    placeholder="Enter Location Name"
                    defaultValue={data.name}
                   
                    id="name"
                    onChange={handleChange}
  
                  />
                </div>
  
               
                  <div>
                  <label className="text-gray-600">Location Details:</label>
                  <input
                    type="text"
                    className="font-semibold border-2 w-full py-1"
                  placeholder="Enter Location Details)"
                  defaultValue={data.location_details}
                    id="location_details"
                    onChange={handleChange}
                  />
                </div>
  
  
              <div>
                  <label className="text-gray-600">Location Description:</label>
                  <textarea
                    type="text"
                    className=" border-2 w-full py-1 "
                    placeholder=""
                    defaultValue={data.description}
                    id="description"
                    onChange={handleChange}
                  />
                </div>
  
              
                <div>
                  <label className="text-gray-600">Longitude:</label>
                  <input
                    type="number"
                    className="font-semibold border-2 w-full py-1"
                    placeholder="Longitude"
                    defaultValue={data.longitude}
                    id="longitude"
                    onChange={handleChange}
                  />
                </div>
  
                <div>
                  <label className="text-gray-600">latitude:</label>
                  <input
                    type="number"
                    className="border-2 w-full py-1"
                    placeholder="Latitude"
                    defaultValue={data.latitude}
                    id="latitude"
                    onChange={handleChange}
                  />
                </div>
               
                <button onClick={handleSubmit} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full col-span-2">{loading?"Loading...":"Update Location"}</button>
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
  