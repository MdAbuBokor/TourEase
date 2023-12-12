
export const test = (req, res) => {
    res.send("Hello Accomodation!! !");
  };
  
  
  import bcryptjs from "bcryptjs";
  import dotenv from "dotenv";
  dotenv.config();
  
  import jwt from "jsonwebtoken";
  import Accommodation from "../models/accomodation.model.js";
  import Room from "../models/room.model.js";
  import { errorHandler } from "./../utils/error.js";
  export const createRoom = async (req, res, next) => {

  
    const newRoom = new Room(req.body);
    try {
        
      await newRoom.save();

  
      res.status(201).json("new room has been saved");
    } catch (error) {
      next(error);
    }
  };
  
  export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validAccomodation = await Accommodation.findOne({ email });
      if (!validAccomodation)
        return next(errorHandler(404, "Accomodation not found"));
  
      const validPassword = bcryptjs.compareSync(
        password,
        validAccomodation.password
      );
      if (!validPassword) return next(errorHandler(401, "Wrong Credintials!"));
  
      const token = jwt.sign(
        { id: validAccomodation._id },
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = validAccomodation._doc;
      res
        .cookie("accomodation_access_token ", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };
  