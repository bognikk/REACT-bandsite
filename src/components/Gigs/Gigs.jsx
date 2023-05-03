import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../UI/Button/Button";

import "./Gigs.scss";
import { Link } from "react-router-dom";

const Gigs = () => {
	const [shows, setShows] = useState([]);
	const BASE_URL = "https://project-1-api.herokuapp.com";
	const API_KEY = "40518c69-705d-4039-82fd-8693758271c5";
	const [successfulFetch, setSuccessfulFetch] = useState(true);

	useEffect(() => {
		const getShows = async () => {
			try {
				const res = await axios.get(`${BASE_URL}/showdates?api_key=${API_KEY}`);

				let ALL_SHOWS = [];

				res.data.forEach((show) => {
					ALL_SHOWS.push({
						id: show.id,
						date: new Date(Number(show.date)).toDateString(),
						venue: show.place,
						location: show.location,
					});
				});

				setShows(ALL_SHOWS);
				setSuccessfulFetch(true);
			} catch (error) {
				if (error) {
					setSuccessfulFetch(false);
				}
			}
		};

		getShows();
	}, []);

	const gig = shows.map((show) => {
		return (
			<>
				<div className="card" key={show.id}>
					<div className="card__section">
						<p className="card__section__title">DATES</p>
						<p className="card__section__text card__section__text--text-bolder">
							{show.date}
						</p>
					</div>
					<div className="card__section">
						<p className="card__section__title">VENUE</p>
						<p className="card__section__text">{show.venue}</p>
					</div>
					<div className="card__section">
						<p className="card__section__title">LOCATION</p>
						<p className="card__section__text">{show.location}</p>
					</div>
					<Link to={`ticket/${show.id}`}>
						<Button className="card__btn">VIEW EVENT</Button>
					</Link>
				</div>
			</>
		);
	});

	return (
		<>
			<section className="gigs">
				<h2 className="gigs__heading">Gigs</h2>
				<main className="gigs__main-container">
					<div className="gigs__helping-titles">
						<p className="gigs__helping-titles__title">DATES</p>
						<p className="gigs__helping-titles__title">VENUE</p>
						<p className="gigs__helping-titles__title">LOCATION</p>
						<Button className="card__btn"></Button>
					</div>
					{gig}
				</main>
			</section>
			{!successfulFetch && (
				<p className="gigs__errorMessage">
					Failed to fetch shows, we are working on it!
				</p>
			)}
		</>
	);
};
export default Gigs;
