import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderAccomodation from "../../components/Header.accommodation.jsx";
import SidebarNew from "../../components/Sidebar/SidebarNew.jsx";

import Swal from "sweetalert2";
import useFetch from "../../../hooks/useFetch.js";
import { app } from "../../firebase.js";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../../redux/accommodation/accommodationSlice.js";


export default function Profile() {
  const [ok, setok] = useState(false);
  const [file, setfile] = useState(undefined);
  const fileRef = useRef(null);
  const { currentAccommodation, loading, error } = useSelector(
    (state) => state.accommodation
  );
  const [filePercent, setfilePercent] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [formData, setformData] = useState({});
  const dispatch = useDispatch();
  const {data} = useFetch(`/api/location/getAllLocations`);
  const [locations,setLocations] = useState([]);

  // console.log(formData)
  // console.log(filePercent)
  // console.log(fileUploadError)
  // console.log(file);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    if(data) {
        setLocations(data);
    }
}, [data])

  const handleFileUpload = (file) => {
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

      () => {
        setfileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setformData({
            ...formData,
            avatar: downloadURL,
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
    // console.log(formData)
    try {
      dispatch(updateStart());
      const res = await fetch(
        `/api/accommodation/updateAccommodation/${currentAccommodation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        return;
      }

      dispatch(updateSuccess(data));
      setok(true)

      //    console.log(data)
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleSignOut = async ()=>{
    Swal.fire({
      title: "Are you sure to Signout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SignOut"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          dispatch(signOutStart());
          const res =await fetch(`/api/auth/signout`,{
            method: 'GET',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(),
          })
          const data = await res.json();
         if(data.success===false){
            dispatch(signOutFailure(data.message));
            return;
          }
    
          dispatch(signOutSuccess(data));
          Swal.fire({
            title: "SignOut!",
            icon: "success"
          });
       
      //    console.log(data)
          
        }
        catch (error) {
            dispatch(signOutFailure(error.message));
          
        }

      }
    });

    // console.log(formData)
     
   }



  return (
   // console.log(location)
    <div className="flex h-screen ">
      <SidebarNew />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAccomodation />
        <div className="flex-1 overflow-y-auto p-4">
          <div>
            <div className="mx-auto max-w-lg p-3">
              <h1 className="text-3xl font-semibold text-center my-7 ">
                Update Your Accommodation
              </h1>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
               

               
        <label htmlFor="avatar">Upload Hotel Picture</label>

      <input
            onChange={(e) => setfile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/* "
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentAccommodation.avatar}
            alt=" profile_pic"
            className="w-[500px] rounded-lg mx-auto cursor-pointer"
          />

          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (Note: image must be less than 2 mb)
              </span>
            ) : filePercent > 0 && filePercent < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePercent}%`}</span>
            ) : filePercent === 100 ? (
              <span className="">
                Image successfully uploaded! .
              </span>
            ) : (
              ""
            )}
          </p>

     

       
        
        <label htmlFor="email">Email:</label>
        <input type="email" placeholder={currentAccommodation.email} defaultValue={currentAccommodation.email} className='border p-3 rounded-lg' id='email' onChange={handleChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />

        <label htmlFor="name">Name:</label>
        <input type="text" placeholder={currentAccommodation.name} defaultValue={currentAccommodation.name}  className='border p-3 rounded-lg' id='name' onChange={handleChange} />

        <label htmlFor="title">Title:</label>
        <input type="text" placeholder={currentAccommodation.title} defaultValue={currentAccommodation.title}  className='border p-3 rounded-lg' id='title' onChange={handleChange} />

       

        <label htmlFor="type">Accommodation Type:</label>
        <select className='border p-3 rounded-lg'  id='type' defaultValue={currentAccommodation.type}  onChange={handleChange}>
        <option value="hotel">Hotel</option>
        <option value="apartment">Apartment</option>
        <option value="villa">Villa</option>
        <option value="hostel">Hostel</option>
        <option value="guesthouse">Guesthouse</option>
        <option value="others">Others</option>
        {/* Add more options as needed */}
        </select>
        {console.log(currentAccommodation.location)}
        
        <label htmlFor="location">Location:</label>
        <select className='border p-3 space-y-2 rounded-lg' id='location' onChange={handleChange}  defaultValue={currentAccommodation.location} >
        {locations.map((location) => (
        <option key={location._id} value={location.name}>
          {location.name}
        </option>
      ))}
    
        {/* Add more options as needed */}
        </select>

        <label htmlFor="description">Description:</label>
        <input type="text" placeholder={currentAccommodation.description} defaultValue={currentAccommodation.description}  className='border p-3 rounded-lg' id='description' onChange={handleChange} />

        <label htmlFor="phone">Phone:</label>
        <input type="text" placeholder={currentAccommodation.phone} defaultValue={currentAccommodation.phone}  className='border p-3 rounded-lg' id='phone' onChange={handleChange} />

        <label htmlFor="website">Website:</label>
        <input type="text" placeholder={currentAccommodation.website} defaultValue={currentAccommodation.website}  className='border p-3 rounded-lg' id='website' onChange={handleChange} />

        
        <div className="checkbox-group grid grid-cols-3 gap-3 border p-4">
         
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="gym" onChange={handleChange} defaultChecked={currentAccommodation.gym}/>
    <span className="label-text font-bold">Gym</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="spa" onChange={handleChange} defaultChecked={currentAccommodation.spa} />
    <span className="label-text font-bold">Spa</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="bar" onChange={handleChange} defaultChecked={currentAccommodation.bar}/>
    <span className="label-text font-bold">Bar</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="laundry" onChange={handleChange} defaultChecked={currentAccommodation.laundry} />
    <span className="label-text font-bold">Laundry</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="restaurant" onChange={handleChange} defaultChecked={currentAccommodation.restaurant} />
    <span className="label-text font-bold">Restaurant</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="shopping"  onChange={handleChange} defaultChecked={currentAccommodation.shopping}/>
    <span className="label-text font-bold">Shopping</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="freeParking" onChange={handleChange}  defaultChecked={currentAccommodation.parking}/>
    <span className="label-text font-bold">Free Parking</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="bikeRental" onChange={handleChange} defaultChecked={currentAccommodation.bikeRental}/>
    <span className="label-text font-bold">Bike Rental</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="freeWifi"  onChange={handleChange} defaultChecked={currentAccommodation.freeWifi}/>
    <span className="label-text font-bold">Free Wifi</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="movieNights" onChange={handleChange} defaultChecked={currentAccommodation.movieNights}/>
    <span className="label-text font-bold">Movie Nights</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="swimmingPool" onChange={handleChange} defaultChecked={currentAccommodation.swimmingPool}/>
    <span className="label-text font-bold">Swimming Pool</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="coffeeShop" onChange={handleChange} defaultChecked={currentAccommodation.coffeeShop}/>
    <span className="label-text font-bold">Coffee Shop</span>
  </label>
</div>



                
                

                <button
                  disabled={loading}
                  className="border p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? "loading..." : "update hotel"}{" "}
                </button>
              </form>
              {/* <div className='flex justify-between mt-5'>
        <span onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-400 cursor-pointer'>Sign out</span>
      </div> */}

              <p className="text-red-700 mt-5">{error ? error : ""}</p>
              <p className="text-green-700 mt-5">
                {ok ? "Hotel updated successfully" : ""}
              </p>
              <button onClick={handleSignOut } className="border p-3 rounded-lg bg-red-700 text-white uppercase hover:opacity-90 disabled:opacity-60">SignOut</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
