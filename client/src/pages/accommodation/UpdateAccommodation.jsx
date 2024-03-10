import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderAccomodation from "../../components/Header.accommodation.jsx";
import { InputMap } from "../../components/InputMap.jsx";
import MapShow from "../../components/MapShow.jsx";
import SidebarNew from "../../components/Sidebar/SidebarNew.jsx";

import Swal from "sweetalert2";
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

  // console.log(formData)
  // console.log(filePercent)
  // console.log(fileUploadError)
  // console.log(file);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

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

      (error) => {
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
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
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
                <input
                  onChange={(e) => setfile(e.target.files[0])}
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/* "
                />
                <img
                  onClick={() => fileRef.current.click()}
                  src={formData.avatar || currentAccommodation?.avatar}
                  alt=" profile_pic"
                  className="w-100   mx-auto cursor-pointer"
                />

                <p className="text-sm self-center">
                  {fileUploadError ? (
                    <span className="text-red-700">
                      Error Image upload (Note: image must be less than 2 mb)
                    </span>
                  ) : filePercent > 0 && filePercent < 100 ? (
                    <span className="text-slate-700">{`Uploading ${filePercent}%`}</span>
                  ) : filePercent === 100 ? (
                    <span className="text-green-700">
                      Image successfully uploaded! Now click update.
                    </span>
                  ) : (
                    ""
                  )}
                </p>

                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  placeholder={currentAccommodation?.name}
                  defaultValue={currentAccommodation?.name}
                  className="border p-3 rounded-lg"
                  id="name"
                  onChange={handleChange}
                />

                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  placeholder={currentAccommodation?.email}
                  defaultValue={currentAccommodation?.email}
                  className="border p-3 rounded-lg"
                  id="email"
                  onChange={handleChange}
                />

                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="border p-3 rounded-lg"
                  id="password"
                  onChange={handleChange}
                />

                <label htmlFor="type">Accommodation Type:</label>
                <select
                  className="border p-3 rounded-lg"
                  id="type"
                  defaultValue={currentAccommodation?.type}
                  onChange={handleChange}
                >
                  <option value="hotel">Hotel</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="hostel">Hostel</option>
                  <option value="guesthouse">Guesthouse</option>
                  <option value="others">Others</option>
                  {/* Add more options as needed */}
                </select>

                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  placeholder={currentAccommodation?.location}
                  defaultValue={currentAccommodation?.location}
                  className="border p-3 rounded-lg "
                  id="location"
                  onChange={handleChange}
                />
                
                <label htmlFor="description">Description:</label>
                <textarea
                  type="text"
                  placeholder={currentAccommodation?.description}
                  defaultValue={currentAccommodation?.description}
                  className="border p-3 rounded-lg "
                  id="description"
                  onChange={handleChange}
                />
                <div className="">
                <MapShow height={300} width={500} />
                </div>

                <div className="">
                <InputMap height={300} width={500} />
                </div>
              
                
                

                <button
                  disabled={loading}
                  className="border p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? "loading..." : "update profile"}{" "}
                </button>
              </form>
              {/* <div className='flex justify-between mt-5'>
        <span onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-400 cursor-pointer'>Sign out</span>
      </div> */}

              <p className="text-red-700 mt-5">{error ? error : ""}</p>
              <p className="text-green-700 mt-5">
                {ok ? "Profile updated successfully" : ""}
              </p>
              <button onClick={handleSignOut } className="border p-3 rounded-lg bg-red-700 text-white uppercase hover:opacity-90 disabled:opacity-60">SignOut</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
