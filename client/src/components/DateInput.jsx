import React from "react";

import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";


function DateInput({options,selectedDate, setSelectedDate})
{
  

 

 const handleDateChange = (selectedDates) => {
   
    setSelectedDate(selectedDates);
    
  }

return (
  <div className="border border-green-400">
    <div className="border border-gray-300">
      <Flatpickr
      className="w-full"
        options={options}
        onChange={handleDateChange}
        value={selectedDate}
      />
    </div>
  </div>
);
}
export default DateInput;