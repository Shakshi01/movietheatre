const mongoose = require('mongoose');
const Members = require('./membersModel');
const Showtimes = require('./showtimesModel');

const { Schema } = mongoose;

const ticketsSchema = new mongoose.Schema(
    {
        memberid : {
            type : Schema.Types.ObjectId,
            ref : Members,
            required : true
        },

        showid : {
            type : Schema.Types.ObjectId,
            ref : Showtimes,
            required : true
        },

        seatsBooked : {
            type : Array,
            required : true
        }
    }
)

const Tickets = mongoose.model("tickets", ticketsSchema);

module.exports = Tickets;