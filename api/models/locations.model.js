import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
   name : {
       type : String,
       required : true
   },
   photo: {
       type: String,
       default:
         "https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg",
   },
   description: {
       type: String,
   },
   longitude: {
       type: String,
   },
   latitude: {
       type: String,
   },
});

const Location = mongoose.model("Location", LocationSchema);

export default Location;
