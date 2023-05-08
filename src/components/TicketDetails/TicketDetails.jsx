import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";
import "./TicketDetails.scss";
import { useEffect, useState } from "react";
import Button from "../UI/Button/Button";

const TicketDetails = () => {
	const BASE_URL = "https://project-1-api.herokuapp.com";
	const API_KEY = "40518c69-705d-4039-82fd-8693758271c5";

	const [ticket, setTicket] = useState({});

	const params = useParams();
	const ticketId = params.ticketId;

	let navigate = useNavigate();

	useEffect(() => {
		const getShows = async () => {
			try {
				const res = await axios.get(`${BASE_URL}/showdates?api_key=${API_KEY}`);

				const foundTicket = res.data.find((ticket) => ticket.id === ticketId);
				console.log("foundTicket", foundTicket);

				setTicket(foundTicket);
			} catch (error) {
				if (error) {
					console.log(error);
				}
			}
		};
		console.log("ticket", ticket);

		getShows();
	}, []);

	return (
		<section className="tiketDetails">
			<h2 className="tiketDetails__heading">Event Details</h2>
			<main className="tiketDetails__main-container">
				<div className="tiketDetails__details--wrapper">
					<div className="tiketDetails__details">
						<p>
							<span>Date: </span>
							{new Date(Number(ticket.date)).toDateString()}
						</p>
						<p>
							<span>Venue: </span>
							{ticket.place}
						</p>
						<p>
							<span>Location: </span>
							{ticket.location}
						</p>
						<p>
							<span>Price: </span>$50
						</p>
					</div>
					<div className="tiketDetails__details">
						<h2>About the show</h2>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
							animi magnam officiis, sit, perferendis accusantium quo impedit
							distinctio quas mollitia ut tenetur asperiores eaque rerum debitis
							amet facilis quos labore veritatis neque, dignissimos doloribus.
							Harum modi illum minus aperiam excepturi nam sit nisi minima ipsum
							ut commodi, unde consequatur praesentium earum vel repudiandae
							magni possimus hic inventore, culpa laborum? Laudantium illum
							tempora laborum inventore, provident et voluptates! Vel sunt,
							suscipit molestias tempore nesciunt consequuntur ratione assumenda
							sint quibusdam soluta ullam aspernatur tempora laborum eaque
							repudiandae ipsam, excepturi dolorum sit atque!
						</p>
					</div>
				</div>
				<div className="tiketDetails__actions">
					<Button onClick={() => navigate(-1)}>Go Back</Button>
					<Button onClick={() => navigate("purchase")}>Buy Ticket</Button>
				</div>
			</main>
		</section>
	);
};
export default TicketDetails;
