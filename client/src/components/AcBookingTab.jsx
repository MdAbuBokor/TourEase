import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import useFetch from "../../hooks/useFetch";

function AcBookingsTab() {
  const [selected, setSelected] = useState(0);
  const [booking, setBooking] = useState([]);

  const {currentAccommodation} = useSelector((state) => state.accommodation);

  const { data, loading, error } = useFetch(
    "/api/booking/allbookingofacc/" + currentAccommodation._id
  );

  const  handleTogglePaymentStatus = async(id,paymentStatus)=>{
     try {
      Swal.fire({
        title: "Are you sure to toggole ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, toggole it!"
      }).then(async() => {
        const res =await fetch(`/api/booking/updateBooking/${id}`,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"paymentStatus": !paymentStatus}),
        })
 
        const data = await res.json();
        if(data.success===false){
         Swal.fire({
           title: "Error!",
           text: "Something went wrong.",
           icon: "error"
         });
           return;
         }
 
         Swal.fire({
           title: "Success!",
           text: "Payment status has been updated.",
           icon: "success"
         });
        
      })
     
      
     } catch (error) {
       console.log(error)
     }
  }

  useEffect(() => {
    if (data && data.length > 0) {
      setBooking(data);
    }
  }, [data]);

  const handleEdit = (book) => {
    console.log(book);
  }

  const handleDelete = (id) => {
    console.log(id);
  }

  const handleToggleBookingStatus = async (bookingId,isCompleted)=>{
    Swal.fire({
      title: "Are you sure to toggole ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, toggole it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
         
          const res =await fetch(`/api/booking/updateBooking/${bookingId}`,{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"isCompleted": !isCompleted}),
          })
          const data = await res.json();
          //console.log(data)
          
         if(data.success===false){
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error"
          });
            return;
          }
    
          
          Swal.fire({
            title: "Update!",
            text: "Booking has been updated.",
            icon: "success"
          });

          
       
      //    console.log(data)
          
        }
        catch (error) {
          Swal.fire({
            title: "Error 2!",
            text: "Something went wrong. catch",
            icon: "error"
          });
         
          
        }
       
      }
    });
  
   // console.log(formData)
   
  };



  return (
    <div className="mx-auto">
      <div className="flex flex-row gap-4 justify-center mt-10">
        <div
          onClick={() => setSelected(0)}
          className={`btn ${selected === 0 ? "btn-primary" : ""}`}
        >
          Active Booking
        </div>
        <div
          onClick={() => setSelected(1)}
          className={`btn ${selected === 1 ? "btn-primary " : ""}`}
        >
          Completed Booking
        </div>
        <div
          onClick={() => setSelected(2)}
          className={`btn ${selected === 2 ? "btn-primary " : ""}`}
        >
          All Booking
        </div>
      </div>

      {booking.length > 0 && ( // Check for bookings before rendering
          <div className="overflow-x-auto">
            <table className="table ">
              <thead>
                <tr className="text-center">
                  <th>No</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Check-In Date</th>
                  <th>Room No</th>
                  <th>Price</th>
                  <th>Payment Status</th>
                  <th>Booking Status</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {booking
                  .filter((bookingItem) =>
                    selected === 0
                      ? !bookingItem.isCompleted
                      :(selected === 1? bookingItem.isCompleted:true)
                  )
                  .map((bookingItem, index) => (
                    <tr
                      key={bookingItem._id}
                      className={`${
                        index % 2 === 0 ? "bg-base-300" : "bg-base-200"
                      } text-center `}
                    >
                      <td>{index + 1}</td>
                      <td>{bookingItem.name}</td>
                      <td>{bookingItem.phone}</td>
                      <td>{bookingItem.checkInDate.slice(0, 10)}</td>

                      <td>{bookingItem.roomNo}</td>
                      <td>{bookingItem.price}</td>
                      <td>
                        {bookingItem.paymentStatus ? (
                          <span onClick={()=>handleTogglePaymentStatus(bookingItem._id,bookingItem.paymentStatus)} className="btn btn-info py-1 px-3 rounded-lg text-xs font-semibold">
                            Paid
                          </span>
                        ) : (
                          <span  onClick={()=>handleTogglePaymentStatus(bookingItem._id,bookingItem.paymentStatus)}   className="btn btn-info bg-red-400 py-1 px-3 rounded-lg text-xs font-semibold">
                            Pending
                          </span>
                        )}
                      </td>
                      <td>
                        {!bookingItem.isCompleted ? (
                          <span onClick={()=>handleToggleBookingStatus(bookingItem._id,bookingItem.isCompleted)} className="btn btn-info py-1 px-3 rounded-lg text-xs font-semibold">
                            Active
                          </span>
                        ) : (
                          <span onClick={()=>handleToggleBookingStatus(bookingItem._id,bookingItem.isCompleted)} className="btn btn-info bg-red-400 py-1 px-3 rounded-lg text-xs font-semibold">
                            Completed
                          </span>
                        )}
                      </td>
                      {/* <td className="flex gap-2 justify-center">
                        <label
                           htmlFor="my_modal_6"
                          className="btn btn-primary"
                        >
                          Edit
                        </label>
                       

                        <button
                          onClick={() => handleDelete(bookingItem._id)}
                          className="btn btn-error"
                        >
                          Delete
                        </button>
                      </td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      {/* {booking.length > 0 &&
        selected == 2 && ( // Check for bookings before rendering
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th>No</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Check-In Date</th>
                  <th>Room No</th>
                  <th>Price</th>
                  <th>Payment Status</th>
                  <th>Booking Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {booking.map((bookingItem, index) => (
                  <tr
                    key={bookingItem._id}
                    className={`${
                      index % 2 === 0 ? "bg-base-300" : "bg-base-200"
                    } text-center `}
                  >
                    <td>{index + 1}</td>
                    <td>{bookingItem.name}</td>
                    <td>{bookingItem.phone}</td>
                    <td>{bookingItem.checkInDate.slice(0, 10)}</td>

                    <td>{bookingItem.roomNo}</td>
                    <td>{bookingItem.price}</td>
                    <td>
                      {bookingItem.paymentStatus ? (
                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs font-semibold">
                          Paid
                        </span>
                      ) : (
                        <span className="bg-red-400 text-black py-1 px-3 rounded-full text-xs font-semibold">
                          Pending
                        </span>
                      )}
                    </td>
                    <td>
                      {bookingItem.bookingStatus ? (
                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-400 text-black py-1 px-3 rounded-full text-xs font-semibold">
                          Completed
                        </span>
                      )}
                    </td>
                    <td className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(bookingItem._id)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(bookingItem._id)}
                        className="btn btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )} */}

{/* Open the modal using document.getElementById('ID').showModal() method */}




    </div>
  );
}

export default AcBookingsTab;