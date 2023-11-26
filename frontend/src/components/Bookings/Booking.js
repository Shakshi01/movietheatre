import { Dialog, DialogContent, DialogTitle, Button, FormLabel, TextField, Typography, Select, MenuItem, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking, getAllTheaters } from "../../api-helpers/api-helpers";
import { getTheatersByLocation, updateRewards, getUserDetails} from "../../api-helpers/api-helpers";
import { useCity } from './../CityContext';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({date: "", theater: "" });
  const id = useParams().id;
  console.log(id);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentSource, setPaymentSource] = useState('');
  const {selectedCity, setSelectedCity} = useCity();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const bookingSeatLimit = isUserLoggedIn ? 8 : 1;
  const [pricePerTicket, setPricePerTicket] = useState(0);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [AvailableRewards, setAvailableRewards] = useState(0);
  const [onlineServiceFees, setonlineServiceFees] = useState(1.5);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
    
    if(isUserLoggedIn){
      console.log("userloggedin:", isUserLoggedIn);
      getUserDetails()
        .then((res) => {
          if (res && res.user) {
            console.log("in booking",res);
            setUser(res.user);
            setAvailableRewards(res.user.rewards);
            const servicefee = res.user.membershipType=='premium' ? 0 : 1.5;
            setonlineServiceFees(servicefee);
          }
        })
        .catch((err) => console.log(err));

      
    }

    if(selectedCity==''){
      getAllTheaters()
        .then((res) => setTheaters(res.theaters))
        .catch((err) => console.log(err));
    }
    else{
      getTheatersByLocation(selectedCity)
        .then((res) => setTheaters(res.theaters))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const [seats, setSeats] = useState([]);

  useEffect(() => {
    console.log("selecetedtheater:",selectedTheater);
    if (selectedTheater){
      console.log(selectedTheater.price);
    }
    if (selectedTheater && selectedTheater.capacity) {
      const newSeats = Array.from({ length: selectedTheater.capacity }, (_, index) => ({
        id: index + 1,
        status: 'available' // This could also be 'booked' if you have that info
      }));
      setSeats(newSeats);
    }
    if (selectedTheater && selectedTheater.price) {
      setPricePerTicket(selectedTheater.price);
    } else {
      setPricePerTicket(0);
    }
    console.log("priceperticket",pricePerTicket);
  }, [selectedTheater]);

  const handleOpenPaymentDialog = () => {
    setTotalPrice(seats.filter(seat => seat.status === 'selected').length * pricePerTicket + onlineServiceFees);
    setOpenPaymentDialog(true);
  };
  
  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
  };
  const handlePaymentSourceChange = (event) => {
    setPaymentSource(event.target.value);
  };
  
  const handleFinalizeBooking = (e) => {
    console.log("finilizing payment");
    e.preventDefault();
    console.log("handle submit",inputs);
    try{
      const selectedSeatIds = seats.filter(seat => seat.status === 'selected').map(seat => seat.id);
      console.log("payment source:",paymentSource);
      console.log("Awards available:",AvailableRewards);
      if(paymentSource == 'creditCard' || (paymentSource == 'rewards' && AvailableRewards >= TotalPrice*10)){
        newBooking({ ...inputs, movie: movie._id, seats: selectedSeatIds,  isUserLoggedIn})
          .then((res) => console.log(res))
          .catch((err) => console.log(err));

        if (paymentSource == 'rewards'){
          const newRewards = AvailableRewards - TotalPrice * 10 + TotalPrice;
          setAvailableRewards(newRewards);
          updateRewards(newRewards);
        }
        else{
          const newRewards = AvailableRewards + TotalPrice;
          setAvailableRewards(newRewards);
          updateRewards(newRewards);
        }

        handleClosePaymentDialog();
        alert(`Ticket Booked`);
        //navigate('/movies');
      }
      else{
        alert(`Available Credits not Enough, Book with Credit Crard`);
      }
      
    }
    catch{
      alert(`Ticket Booking Failed!`);
    }
  };
  
  
  const handleSeatClick = (seatId) => {
    const selectedSeatsCount = seats.filter(seat => seat.status === 'selected').length;
    const isCurrentlySelected = seats.find(seat => seat.id === seatId).status === 'selected';
  
    if (selectedSeatsCount < bookingSeatLimit || isCurrentlySelected) {
      // Toggle seat selection
      const updatedSeats = seats.map(seat => seat.id === seatId
        ? { ...seat, status: seat.status === 'selected' ? 'available' : 'selected' }
        : seat);
      setSeats(updatedSeats);
    } else {
      // Optionally alert the user that the maximum number of seats has been reached
      alert(`You can select up to ${bookingSeatLimit} seats.`);
    }
  };
  
  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === 'theater') {
      setSelectedTheater(e.target.value);
    }
  };
  const [theaters, setTheaters] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit",inputs);
    const selectedSeatIds = seats.filter(seat => seat.status === 'selected').map(seat => seat.id);
    newBooking({ ...inputs, movie: movie._id, seats: selectedSeatIds })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    handleClosePaymentDialog();
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
                      <MenuItem key={index} value={theater}>{theater.theaterName}</MenuItem>
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
                  <Box marginBottom={5}></Box>
                  <FormLabel>Seat Selection</FormLabel>
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
                  <Box>
                    <Grid container spacing={1}>
                      {seats.map(seat => (
                        <Grid item key={seat.id}>
                          <Button
                            variant={seat.status === 'selected' ? 'contained' : 'outlined'}
                            onClick={() => handleSeatClick(seat.id)}
                            disabled={seat.status === 'booked'}
                          >
                            {seat.id}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  <Button type="button" sx={{ mt: 3 }} onClick={handleOpenPaymentDialog}>
                    Book Now
                  </Button>
                  <Dialog open={openPaymentDialog} onClose={handleClosePaymentDialog}>
                    <DialogTitle>Payment Information</DialogTitle>
                    <DialogContent>
                      <Typography variant="h6" sx={{ my: 2 }}>
                        Number of Tickets: {seats.filter(seat => seat.status === 'selected').length}
                        <br />
                        Price per Ticket: ${pricePerTicket}
                        <br />
                        Online Service Fees: ${onlineServiceFees}
                        <br />
                        Total Price: ${TotalPrice}
                      </Typography>
                      <Select
                        value={paymentSource}
                        onChange={handlePaymentSourceChange}
                        displayEmpty
                        fullWidth
                      >
                        <MenuItem value="">
                        </MenuItem>
                        {isUserLoggedIn && (<MenuItem value="rewards">Rewards (Available:{AvailableRewards})</MenuItem>)}
                        <MenuItem value="creditCard">Credit Card (xxxx xxxx xxxx xxxx)</MenuItem>
                      </Select>
                      <Button type="submit" sx={{ mt: 3 }} onClick={handleFinalizeBooking}>
                        Finalize Booking
                      </Button>
                    </DialogContent>
                  </Dialog>
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