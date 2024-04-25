import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ShowAccommodationInBoard from "./ShowAccommodationInBoard.jsx";

function AcBoard() {
  const place =useParams().place;
  const [accs, setAccs] = useState([]);
  const [visibleAccs, setVisibleAccs] = useState(10); // Number of initially visible accommodations
  const { data, loading, error } = useFetch(
    "/api/accommodation/getAccommodationByLocation?location="+place
  );


  useEffect(() => {
    if (data) {
      setAccs(data);
    }
  }, [data]);

  const loadMore = () => {
    setVisibleAccs((prevVisibleAccs) => prevVisibleAccs + 10);
  };

  return (
    <div className="p-3 ">
      <div className=" flex flex-col xl:grid xl:grid-cols-2 gap-5 border border-gray-900 rounded-lg p-4 shadow-2xl">
        
        <div className="relative">
        <img className="w-full max-h-[50vh] object-cover rounded-xl" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/a9/8b/44/sea-beach.jpg?w=1200&h=-1&s=1" alt="Places image" />
          <p className=" bg-glassy backdrop-blur-md text-6xl text-white lg:text-6xl font-semibold absolute bottom-4 left-4">{place}</p>
          <p className=" bg-glassy backdrop-blur-md text-3xl text-white lg:text-3xl font-semibold absolute bottom-4 right-4">Found {accs.length} Accommodations</p>


        </div>
        <div className="flex items-center max-h-[50vh]">
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/JaDXA_xgSUo" title="KUAKATA | সমুদ্র কন্যা কুয়াকাটা " frameBorder="1" allow="" ></iframe>
        </div>
      </div>


<div className=" mt-8 border border-gray-900 shadow-xl lg:grid lg:grid-cols-10">
  <div className="col-span-10">
  <div className="p-4 text-3xl text-center font-sans font-bold">
    Accommodations in {place}
  </div>


      <div className="flex flex-col xl:grid xl:grid-cols-2 shadow-2xl gap-3">
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
    {/* <div className="col-span-1 border border-gray-600 shadow-2xl">
     
      <MorePlace />

    </div> */}
    </div>

    <div className=""></div>

    </div>
    

  );
}

export default AcBoard;
