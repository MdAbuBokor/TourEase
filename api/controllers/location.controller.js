import Location from "../models/locations.model.js";

export const getAllLocations = async (req, res, next) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};

export const createLocation = async (req, res, next) => {
  try {
    const newLocation = await Location.create(req.body);
    res.status(200).json(newLocation);
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedLocation);
  } catch (error) {
    next(error);
  }
};

export const deleteLocation = async (req, res, next) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedLocation);
  } catch (error) {
    next(error);
  }
};
