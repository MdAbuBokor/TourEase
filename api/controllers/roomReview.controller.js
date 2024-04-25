import RoomReview from "../models/roomReview.model.js";

export const createRoomReview = async (req, res, next) => {
  try {
    const newreview = await RoomReview.create(req.body);
    res.status(200).json(newreview);
  } catch (error) {
    next(error);
  }
};

export const getReviewofAcc = async (req, res, next) => {
  try {
    // Populate reviews with booking details (including all fields)
    const review = await RoomReview.find().populate("bookingId"); // Populate all fields from bookingId
    const filteredReview = review.filter((rev) => {
      // Use Mongoose's comparison method for ObjectIds
      return rev.bookingId.accommodationId.equals(req.params.accommodationId);
    });

    if (!filteredReview || filteredReview.length === 0) {
      // Handle case where no reviews found for accommodation ID
      return res
        .status(404)
        .json({ message: "No reviews found for this accommodation ID" });
    }

    res.status(200).json(filteredReview);
  } catch (error) {
    // Handle database errors or other exceptions
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAvgRatingOfAcc = async (req, res, next) => {
  try {
    // Populate reviews with booking details (including all fields)
    const review = await RoomReview.find().populate("bookingId"); // Populate all fields from bookingId
    const filteredReview = review.filter((rev) => {
      // Use Mongoose's comparison method for ObjectIds
      return rev.bookingId.accommodationId.equals(req.params.accommodationId);
    });

    if (!filteredReview || filteredReview.length === 0) {
      // Handle case where no reviews found for accommodation ID
      return res.status(404).json({ avgRating: 5 });
    }
    let total = 0;
    filteredReview.forEach((rev) => {
      total += rev.rating;
    });
    total = total / filteredReview.length;
    res.status(200).json({ avgRating: total });
  } catch (error) {
    // Handle database errors or other exceptions
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
