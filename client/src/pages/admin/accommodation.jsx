import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useFetch from "../../../hooks/useFetch";
import {
    updateFailure,
    updateStart,
    updateSuccess,
} from "../../redux/accommodation/accommodationSlice";
import HeaderAdmin from "./components/Header.admin";

function AccAdmin() {
  const { data, loading, error } = useFetch(`/api/accommodation/getAllAcc`);
  const [search, setSearch] = useState("");
  const [accs, setAccs] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const filteredAccs = data.filter(acc => acc.name.toLowerCase().includes(search.toLowerCase()));
      setAccs(filteredAccs.reverse());
    }
  }, [data, search]);

  const handleAccApprovedChange = async (acc) => {
    if(acc.isApproved){
        Swal.fire({
            title: "Already Approved!",
            icon: "warning",
        });
        return;
    }
    Swal.fire({
      title: "Are you sure to Approve it?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // console.log(formData)
        try {
          dispatch(updateStart());
          const res = await fetch(
            `/api/accommodation/updateAccommodation/${acc._id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                isApproved: !acc.isApproved,
              }),
            }
          );
          const data = await res.json();
          if (data.success === false) {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
            dispatch(updateFailure(data.message));
            return;
          }

          Swal.fire({
            title: "Approved updated!",
            icon: "success",
          });
         
          dispatch(updateSuccess(data));
          navigate("/admin/acc");

          //    console.log(data)
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. catch",
            icon: "error",
          });
          dispatch(updateFailure(error.message));
        }
      }
    });
  };
  const handleAccBannedChange = async (acc) => {
   
    Swal.fire({
      title: "Are you sure to Change it?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // console.log(formData)
        try {
          dispatch(updateStart());
          const res = await fetch(
            `/api/accommodation/updateAccommodation/${acc._id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                isBanned: !acc.isBanned,
              }),
            }
          );
          const data = await res.json();
          if (data.success === false) {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
            dispatch(updateFailure(data.message));
            return;
          }

          Swal.fire({
            title: "Banned updated!",
            icon: "success",
          });
         
          dispatch(updateSuccess(data));
          navigate("/admin/acc");

          //    console.log(data)
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. catch",
            icon: "error",
          });
          dispatch(updateFailure(error.message));
        }
      }
    });
  };
  const handleAccActiveChange = async (acc) => {
   
    Swal.fire({
      title: "Only Accommodation Owner Can Change It!",

      icon: "warning",
     
    })
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <HeaderAdmin />
      <div className="text-center font-bold text-3xl mt-8">Accommodation</div>
      <div className="flex justify-center">
        <input
          type="text"
          className="border-2 border-sky-200 rounded-lg p-2 mt-5"
          placeholder="Search Accommodation"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className=" border-sky-200 border-2 rounded-lg mt-10 max-w-7xl mx-auto h-[60vh] overflow-y-auto">
        {/* You can open the modal using document.getElementById('ID').showModal() method */}

        <table className="w-full ">
          <thead className="sticky top-0 bg-white">
            <tr className=" items-center border-y-2 ">
              <th className="font-bold justify-center border-r-2 p-2 ">
                Accommodation Name
              </th>
              {/* <th className="font-bold justify-center border-r-2 p-2 ">
                Available
              </th> */}
              <th className="font-bold justify-center border-r-2 p-2 ">
                Is Active
              </th>

              <th className="font-bold justify-center border-r-2 p-2 ">
                Is Banned
              </th>
              <th className="font-bold justify-center border-r-2 p-2 ">
                Is Approved
              </th>
              <th className="font-bold justify-center border-r-2 p-2 ">
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {accs?.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-xl font-bold p-10">
                  No Accommodation found
                  <br />
                </td>
              </tr>
            )}
            {accs?.map((acc, index) => (
              <tr
                key={acc._id}
                className={
                  index % 2 === 0
                    ? "bg-base-200 border-b-2"
                    : "bg-base-300 border-b-2"
                }
              >
                <td className="  text-center justify-center border-r-2 p-2 ">
                  {acc.name}
                </td>

                <td className=" text-center justify-center border-r-2 p-2 ">
                {
                    <div className="form-control ">
                      <label className="cursor-pointer label">
                        <input
                          type="checkbox"
                          className="toggle toggle-primary"
                          checked={acc.isActive}
                          onChange={() => handleAccActiveChange(acc)}
                        />
                        <span className="label-text">{acc.isActive?"Active":"Deactive"}</span>
                      </label>
                    </div>
                  }
                </td>
                <td className=" text-center justify-center border-r-2 p-2 line-clamp-1"
                 onClick={() => handleAccBannedChange(acc)}>
                {
                    <div className="form-control ">
                      <label className="cursor-pointer label">
                        <input
                          type="checkbox"
                          className="toggle toggle-primary"
                          checked={acc.isBanned}
                          onChange={() => handleAccBannedChange(acc)}
                        />
                        <span className="label-text">{acc.isBanned?"Banned":"Not Banned"}</span>
                      </label>
                    </div>
                  }
                </td>

                <td
                  className="border-b-2 cursor-pointer     border-r-2 p-2  rounded-lg"
                 onClick={() => handleAccApprovedChange(acc)}
                >
                  {
                    <div className="form-control ">
                      <label className="cursor-pointer label">
                        <input
                          type="checkbox"
                          className="toggle toggle-primary"
                          checked={acc.isApproved}
                          onChange={() => handleAccApprovedChange(acc)}
                        />
                        <span className="label-text">{acc.isApproved?"Approved":"Pending"}</span>
                      </label>
                    </div>
                  }
                </td>
                <td
                  className="border-b-2 cursor-pointer     border-r-2 p-2  rounded-lg"
                
                >
                  {
                    <button
                      className="btn btn-outline btn-primary"
                      onClick={() => navigate(`/acc/${acc._id}`)}
                    >
                      View
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccAdmin;
