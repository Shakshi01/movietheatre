// Header.js
import React from "react";
/*import { useNavigate } from "react-router-dom";*/
/*import { Link } from "react-router-dom";*/


const Header = () => {

  return (
    <header>
      <div className="mainHeaderDiv">
        <nav>
          <ul>
          <a href="/" className="link">Home</a>
          <a href="/movielistings" className="link">Movies</a>
          <a href="/about" className="link">About</a>
          <a href="/contactus" className="link">Contact</a>
          </ul>
          
        </nav>
        <div className="sign">
          <a href="/login" className="link"> Sign In</a><a href="/signup" className="link">Sign Up </a>
        </div>

      </div>
    </header>
  );
};

export default Header;
