const express = require('express');
const router = express.Router();
const Movies = require('../models/moviesModel');

router.get('/movies', async (request, response) => {
    try {
        const { status } = request.query;
        if(status)
        {
            const movies = await Movies.find({ status : status});
            return response.status(200).json(movies);
        }
        const movies = await Movies.find({});
        return response.status(200).json(movies);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.get('/movies/:id', async (request, response) => {
    try {
        const { id }  = request.params;
        const movie = await Movies.findById(id);
        return response.status(200).json(movie);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.post('/movies', async (request, response) => {
    try {
        console.log(request.body);
        if (
            !request.body.movieName || !request.body.status || !request.body.description || !request.body.language || !request.body.length
        ) {
            return response.status(400).send({
                message : 'Send all required fields'
            });
        }
        const newMovie = {
            movie_id : request.body.movie_id,
            movieName : request.body.movieName,
            status : request.body.status,
            description : request.body.description,
            language : request.body.language,
            length : request.body.length,
            date : request.body.date,
            img : request.body.img,
            rating : request.body.rating
        }

        const movie = await Movies.create(newMovie);
        return response.status(200).json(movie);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.put('/movies/:id', async (request, response) => {
    try {
        console.log(request.body);
        if (
            !request.body.movieName || !request.body.status || !request.body.description || !request.body.language || !request.body.length
        ) {
            return response.status(400).send({
                message : 'Send all required fields'
            });
        }
        const { id } = request.params;
        const movie = await Movies.findByIdAndUpdate(id, request.body);
        if (!movie) {
            return response.status(404).json({ message : 'Movie not found.'});
        }
        return response.status(200).json({ message : 'Movie updated successfully.'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.delete('/movies/:id', async (request, response) => {
    try {
        const { id }  = request.params;
        const movie = await Movies.findByIdAndDelete(id);
        if(!movie){
            return response.status(404).json({ message : 'Movie not found'});
        }
        return response.status(200).json({ message : 'Movie deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

module.exports = router;