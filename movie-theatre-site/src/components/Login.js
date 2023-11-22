import React from 'react';
import Header from './Header';

function Login() {
    return (
        <><Header /><div className="auth-container">
            <h2>Login to Movie Theatre</h2>
            <form>
                <input type="text" placeholder="Username" className="auth-input" />
                <input type="password" placeholder="Password" className="auth-input" />
                <button className="auth-button">Login</button>
            </form>
            <div className="additional-info">
                Don't have an account? <a href="/signup">Sign Up</a>
            </div>
        </div></>
    );
}

export default Login;
