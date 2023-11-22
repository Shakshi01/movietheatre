import React from 'react';
import Header from './Header';
function Signup() {
    return (
        <><div><Header /></div><div className="auth-container">

            <h2>Sign Up for Movie Theatre</h2>
            <form>
                <input type="text" placeholder="First Name" className="auth-input" />
                <input type="text" placeholder="Last Name" className="auth-input" />
                <input type="email" placeholder="Email Address" className="auth-input" />
                <input type="text" placeholder="Phone Number" className="auth-input" />
                <input type="text" placeholder="Username" className="auth-input" />
                <input type="password" placeholder="Password" className="auth-input" />
                
                

                <div className="membership-type">
                    <label>Membership Type: </label>
                    <select className="auth-select">
                        <option value="regular">Regular</option>
                        <option value="premium">Premium</option>
                    </select>
                </div>

                <button className="auth-button">Sign Up</button>
            </form>
            <div className="additional-info">
                Already have an account? <a href="/login">Login</a>
            </div>
        </div></>
    );
}

export default Signup;
