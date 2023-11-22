import React, { useState, useEffect } from "react";
import Header from "./Header";

const MovieListings = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("/movies")
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) =>
                console.error("There was an error fetching movies:", error)
            );
    }, []);

    return (
        <div className="mainListing">
            <Header />
            <ul className="movies-list">
                {movies.map((movie) => (
                    <li key={movie._id} className="movie-tile">
                        <img src={`${movie.img}`}alt={movie.movieName} className="movie-image"/>
                        <div>
                            <h2>{movie.movieName}</h2>
                            <p>Status: {movie.status}</p>
                            <p>Description: {movie.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieListings;