import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import useFetch from '../../hooks/useFetch.js';
import AddRoom from './AddRoom.jsx';

export default function RoomsComponent() {
  const { currentAccommodation } = useSelector(state => state.accommodation);
  const { data, loading, error } = useFetch(
    "/api/accommodation/getRooms/" + currentAccommodation._id
  );
  const [rooms, setRooms] = useState([]);
  const [Add,setAdd]=useState(false);
//   console.log(currentAccommodation)
//   console.log(data);

useEffect(() => {
  if (data) {
    setRooms(data);
  }
}, [data]);

//sort rooms by roomNumber

// const sortedRooms = [...rooms].sort((a, b) => a.roomNumber - b.roomNumber);
//setRooms(sortedRooms);





const handleAvailability = async (roomId,isAvailable)=>{
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, toggole it!"
  }).then(async(result) => {
    if (result.isConfirmed) {
      try {
       
        const res =await fetch(`/api/room/updateRoom/${currentAccommodation._id}?roomId=${roomId}`,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"availability": !isAvailable}),
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
          text: "Room has been updated.",
          icon: "success"
        });
        setRooms(prevRooms => prevRooms.map(room => {
          if (room._id === roomId) {
            return {
              ...room,
              availability: !isAvailable
            };
          }
          return room;
        }));
        
     
    //    console.log(data)
        
      }
      catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. catch",
          icon: "error"
        });
       
        
      }
     
    }
  });

 // console.log(formData)
 
}




 const handleDelete = async (roomId)=>{
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
          if (result.isConfirmed) {
            try {
             
              const res =await fetch(`/api/room/deleteRoom/${currentAccommodation._id}?roomId=${roomId}`,{
                method: 'DELETE',
                headers:{
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(),
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
                title: "Deleted!",
                text: "Room has been deleted.",
                icon: "success"
              });
              setRooms(rooms.filter(room => room._id !== roomId));
           
          //    console.log(data)
              
            }
            catch (error) {
              Swal.fire({
                title: "Error!",
                text: "Something went wrong. catch",
                icon: "error"
              });
             
              
            }
           
          }
        });
    
       // console.log(formData)
       
      }


    return (

    <div className=" border-sky-200 border-2 rounded-lg mt-10 max-w-7xl">
 <button className='bg-sky-400 text-white p-2 rounded-lg' onClick={() => setAdd(!Add)} >
     {Add ? "Close " : "Add Room + "}
    </button>

    {Add && <AddRoom />}
        <table className="w-full">
            <thead>
                <tr className="text-center bg-green-400 items-center">
                    <th className='font-bold justify-center border-r-2 p-2 '>Room Number</th>
                    <th className='font-bold justify-center border-r-2 p-2 '>Available</th>
                    <th className='font-bold justify-center border-r-2 p-2 '>Capacity</th>
                    <th className='font-bold justify-center border-r-2 p-2 '>Price</th>
                    <th className='font-bold justify-center border-r-2 p-2 hidden '>Description</th>
                    <th className='font-bold justify-center border-r-2 p-2 '>Edit</th>
                    <th className='font-bold justify-center border-r-2 p-2 '>Delete</th>
                </tr>
            </thead>
            <tbody>
                {rooms?.map((room, index) => (
                   <tr key={room._id} className={index % 2 === 0 ? 'bg-gray-100 border-b-2' : 'bg-gray-300 border-b-2'}>
                        <td  className='  text-center justify-center border-r-2 p-2 '>{room.roomNumber}</td>
                        <td onClick={()=>handleAvailability(room._id,room.availability)} className={`cursor-pointer text-center justify-center border-r-2 p-2 rounded-full  ${room.availability ? 'bg-green-600' : 'text-red-600'}`}>
                        {room.availability ? 'Yes' : 'No'}
                       </td>

                        <td className=' text-center justify-center border-r-2 p-2 '>{room.capacity}</td>
                        <td className=' text-center justify-center border-r-2 p-2 '>{room.pricePerNight}</td>
                        <td className='  text-center justify-center border-r-2 p-2 hidden  max-w-2xl'>{room.description}</td>

                        <td className=' text-center justify-center border-r-2 p-2 '>Edit</td>
                      
                        <td  onClick={() => handleDelete(room._id)} className='border-b-2 cursor-pointer text-center justify-center border-r-2 p-2 bg-red-600 rounded-lg'><button>Delete</button></td>
                        
                    </tr>
                ))}
            </tbody>

        </table>
    </div>
  );
}














  // const Columns = [
  //   {
  //       Header: 'Room Number',
  //       accessor: 'roomNumber'
  //   },

  //   {
  //       Header: 'Capacity',
  //       accessor: 'capacity'
  //   },
  //   {
  //       Header: 'Price',
  //       accessor: 'pricePerNight'
  //   },
  //   {
  //       Header: 'Description',
  //       accessor: 'description'
  //   }

  // ];



