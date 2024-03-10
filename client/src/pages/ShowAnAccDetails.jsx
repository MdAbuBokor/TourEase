import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import DateInput from '../components/DateInput';
import Header from '../components/Header';
import MapShow from '../components/MapShow';
import RoomsBoard from '../components/RoomsBoard';

function ShowAnAccDetails() {
  const { accId } = useParams();

  const [acc, setAcc] = useState({});
  const { data, loading, error } = useFetch(`/api/accommodation/getAccommodation/${accId}`);

  useEffect(() => {
    if (data) setAcc(data);
  }, [data]);

  return (
    <div className=''>
      <Header />
      <div className=" justify-center   grid lg:grid-cols-2">
        <div className=" ">
          <img src={acc.avatar} alt="" />
        </div>
        <div className="p-5">
          <p className='text-3xl font-bold'>{acc.name}
          <span className='text-sm font-semibold'>{acc.type}</span></p>
          
          <p className='text-2xl'>{acc.title}</p>
          <div className=" shadow-xl indent-5">
          
          <p className="text-xl">Email : example@ex.com</p>
          <p>Phone : 123456789</p>
          <p>Fax : 123456789</p>
          <p>Website : example.com</p>
        </div>
          <p className='text-xl mt-5'>{acc.description}</p>
        </div>
      </div>
      <div className="">
        <div className="p-5">
          <RoomsBoard acc={acc} />

        </div>

        <div className="w-full border-2 p-4 ">
        <MapShow  height={300} width={500} lat={acc.lat} lng={acc.lng} />
        </div>



        <div className="text-center border-4 border-sky-800 shadow-xl">
          <h1 className="text-3xl font-bold">Accommodation Contacts</h1>
          <p className="text-xl">Email : example@ex.com</p>
          <p>Phone : 123456789</p>
          <p>Fax : 123456789</p>
          <p>Website : example.com</p>
        </div>

       
        
        


      </div>
      <DateInput />
    </div>
  );
}

export default ShowAnAccDetails;
