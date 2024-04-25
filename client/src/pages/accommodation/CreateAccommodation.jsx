
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderAccomodation from '../../components/Header.accommodation';
import { app } from '../../firebase';

const CreateAccommodation = () => {
  const [formData, setFormData] = useState({});

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [file,setfile] = useState(undefined)
  const fileRef = useRef(null)

  const [filePercent,setfilePercent] = useState(0)
  const [fileUploadError,setfileUploadError] = useState(false)

 


  

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.id]: value,
    });
  };







  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    try {
      setLoading(true);


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

  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  },[file,fileRef]);

  
  
  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = file.name + new Date().getTime();
    const storageRef = ref(storage,  fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       setfilePercent(Math.round (progress));
      },

      () => {
        setfileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          
          setFormData({
            ...formData,
            avatar:downloadURL
          })
        });
      }
      
      );
  }

 


  return (


      
    <div className="">
      <HeaderAccomodation />
   
    <div className='p-3 max-w-lg mx-auto'>
     

      <h1 className='text-3xl text-center font-semibold my-7'>Create Accommodation</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
            src={formData.avatar || "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg "}
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
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />

        <label htmlFor="name">Name:</label>
        <input type="text" placeholder='Name'  className='border p-3 rounded-lg' id='name' onChange={handleChange} />

        <label htmlFor="title">Title:</label>
        <input type="text" placeholder='A good place to stay' className='border p-3 rounded-lg' id='title' onChange={handleChange} />

        <label htmlFor="location_details">Location Details:</label>
        <input type="text" placeholder='Opposite of ECO Park, Kuakata, Kuakata, Bangladesh, 8652' className='border p-3 rounded-lg' id='location_details' onChange={handleChange} />

       

        <label htmlFor="type">Accommodation Type:</label>
        <select className='border p-3 rounded-lg'  id='type' defaultValue="hotel" onChange={handleChange}>
        <option value="hotel">Hotel</option>
        <option value="resort">Resort</option>
        <option value="apartment">Apartment</option>
        <option value="villa">Villa</option>
        <option value="hostel">Hostel</option>
        <option value="guesthouse">Guesthouse</option>
        <option value="others">Others</option>
        {/* Add more options as needed */}
        </select>
        
        <label htmlFor="location">Location:</label>
        <select className='border p-3 space-y-2 rounded-lg' id='location' onChange={handleChange} defaultValue="kuakata">
        <option value="kuakata">Kuakata</option>
        <option value="cox-bazar">Cox-Bazar</option>
        <option value="sajek">Sajek-Valley</option>
        <option value="rangamati">Rangamati</option>
        <option value="sundarbans">Sundarbans</option>
        <option value="saint-martin">Saint-Martin</option>
    
        {/* Add more options as needed */}
        </select>

        <label htmlFor="description">Description:</label>
        <input type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' onChange={handleChange} />

        <label htmlFor="phone">Phone:</label>
        <input type="text" placeholder='Phone' className='border p-3 rounded-lg' id='phone' onChange={handleChange} />

        <label htmlFor="website">Website:</label>
        <input type="text" placeholder='Website(Optional)' className='border p-3 rounded-lg' id='website' onChange={handleChange} />
        <label htmlFor="">Select Amentities available in your hotel:</label>
        <div className="checkbox-group grid grid-cols-3 gap-3 border p-4">
         
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="gym" onChange={handleChange}/>
    <span className="label-text font-bold">Gym</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="spa" onChange={handleChange}/>
    <span className="label-text font-bold">Spa</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="bar" onChange={handleChange}/>
    <span className="label-text font-bold">Bar</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="laundry" onChange={handleChange} />
    <span className="label-text font-bold">Laundry</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="restaurant" onChange={handleChange} />
    <span className="label-text font-bold">Restaurant</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="shopping"  onChange={handleChange}/>
    <span className="label-text font-bold">Shopping</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="freeParking" onChange={handleChange} />
    <span className="label-text font-bold">Free Parking</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="bikeRental" onChange={handleChange}/>
    <span className="label-text font-bold">Bike Rental</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="freeWifi"  onChange={handleChange}/>
    <span className="label-text font-bold">Free Wifi</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="movieNights" onChange={handleChange}/>
    <span className="label-text font-bold">Movie Nights</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="swimmingPool" onChange={handleChange}/>
    <span className="label-text font-bold">Swimming Pool</span>
  </label>
  <label className="cursor-pointer label border rounded-lg display: flex align-items: center">
    <input type="checkbox" className="checkbox checkbox-success" id="coffeeShop" onChange={handleChange}/>
    <span className="label-text font-bold">Coffee Shop</span>
  </label>
</div>






        {/* <label htmlFor="location">Location:</label>
        <input type="text" placeholder='Location' className='border p-3 rounded-lg ' id='location' onChange={handleChange} /> */}




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
