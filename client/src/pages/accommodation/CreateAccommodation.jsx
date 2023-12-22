
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import HeaderAccomodation from '../../components/Header.accommodation';

const CreateAccommodation = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileRef = useRef();
  const {currentUser} = useSelector(state=>state.user)



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (file) {
        await handleFileUpload(file);
      }

      // Replace the endpoint and method with your actual API endpoint and method
      const res = await fetch(`/api/accommodation/createAccommodation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      setUploadSuccess(true);
      navigate('/accommodation'); // Redirect to the accommodations page after successful creation
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage();
    const fileName = file.name + new Date().getTime();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            avatar: downloadURL,
          });
        });
      }
    );
  };



  return (


      
    <div className="">
      <HeaderAccomodation />
   
    <div className='p-3 max-w-lg mx-auto'>
     

      <h1 className='text-3xl text-center font-semibold my-7'>Create Accommodation</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label className='text-center' htmlFor="accommodation_avatar">Accommodation Avatar:</label>
        <div className='flex items-center gap-4'>
          <input
            type="file"
            ref={fileRef}
            hidden
            accept='image/*'
            onChange={handleFileChange}
          />
          <img
            onClick={() => fileRef.current.click()}
            src={file ? URL.createObjectURL(file) : 'https://media.radissonhotels.net/image/radisson-blu-hotel-dhaka-water-garden/exterior/16256-113891-f63612886_3xl.jpg?impolicy=HomeHero'}
            alt="profile_pic"
            className='w-auto h-50  mx-auto cursor-pointer'
          />
        </div>
        <p className='text-sm self-center'>
          {fileUploadError && (
            <span className='text-red-700'>
              Error uploading image (Note: image must be less than 2 MB).
            </span>
          )}
          {filePercent > 0 && filePercent < 100 && (
            <span className='text-slate-700'>{`Uploading ${filePercent}%`}</span>
          )}
          {filePercent === 100 && (
            <span className='text-green-700'>Image successfully uploaded! Now click "Create Accommodation".</span>
          )}
        </p>

        <label htmlFor="name">Name:</label>
        <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' onChange={handleChange} />
        
        <label htmlFor="email">Email:</label>
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />

       

        <label htmlFor="type">Accommodation Type:</label>
        <select className='border p-3 rounded-lg' id='type' onChange={handleChange}>
        <option value="hotel">Hotel</option>
        <option value="apartment">Apartment</option>
        <option value="villa">Villa</option>
        <option value="hostel">Hostel</option>
        <option value="guesthouse">Guesthouse</option>
        <option value="others">Others</option>
        {/* Add more options as needed */}
        </select>





        <label htmlFor="location">Location:</label>
        <input type="text" placeholder='Location' className='border p-3 rounded-lg ' id='location' onChange={handleChange} />




        {/* ... Other form inputs ... */}

        

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 hover:font-semibold disabled:opacity-80'
        >
          {loading ? 'Loading' : 'Create Accommodation'}
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
  <p>Have an accommodation already?</p>
  <Link to ={"/accommodation/signin"}>
  <span className='text-blue-700 font-bold'>Sign in Accommodation</span></Link>
 </div>

      {error && <p className='text-red-500 mt-5'>{error}</p>}
      {uploadSuccess && (
        <p className='text-green-700 mt-5'>Accommodation created successfully!</p>
      )}
    </div>
    </div>
    ) 
};

export default CreateAccommodation;
