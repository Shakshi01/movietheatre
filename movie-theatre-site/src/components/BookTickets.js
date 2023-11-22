
// BookTickets.js
import React from "react";
import Header from "./Header";

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@cluster0.bndg37a.mongodb.net/?retryWrites=true&w=majority" // Replace <username> and <password> with the corresponding authentications for this cluster.

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

async function getTickets(show_id, movieid, theatreid) {
	try {
		const database = client.db("movieDB");
		const showtimes = database.collection("showtimes");

		const query = { show_id: show_id, movieid: movieid, theatreid: theatreid };
		
		const cursor = showtimes.find(query);
	
		// Code for testing purposes. To be removed when FE is implemented.
		// Here...	
		if ((await showtimes.countDocuments(query)) === 0) {
			console.log("Movie could not be found.");
		}

		for await (const show of cursor) {
			console.dir(show.seats);
		}
		// ...to here.

	} finally {
		await client.close();
	}
}

getTickets(1, 2, 1).catch(console.dir);

const BookTickets = () => {
  return (
    <><Header /><div className="mainBooking">
          <p>
              This is for booking tickets.
          </p>
      </div></>
  );
};

export default BookTickets;
