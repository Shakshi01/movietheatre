import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios.get("/movie").catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }

  const data = await res.data;
  console.log("shakshi1....");
  console.log(data);
  return data;
};

export const getAllTheaters = async () => {
  const res = await axios.get("/theater").catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }

  const data = await res.data;
  console.log("theatersall:",data);
  return data;
};


export const getTheatersByLocation = async (location) => {
  console.log("get theaters by location:", location)
  console.log(`/locations/${location}`);
  const res = await axios.get(`/locations/${location}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }

  const data = await res.data;
  console.log("theatersbylocation:",data);
  return data;
};

export const fetchCities = async () => {
  const res = await axios.get("/locations").catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }

  const data = await res.data;
  console.log("cities:",data);
  return data;
};

export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      username:data.username,
      password: data.password,
      membership: data.membership,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const sendAdminAuthRequest = async (data) => {
  console.log("admin login:", data);
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpectyed Error");
  }

  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async (id) => {
  console.log("movie id:",id);
  const res = await axios.get(`/movie/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const newBooking = async (data) => {
  console.log(data);
  let user = data.isUserLoggedIn ? localStorage.getItem("userId") :  ''; 
  console.log("isuserloogedin:", data.isUserLoggedIn);
  console.log("userid in booking:", localStorage.getItem("userId"));
  console.log("useridfinal", user);
  const res = await axios
    .post("/booking", {
      movie: data.movie,
      seats: data.seats,
      date: data.date,
      theaterId:data.theater._id,
      user: user,
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/user/bookings/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  console.log("data:",resData);
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  console.log("getuserbyid:",id);
  const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  console.log("user:", resData);
  console.log("user:", resData.user);
  return resData;
};

export const updateRewards = async (changeRewards) => {
  console.log("changerewards:", changeRewards);
  try {
    const resData = await getUserDetails();
    if (!resData || !resData.user) {
      console.log("User not found");
      return;
    }
    const user = resData.user;
    console.log("in updaterewards:", user);

    const updatedData = {
      rewards: user.rewards + changeRewards,
    };

    console.log("updateddata:", updatedData);
    console.log("userid:", user._id);
    updateUser(user._id, updatedData);
  } catch (error) {
    console.error("Error in updateRewards:", error);
  }
};

export const updateUser = async (userId, updatedData) => {
  try{
    const res = await axios
      .put(`/user/${userId}`, {
        updatedData,
      })
      .catch((err) => console.log(err));

    if (res.status !== 200 && res.status !== 201) {
      console.log("Unexpected Error Occurred");
    }

    const resData = await res.data;
    return resData;
  }
  catch(error){
    console.error('There was an error during update:', error);
  }
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        movieName: data.movieName,
        description: data.description,
        date: data.date,
        img: data.img,
        language: data.language,
        length: data.length,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const addTheater = async (data) => {
  const res = await axios
    .post(
      "/theater",
      {
        theaterName: data.theaterName,
        city: data.city,
        capacity: data.capacity,
        price: data.price,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`/admin/${adminId}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};