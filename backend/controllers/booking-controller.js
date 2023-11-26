import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import Movie from "../models/Movie";
import User from "../models/User";

export const newBooking = async (req, res, next) => {
  const { movie, date, seats, user, theaterId } = req.body;
  console.log(req.body);

  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = user=='' ? false : await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }
  if (!existingUser) {
    console.log("No User logged in");
    //return res.status(404).json({ message: "User not found with given ID " });
  }
  let booking;

  try {
    if (existingUser){
      booking = new Bookings({
        userId:user,
        theaterId:theaterId,
        movieId:movie,
        seats:seats,
        date: new Date(`${date}`),
      });
    }
    else{
      booking = new Bookings({
        theaterId:theaterId,
        movieId:movie,
        seats:seats,
        date: new Date(`${date}`),
      });
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    if(existingUser){
      existingUser.bookings.push(booking);
    }
    existingMovie.bookings.push(booking);
    if(existingUser){
      await existingUser.save({ session });
    }
    await existingMovie.save({ session });
    await booking.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }

  return res.status(201).json({ booking });
};

export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  console.log("shakshi movie booking");
  console.log(id);
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findByIdAndRemove(id).populate("userId movieId");
    console.log(booking);
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.userId.bookings.pull(booking);
    await booking.movieId.bookings.pull(booking);
    await booking.movieId.save({ session });
    await booking.userId.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};