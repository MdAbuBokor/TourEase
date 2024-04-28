import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useFetch from '../../../hooks/useFetch';
import AddLocation from './components/AddLocation';
import HeaderAdmin from './components/Header.admin';
import UpdateLocation from './components/UpdateLocation';

function Locations() {
    const {data, loading, error} = useFetch(`/api/location/getAllLocations`);
    const [locations,setLocations] = useState([]);
    const [Add, setAdd] = useState(false);
    const [UpdateLocationOpen, setUpdateLocationOpen] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [locationToUpdate, setLocationToUpdate] = useState(null);
    useEffect(() => {
        if(data) {
            setLocations(data);
        }
    }, [data])

    const handleLocationUpdate = (location) => {
        setLocationToUpdate(location);
        setUpdateLocationOpen(true);
      };



      const handleDelete = async (locationId) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await fetch(
                `/api/location/delete/${locationId}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(),
                }
              );
              const data = await res.json();
              //console.log(data)
    
              if (data.success === false) {
                Swal.fire({
                  title: "Error!",
                  text: "Something went wrong.",
                  icon: "error",
                });
                return;
              }
    
              Swal.fire({
                title: "Deleted!",
                text: "Locatin has been deleted.",
                icon: "success",
              });
              setLocations(locations.filter((location) => location._id !== locationId));


             
    
              //    console.log(data)
            } catch (error) {
              Swal.fire({
                title: "Error!",
                text: "Something went wrong. catch",
                icon: "error",
              });
            }
          }
        });
    
        // console.log(formData)
      };
    

    if(loading) {
        return <div>Loading...</div>
    }
  return (
    <div>
        <HeaderAdmin />
        <div className="text-center mt-8 mx-auto font-bold text-3xl">
          Manage Locations
        </div>
        <div className=" border-sky-200 border-2 rounded-lg mt-10 max-w-7xl">
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-primary" onClick={() => setAdd(!Add)}>
          {Add ? "Close" : "Add Location"}
        </button>

        {Add && <AddLocation
      
        onClose={() => setAdd(false)} />}
        {UpdateLocationOpen && (
          <UpdateLocation
            data={locationToUpdate}
            onClose={() => setUpdateLocationOpen(false)}
            onUpdate={setUpdateSuccess}

          />
        )}

        <table className="w-full">
          <thead>
            <tr className=" items-center border-y-2">
              <th className="font-bold justify-center border-r-2 p-2 ">
                Location Name
              </th>
              {/* <th className="font-bold justify-center border-r-2 p-2 ">
                Available
              </th> */}
              <th className="font-bold justify-center border-r-2 p-2 ">
                Location Details
              </th>
              <th className="font-bold justify-center border-r-2 p-2 ">
                Location Description
              </th>

              <th className="font-bold justify-center border-r-2 p-2 ">Edit</th>
              <th className="font-bold justify-center border-r-2 p-2 ">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {locations?.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-xl font-bold p-10">
                  No Locations found
                  <br />
                  <button
                    onClick={() => setAdd(true)}
                    className="bg-sky-400 text-white p-2 rounded-lg"
                  >
                    Add A Location
                  </button>
                </td>
              </tr>
            )}
            {locations?.map((location, index) => (
              <tr
                key={location._id}
                className={
                  index % 2 === 0
                    ? "bg-base-200 border-b-2"
                    : "bg-base-300 border-b-2"
                }
              >
                <td className="  text-center justify-center border-r-2 p-2 ">
                  {location.name}
                </td>
               

                <td className=" text-center justify-center border-r-2 p-2 ">
                  {location.location_details}
                </td>
                <td className=" text-center justify-center border-r-2 p-2 line-clamp-1">
                  {location.description}
                </td>
              

                <td
                  className="border-b-2 cursor-pointer     border-r-2 p-2  rounded-lg bg-blue-600"
                  onClick={() => handleLocationUpdate(location)}
                >
                  Edit
                </td>

                <td
                  onClick={() => handleDelete(location._id)}
                  className="border-b-2 cursor-pointer text-center justify-center border-r-2 p-2 bg-red-200 rounded-lg"
                >
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Locations


