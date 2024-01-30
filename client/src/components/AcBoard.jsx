import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ShowAccommodationInBoard from "./ShowAccommodationInBoard.jsx";

function AcBoard() {
  const [accs, setAccs] = useState([]);
  const [visibleAccs, setVisibleAccs] = useState(10); // Number of initially visible accommodations
  const { data, loading, error } = useFetch(
    "/api/accommodation/getAccommodationByLocation?location=dhaka"
  );

  useEffect(() => {
    if (data) {
      setAccs(data);
    }
  }, [data]);

  const loadMore = () => {
    setVisibleAccs((prevVisibleAccs) => prevVisibleAccs + 10);
  };

  //console.log(data);

  return (
    <div className="border-2 shadow-xl bg-slate-400">
      <div className="bg-slate-300">
        <h1 className="text-3xl text-center font-serif">Accommodation in</h1>
        <h1 className="text-3xl text-center font-serif">Dhaka</h1>
        <img src="" alt="" />
        <p className="text-center text-2xl font-semibold">Found {accs.length} Accommodations</p>
      </div>

      <div className="flex flex-col xl:grid xl:grid-cols-2">
        {accs.slice(0, visibleAccs).map((acc) => (
          <ShowAccommodationInBoard key={acc._id} acc={acc} />
        ))}
        {visibleAccs < accs.length && (
          <button onClick={loadMore} className="block mx-auto mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default AcBoard;
