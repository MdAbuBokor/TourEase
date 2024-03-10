
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderAccomodation from '../../components/Header.accommodation';

const CreateAccommodation = () => {
  const [formData, setFormData] = useState({});

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 


  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };







  const handleSubmit = async (e) => {
    e.preventDefault();

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

 


  return (


      
    <div className="">
      <HeaderAccomodation />
   
    <div className='p-3 max-w-lg mx-auto'>
     

      <h1 className='text-3xl text-center font-semibold my-7'>Create Accommodation</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
     

        <label htmlFor="name">Name:</label>
        <input type="text" placeholder='Name'  className='border p-3 rounded-lg' id='name' onChange={handleChange} />
        
        <label htmlFor="email">Email:</label>
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />

       

        <label htmlFor="type">Accommodation Type:</label>
        <select className='border p-3 rounded-lg'  id='type' defaultValue="hotel" onChange={handleChange}>
        <option value="hotel">Hotel</option>
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
