const express = require('express');
const router = express.Router();
const Tickets = require('../models/ticketsModel');
const Showtimes = require('../models/showtimesModel');
const Members = require('../models/membersModel');

router.get('/tickets', async (request, response) => {
    try {
        const tickets = await Tickets.find({});
        return response.status(200).json(tickets);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.get('/tickets/:id', async (request, response) => {
    try {
        const { id }  = request.params;
        const ticket = await Tickets.findById(id);
        return response.status(200).json(ticket);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.post('/tickets', async (request, response) => {
    try {
        if (
            !request.body.memberid || !request.body.seatsBooked || !request.body.showid  
        ) {
            return response.status(400).send({
                message : 'Send all required fields'
            });
        }
        const newTicket = {
            memberid : request.body.memberid,
            seatsBooked : request.body.seatsBooked,
            showid : request.body.showid
        }
        const show = await Showtimes.findById(request.body.showid);
        let n = request.body.seatsBooked.length;
        for(let i = 0;i<n;i++)
        {
            show.seats_booked.push(request.body.seatsBooked[i]);
        }
        const member = await Members.findById(request.body.memberid);
        member.rewards=n*show.price;
        await Showtimes.findByIdAndUpdate(request.body.showid, show);
        await Members.findByIdAndUpdate(request.body.memberid, member);
        const ticket = await Tickets.create(newTicket);
        return response.status(200).json(ticket);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});


router.put('/tickets/:id', async (request, response) => {
    try {
        if (
            !request.body.userid || !request.body.seatsBooked || !request.body.showid  
        ) {
            return response.status(400).send({
                message : 'Send all required fields'
            });
        }
        const { id } = request.params;
        const ticket = await Tickets.findByIdAndUpdate(id, request.body);
        if (!ticket) {
            return response.status(404).json({ message : 'Ticket not found.'});
        }
        return response.status(200).json({ message : 'Ticket updated successfully.'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.delete('/tickets/:id', async (request, response) => {
    try {
        const { id }  = request.params;
        let ticket = await Tickets.findById(id);
        const show = await Showtimes.findById(ticket.showid);
        let ticketSeatsBooked = ticket.seatsBooked;
        let arr = show.seats_booked;
        for(let i = 0;i<ticketSeatsBooked.length;i++)
        {
            let index = arr.indexOf(ticketSeatsBooked[i]); 
            if (index > -1) {
            arr.splice(index, 1);
            }
        }
        const member = await Members.findById(ticket.memberid);
        member.rewards-=ticketSeatsBooked.length*show.price;
        await Showtimes.findByIdAndUpdate(ticket.showid, show);
        await Members.findByIdAndUpdate(ticket.memberid, member);
        ticket = await Tickets.findByIdAndDelete(id);
        if(!ticket){
            return response.status(404).json({ message : 'Ticket not found'});
        }
        return response.status(200).json({ message : 'Ticket deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

module.exports = router;