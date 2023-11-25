import express from "express";
import Theater from "../models/Theater";
import {
  addTheater,
  getAllTheaters,
  getTheaterById,
} from "../controllers/theater-controller";
const theaterRouter = express.Router();
const locationRouter = express.Router();
theaterRouter.get("/", getAllTheaters);
theaterRouter.get("/:id", getTheaterById);
theaterRouter.post("/", addTheater);

locationRouter.get('/', async (request, response) => {
  try {
      console.log("get all cities............");
      const locations = await Theater.distinct('city');
      return response.status(200).json(locations);
  } catch (error) {
      console.log(error.message);
      response.status(500).send({message : error.message});
  }
});

locationRouter.get('/:place', async (request, response) => {
  try {
      const { place } = request.params;
      const theatres = await Theater.find({ city : place});
      return response.status(200).json(theatres);
  } catch (error) {
      console.log(error.message);
      response.status(500).send({message : error.message});
  }
});

theaterRouter.put('/:id', async (request, response) => {
  try {
      console.log(request.body);
      if (
          !request.body.theatreName || !request.body.city 
      ) {
          return response.status(400).send({
              message : 'Send all required fields'
          });
      }
      const { id } = request.params;
      const theatre = await Theatres.findByIdAndUpdate(id, request.body);
      if (!theatre) {
          return response.status(404).json({ message : 'Theatre not found.'});
      }
      return response.status(200).json({ message : 'Theatre updated successfully.'});

  } catch (error) {
      console.log(error.message);
      response.status(500).send({message : error.message});
  }
});

theaterRouter.delete('/:id', async (request, response) => {
  try {
      const { id }  = request.params;
      const theatre = await Theatres.findByIdAndDelete(id);
      if(!theatre){
          return response.status(404).json({ message : 'Theatre not found'});
      }
      return response.status(200).json({ message : 'Theatre deleted successfully'});
  } catch (error) {
      console.log(error.message);
      response.status(500).send({message : error.message});
  }
});

export default theaterRouter;