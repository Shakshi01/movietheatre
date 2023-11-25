import {
    Box,
    Button,
    Checkbox,
    FormLabel,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { addTheater } from "../../api-helpers/api-helpers";
  const labelProps = {
    mt: 1,
    mb: 1,
  };
  const AddTheater = () => {
    const [inputs, setInputs] = useState({
      theaterName: "",
      city: "",
      capacity: "",
    });
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const handleIncrement = () => {
      setInputs(prevInputs => ({
        ...prevInputs,
        capacity: parseInt(prevInputs.capacity, 10) + 1
      }));
    };
    
    const handleDecrement = () => {
      setInputs(prevInputs => ({
        ...prevInputs,
        capacity: Math.max(parseInt(prevInputs.capacity, 10) - 1, 0) // Prevents negative numbers
      }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(inputs);
      addTheater({ ...inputs })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Box
            width={"50%"}
            padding={10}
            margin="auto"
            display={"flex"}
            flexDirection="column"
            boxShadow={"10px 10px 20px #ccc"}
          >
            <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
              Add New Theater
            </Typography>
            <FormLabel sx={labelProps}>Theater Name</FormLabel>
            <TextField
              value={inputs.theaterName}
              onChange={handleChange}
              name="theaterName"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>City</FormLabel>
            <TextField
              value={inputs.city}
              onChange={handleChange}
              name="city"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Theator Capacity</FormLabel>
            <TextField
              type="number"
              value={inputs.capacity}
              onChange={handleChange}
              name="capacity"
              margin="normal"
            />
            
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "30%",
                margin: "auto",
                bgcolor: "#2b2d42",
                ":hover": {
                  bgcolor: "#121217",
                },
              }}
            >
              Add New Theater
            </Button>
          </Box>
        </form>
      </div>
    );
  };
  
  export default AddTheater;