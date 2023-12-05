import express from "express";
import {
  addMovie,
  getAllMovies,
  getMovieById,
  editMovies,
  deleteMovie,
} from "../controllers/movie-controller.js";
const movieRouter = express.Router();
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.put("/:id", editMovies);
movieRouter.post("/", addMovie);
movieRouter.delete("/:id", deleteMovie);

export default movieRouter;