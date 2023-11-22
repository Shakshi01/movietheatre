import React from 'react';
import './App.css';
import {Routes,Route} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/Signup';
import MovieListings from './components/MovieListings';
import BookTickets from './components/BookTickets';
import Showtimes from './components/Showtimes';
import About from './components/About';
import Contact from './components/Contact';
function App() {
  return (
      <Routes>
        <Route path='*' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/movielistings' element={<MovieListings/>}/>
        <Route path='/showtimes' element={<Showtimes/>}/>
        <Route path='/booktickets' element={<BookTickets/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contactus' element={<Contact/>}/>
      </Routes>
    
    
  );
}

export default App;
