import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

function ShowAnAccDetails() {
  const { accId } = useParams();
  console.log(accId)
  const [acc, setAcc] = useState({});
  const { data, loading, error } = useFetch(`/api/accommodation/getAccommodation/${accId}`);

  useEffect(() => {
    if (data) setAcc(data);
  }, [data]);

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="w-60%">
          <img src={acc.avatar} alt="" />
        </div>
        <div className="w-40%">
          <p>{acc.name}</p>
          <p>{acc.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ShowAnAccDetails;
