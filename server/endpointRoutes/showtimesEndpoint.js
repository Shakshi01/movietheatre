const express = require('express');
const router = express.Router();
const Showtimes = require('../models/showtimesModel');

router.get('/showtimes', async (request, response) => {
    try {
        const showtimes = await Showtimes.find({});
        return response.status(200).json(showtimes);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.get('/showtimes/:id', async (request, response) => {
    try {
        const { id }  = request.params;
        const showtime = await Showtimes.findById(id);
        return response.status(200).json(showtime);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.post('/showtimes', async (request, response) => {
    try {
        console.log(request.body);
        if (
            !request.body.movieid || !request.body.showDate || !request.body.showStartTime || !request.body.price || !request.body.screen_id || !request.body.seats_booked 
        ) {
            return response.status(400).send({
                message : 'Send all required fields'
            });
        }
        const newShowTime = {
            movieid : request.body.movieid,
            showDate : request.body.showDate,
            showStartTime : request.body.showStartTime,
            price : request.body.price,
            screen_id : request.body.screen_id,
            seats_booked : request.body.seats_booked
        }

        const showtime = await Showtimes.create(newShowTime);
        return response.status(200).json(showtime);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});


router.put('/showtimes/:id', async (request, response) => {
    try {
        console.log(request.body);
        if (
            !request.body.movieid || !request.body.showDate || !request.body.showStartTime || !request.body.price || !request.body.screen_id || !request.body.seats_booked 
        ) {
            return response.status(400).send({
                message : 'Send all required fields'
            });
        }
        const { id } = request.params;
        const showtime = await Showtimes.findByIdAndUpdate(id, request.body);
        if (!showtime) {
            return response.status(404).json({ message : 'Showtime not found.'});
        }
        return response.status(200).json({ message : 'Showtime updated successfully.'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.delete('/showtimes/:id', async (request, response) => {
    try {
        const { id }  = request.params;
        const showtime = await Showtimes.findByIdAndDelete(id);
        if(!showtime){
            return response.status(404).json({ message : 'Showtime not found'});
        }
        return response.status(200).json({ message : 'Showtime deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

module.exports = router;