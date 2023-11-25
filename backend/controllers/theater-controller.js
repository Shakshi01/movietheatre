import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin";
import Theater from "../models/Theater";
export const addTheater = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" });
  }

  let adminId;

  // verify token
  jwt.verify(extractedToken, 'mongodb123', (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //create new theater
  const { theaterName, city, capacity} =
    req.body;
  if (
    !theaterName &&
    theaterName.trim() === "" &&
    !city &&
    city.trim() == "" &&
    !capacity
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let theater;
  try {
    theater = new Theater({
      theaterName,
      city,
      capacity,
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await theater.save({ session });
    //adminUser.addedTheaters.push(theater);
    //await adminUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!theater) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ theater });
};

export const getAllTheaters = async (req, res, next) => {
  let theaters;
  console.log("get all theater");
  try {
    theaters = await Theater.find();
    console.log("shakshi all theater",theaters);
  } catch (err) {
    return console.log(err);
  }

  if (!theaters) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ theaters });
};

export const getTheaterById = async (req, res, next) => {
  const id = req.params.id;
  console.log("shakshi theater by id:",id);
  let theater;
  try {
    theater = await Theater.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!theater) {
    console.log("theater id not found");
    return res.status(404).json({ message: "Invalid Theater ID" });
  }

  return res.status(200).json({ theater });
};