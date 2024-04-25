import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function MyBookingsTab() {
  const [selected, setSelected] = useState(0);
  const [booking, setBooking] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const { data, loading, error } = useFetch(
    "/api/booking/allbookingofuser/" + currentUser._id
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setBooking(data);
    }
  }, [data]);

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
      </div>

      {booking.length > 0 && ( // Check for bookings before rendering
        <div>
          {selected === 0 ? (
            <div key={booking[0]._id}> {/* Use first element's ID if data exists */}
              <div className="text-center mt-8">
                <h1 className="text-2xl font-bold mb-4">You Have {booking.filter((bookingItem) => !bookingItem.isCompleted).length} Active Booking</h1>
              </div>
              {/* Content for active bookings */}
            </div>
          ) : (
            <div>
              <div className="text-center mt-8">
                <h1 className="text-2xl font-bold mb-4">You Have {booking.filter((bookingItem) => bookingItem.isCompleted).length} Completed Booking</h1>
              </div>
              {/* Content for previous bookings */}
            </div>
          )}
        </div>
      )}

{selected === 0 ? (
  <div className="grid grid-cols-1  gap-4 ">
  {booking.filter((bookingItem) => bookingItem.isCompleted===false).map((bookingItem) => (
    <div key={bookingItem._id} className="bg-base-300 rounded-lg shadow-lg p-4 mx-auto max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{bookingItem.name}</h2>
        {bookingItem.paymentStatus ? (
          <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs font-semibold">
           Payment Status : Paid
          </span>
        ) : (
          <span className="bg-red-400 text-black py-1 px-3 rounded-full text-xs font-semibold">
            Payment Status : Pending
          </span>
        )}
      </div>
      <img src={bookingItem.roomPhoto} alt="Room Photo" className=" rounded-t-lg" />
      <div className="p-4">
        <p className="mb-2">
          <strong>Check-In Date:</strong> {bookingItem.checkInDate.toString()}
        </p>
        <p className="mb-2">
                <strong>Accommodation:</strong> {bookingItem.accommodationId.name}
              </p>
              <p className="mb-2 ">
                <strong>Room Number:</strong> {bookingItem.roomId.roomNumber}
              </p>
              <p className="mb-2">
                <strong>Price:</strong> {bookingItem.price}
              </p>
              <div className="flex justify-between items-center">
                <Link to={`/acc/${bookingItem.accommodationId._id}`}>
                <button className="btn btn-secondary">Show Accommodation</button>
                </Link>
                <Link to={`/acc/${bookingItem.accommodationId._id}`}>
                
                </Link>
                {/* <Link to={`/acc/${bookingItem.accommodationId._id}`}>
                <button className="btn btn-accent">Review</button>
                </Link> */}
        </div>
      </div>
    </div>
  ))}
 
</div>
):(
  <div className="grid grid-cols-1  gap-4 ">
    
        {booking.filter((bookingItem) => bookingItem.isCompleted).map((bookingItem) => (
          <div key={bookingItem._id} className="bg-base-300 rounded-lg shadow-lg p-4 mx-auto max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{bookingItem.name}</h2>
              {bookingItem.paymentStatus ? (
                <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs font-semibold">
                 Payment Status : Paid
                </span>
              ) : (
                <span className="bg-red-400 text-black py-1 px-3 rounded-full text-xs font-semibold">
                  Payment Status : Pending
                </span>
              )}
            </div>
            <img src={bookingItem.roomPhoto} alt="Room Photo" className=" rounded-t-lg" />
            <div className="p-4">
              <p className="mb-2">
                <strong>Check-In Date:</strong> {bookingItem.checkInDate.toString()}
              </p>
              <p className="mb-2">
                <strong>Accommodation:</strong> {bookingItem.accommodationId.name}
              </p>
              <p className="mb-2 ">
                <strong>Room Number:</strong> {bookingItem.roomId.roomNumber}
              </p>
              <p className="mb-2">
                <strong>Price:</strong> {bookingItem.price}
              </p>
              <div className="flex justify-between items-center">
                <Link to={`/acc/${bookingItem.accommodationId._id}`}>
                <button className="btn btn-secondary">Show Accommodation</button>
                </Link>
               
                <Link to={`/review/${bookingItem._id}`}>
                <button className="btn btn-accent">Review</button>
                </Link>
               
                
              </div>
            </div>
          </div>
        ))}
       
      </div>
)}


    </div>
  );
}

export default MyBookingsTab;