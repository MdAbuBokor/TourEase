
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { app } from '../firebase';

const Review = () => {
  const [formData, setFormData] = useState({});
  const { bookingId } = useParams();

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [file,setfile] = useState(undefined)
  const fileRef = useRef(null)

  const [filePercent,setfilePercent] = useState(0)
  const [fileUploadError,setfileUploadError] = useState(false)

 


  

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
      const datatoSend = {
        ...formData,
        bookingId,
        rating: formData.rating || 5,
        
      };
      console.log(datatoSend);


      // Replace the endpoint and method with your actual API endpoint and method
      const res = await fetch(`/api/review/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      
        body: JSON.stringify(datatoSend),
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
      navigate('/'); // Redirect to the accommodations page after successful creation
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  },[file]);
  
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
     <Header/>
   
    <div className='p-3 max-w-lg mx-auto'> 
     

      <h1 className='text-3xl text-center font-semibold my-7'>Give A Review</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label htmlFor="avatar">Upload Review photo </label>

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
            alt=" review image"
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

     

          <div className="rating">
  <input type="radio" name="rating" className="mask mask-star-2 bg-green-500"  onChange={handleChange}  id='rating' value={1}/>
  <input type="radio" name="rating" className="mask mask-star-2 bg-green-500" onChange={handleChange}  id='rating' value={2} />
  <input type="radio" name="rating" className="mask mask-star-2 bg-green-500" onChange={handleChange} id='rating' value={3} />
  <input type="radio" name="rating" className="mask mask-star-2 bg-green-500" onChange={handleChange}  id='rating' value={4}/>
  <input type="radio" name="rating" className="mask mask-star-2 bg-green-500" onChange={handleChange}  id='rating' value={5}/>
</div>
        
        
        <label htmlFor="name">Comment:</label>
        <textarea type="text" placeholder='Write your review here'  className='border p-3 rounded-lg' id='comment' onChange={handleChange} />

        

       

        



       







        

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 hover:font-semibold disabled:opacity-80'
        >
          {loading ? 'Loading' : 'Create Review'}
        </button>
      </form>

    

      {error && <p className='text-red-500 mt-5'>{error}</p>}
      {uploadSuccess && (
        <p className='text-green-700 mt-5'>Review created successfully!</p>
      )}
    </div>
    </div>
    ) 
};

export default Review;
