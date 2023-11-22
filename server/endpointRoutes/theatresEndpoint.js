const express = require('express');
const router = express.Router();
const Theatres = require('../models/theatresModel');

router.get('/locations', async (request, response) => {
    try {
        const locations = await Theatres.distinct('city');
        return response.status(200).json(locations);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.get('/locations/:place', async (request, response) => {
    try {
        const { place } = request.params;
        const theatres = await Theatres.find({ city : place});
        return response.status(200).json(theatres);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.get('/theatres', async (request, response) => {
    try {
        const theatres = await Theatres.find({});
        return response.status(200).json(theatres);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.get('/theatres/:id', async (request, response) => {
    try {
        const { id }  = request.params;
        const theatre = await Theatres.findById(id);
        return response.status(200).json(theatre);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.post('/theatres', async (request, response) => {
    try {
        if (
            !request.body.theatreName || !request.body.city 
        ) {
            return response.status(400).send({
                message : 'Send all required fields'
            });
        }
        const newTheatre = {
            theatreName : request.body.theatreName,
            city : request.body.city,
        }

        const theatre = await Theatres.create(newTheatre);
        return response.status(200).json(theatre);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});


router.put('/theatres/:id', async (request, response) => {
    try {
        console.log(request.body);
        if (
            !request.body.theatreName || !request.body.city 
        ) {
            return response.status(400).send({
                message : 'Send all required fields'
            });
        }
        const { id } = request.params;
        const theatre = await Theatres.findByIdAndUpdate(id, request.body);
        if (!theatre) {
            return response.status(404).json({ message : 'Theatre not found.'});
        }
        return response.status(200).json({ message : 'Theatre updated successfully.'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.delete('/theatres/:id', async (request, response) => {
    try {
        const { id }  = request.params;
        const theatre = await Theatres.findByIdAndDelete(id);
        if(!theatre){
            return response.status(404).json({ message : 'Theatre not found'});
        }
        return response.status(200).json({ message : 'Theatre deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

module.exports = router;