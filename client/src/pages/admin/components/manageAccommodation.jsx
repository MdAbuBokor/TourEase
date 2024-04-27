import React from 'react'

function manageAccommodation() {
  return (
    <div>
        
        <div className="text-center font-bold text-3xl mt-8">Accommodation</div>
        <div className=" border-sky-200 border-2 rounded-lg mt-10 max-w-7xl mx-auto">
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
       
       

        <table className="w-full">
          <thead>
            <tr className=" items-center border-y-2">
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
                  {acc.isActive ? "Yes" : "No"}
                </td>
                <td className=" text-center justify-center border-r-2 p-2 line-clamp-1">
                  {acc.isBanned ? "Yes" : "No"}
                </td>
              

                <td
                  className="border-b-2 cursor-pointer     border-r-2 p-2  rounded-lg bg-blue-600"
                  onClick={() => handleAccApprovedChange(acc)}
                 
                >
                 {acc.isApproved ? "Yes" : "No"}
                </td>

               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default manageAccommodation