// const columns = useMemo(() => Columns, [])
// const data1 = useMemo(() => data, [data])

// const tableInstance =useTable({ Columns, data })
// const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow
// } = tableInstance;


  
    // <table {...getTableProps()}>
    //     <thead >
    //         {headerGroups.map(headerGroup => (
    //         <tr {...headerGroup.getHeaderGroupProps()} >
    //             {headerGroup.headers.map(column => (
    //             <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    //             ))}
               
    //         </tr>
                
    //         ))
    //         }
           
    //     </thead>
    //     <tbody {...getTableBodyProps()}>
    //         {
    //             rows.map(row => {
    //                 prepareRow(row)
    //                 return (
    //                     <tr {...row.getRowProps()}>
    //                         {row.cells.map(cell => {
    //                             return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
    //                         })}
    //                     </tr>
    //                 )
    //             })
    //         }
           
    //     </tbody>
    // </table>
    // <div className="grid grid-flow-row mt-10 gap-1">
    
    //     {/* Header */}
    //     <div className="grid grid-flow-col gap-0">
    //       <div className="h-auto font-bold border-r-2 p-2 bg-green-600 items-center justify-center w-30">
    //         <p>Room Number</p>
    //       </div>
    //       <div className="h-auto font-bold border-r-2 p-2 bg-green-600 items-center justify-center w-25">
    //         <p>Available</p>
    //       </div>
    //       <div className="h-auto font-bold border-r-2 p-2 bg-green-600 items-center justify-center w-25">
    //         <p>Capacity</p>
    //       </div>
    //       <div className="h-auto font-bold border-r-2 p-2 bg-green-600 items-center justify-center w-20">
    //         <p>Price</p>
    //       </div>
    //       <div className="h-auto font-bold border-r-2 p-2 bg-green-600 items-center justify-center hidden md:flex w-25">
    //         <p>Description</p>
    //       </div>
    //       <div className="h-auto font-bold border-r-2 p-2 bg-green-600 items-center justify-center w-20">
    //         <p>Edit</p>
    //       </div>
    //       <div className="h-auto font-bold border-r-2 p-2 bg-green-600 items-center justify-center w-20">
    //         <p>Delete</p>
    //       </div>
    //     </div>

    //     {/* Data Rows */}
    //     {data?.map((room) => (
    //       <div key={room.id} className={`grid grid-flow-col gap-0 'even:bg-gray-100' : 'odd:bg-white`}>
    //         <div className="h-auto font-bold border-r-2 p-2 bg-green-600 items-center  w-30">
    //           <p className='mx-auto'>{room.roomNumber}</p>
    //         </div>
    //         <div className="h-auto font-bold border-r-2 p-2 bg-green-600 items-center justify-center w-25">
    //           <p>{room.available}</p>
    //         </div>
    //         <div className="h-auto font-bold border-r-2 p-2 bg-green-600 items-center justify-center w-25">
    //           <p>{room.capacity}</p>
    //         </div>
    //         <div className="h-auto font-bold border-r-2 p-2 bg-green-600 items-center justify-center w-20">
    //           <p>{room.pricePerNight}</p>
    //         </div>
    //         <div className="h-auto font-bold border-r-2 p-2 bg-green-600 items-center justify-center hidden md:flex w-25">
    //           <p>{room.description}</p>
    //         </div>
    //         <div className="h-auto font-bold border-r-2 p-2 bg-green-600 items-center justify-center w-20">
    //           <p>Edit</p>
    //         </div>
    //         <div className="h-auto font-bold border-r-2 p-2 bg-green-600 items-center justify-center w-20">
    //           <p>Delete</p>
    //         </div>
    //       </div>
    //     ))}
      
    // </div>