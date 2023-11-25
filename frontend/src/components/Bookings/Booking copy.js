import { Button, FormLabel, TextField, Typography, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking, getAllTheaters } from "../../api-helpers/api-helpers";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "", theater: "" });
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));

    getAllTheaters()
      .then((res) => setTheaters(res.theaters))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (theaterCapacity) {
      const newSeats = Array.from({ length: theaterCapacity }, (_, i) => ({
        id: i + 1,
        status: 'available' // could be 'available', 'booked', or 'selected'
      }));
      setSeats(newSeats);
    }
  }, [theaterCapacity]);

  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const [theaters, setTheaters] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
            Book Tickets Of Movie: {movie.movieName}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              display={"flex"}
              justifyContent={"column"}
              flexDirection="column"
              paddingTop={3}
              width="50%"
              marginRight={"auto"}
            >
              <img
                width="80%"
                height={"300px"}
                src={movie.img}
                alt={movie.movieName}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date: {new Date(movie.date).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display="flex"
                  flexDirection={"column"}
                >
                  <FormLabel>Theater</FormLabel>
                  <Select
                    name="theater"
                    value={inputs.theater}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="">
                    </MenuItem>
                    {theaters.map((theater, index) => (
                      <MenuItem key={index} value={theater._id}>{theater.theaterName}</MenuItem>
                    ))}
                  </Select>
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
                  />

                  <Box
                    sx={{
                      height: '50px', // Adjust the height as needed
                      backgroundColor: 'darkgray', // Screen color
                      borderRadius: '50px / 10px', // This creates the curved effect
                      textAlign: 'center',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginY: 2 // Adds vertical space around the screen
                    }}
                  >
                    <Typography variant="h6">Screen</Typography>
                  </Box>


                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type={"number"}
                    margin="normal"
                    variant="standard"
                  />
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;