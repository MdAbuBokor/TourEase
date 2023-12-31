
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
  const [formData, setFormData] = useState({});

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentAccommodation } = useSelector((state) => state.accommodation);

 


  

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
  };

 


  return (


      
    <div className="">
      
   
    <div className='p-3 max-w-lg mx-auto'>
     

      <h1 className='text-3xl text-center font-semibold my-7'>Add New Room</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
     

        <label htmlFor="roomNumber">Room Number:</label>
        <input type="number" placeholder='Room Number' className='border p-3 rounded-lg' id='roomNumber' onChange={handleChange} />
        <label htmlFor="roomType">Room Type:</label>
        <select placeholder='Room Type' className='border p-3 rounded-lg' id='roomType' onChange={handleChange}>
        <option  value="singleRoom">Single Room</option>
        <option value="studio">Studio</option>
        <option value="adjoiningRoom">Adjoining Room</option>
        <option value="deluxeRoom">Deluxe Room</option>
        <option value="doubleRoom">Double Room</option>
        <option value="presidentialSuite">Presidential Suite</option>
        <option value="cabana">Cabana</option>
        <option value="suite">Suite</option>
        <option value="twin">Twin</option>
        <option value="quadRoom">Quad Room</option>
        <option value="queenRoom">Queen Room</option>
        <option value="kingRoom">King Room</option>
        <option value="penthouse">Penthouse</option>
        <option value="tripleRoom">Triple Room</option>
        <option value="murphyRoom">Murphy Room</option>
        <option value="villa">Villa</option>
        <option value="accessibleRoom">Accessible Room</option>
        <option value="apartments">Apartments</option>
        <option value="balconyRoom">Balcony Room</option>
        <option value="duplex">Duplex</option>
        <option value="miniSuiteHotelRoom">Mini Suite Hotel Room</option>
        <option value="others">Others</option>
        {/* Add more options as needed */}
        </select>


        <label htmlFor="capacity">Capacity:</label>
        <input type="number" placeholder='Capacity' className='border p-3 rounded-lg' id='capacity' onChange={handleChange} />

        <label htmlFor="pricePerNight">Price Per Night:</label>
        <input type="number" placeholder='Price Per Night' className='border p-3 rounded-lg' id='pricePerNight' onChange={handleChange} />
        
        


        {/* ... Other form inputs ... */}

        

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 hover:font-semibold disabled:opacity-80'
        >
          {loading ? 'Loading' : 'Add  Room'}
        </button>
      </form>

      {error && <p className='text-red-500 mt-5'>{error}</p>}
     


    </div>
    </div>
    ) 
};

export default AddRoom;
