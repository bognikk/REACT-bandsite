import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import Button from "../UI/Button/Button";
import "./BuyTicket.scss";
import { useEffect, useState } from "react";

const BuyTicket = () => {
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

				setTicket(foundTicket);
			} catch (error) {
				if (error) {
					console.log(error);
				}
			}
		};

		getShows();
	}, []);

	// FORM

	// ----------NAME
	const [enteredName, setEnteredName] = useState("");
	const [enteredNameTouched, setEnteredNameIsTouched] = useState(false);

	const enteredNameIsValid = enteredName.trim() !== "";

	const nameInputIsValid = !enteredNameIsValid && enteredNameTouched;
	const nameInputClasses = nameInputIsValid
		? "form__input invalidField"
		: "form__input";

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);
	};

	const nameInputBlurHandler = () => {
		setEnteredNameIsTouched(true);
	};

	// ----------CARD
	const [enteredCard, setEnteredCard] = useState("");
	const [enteredCardTouched, setEnteredCardIsTouched] = useState(false);

	const enteredCardIsValid =
		enteredCard.trim() !== "" && enteredCard.length === 16;

	const cardInputIsValid = !enteredCardIsValid && enteredCardTouched;
	const cardInputClasses = cardInputIsValid
		? "form__input invalidField"
		: "form__input";

	const cardInputChangeHandler = (event) => {
		setEnteredCard(event.target.value);
	};

	const cardInputBlurHandler = () => {
		setEnteredCardIsTouched(true);
	};

	// ----------EMAIL
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredEmailTouched, setEnteredEmailIsTouched] = useState(false);

	const isEmail = (email) =>
		/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

	const enteredEmailIsValid =
		enteredName.trim() !== "" && isEmail(enteredEmail);

	const emailInputIsValid = !enteredEmailIsValid && enteredEmailTouched;
	const emailInputClasses = emailInputIsValid
		? "form__input invalidField"
		: "form__input";

	const emailInputChangeHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const emailInputBlurHandler = () => {
		setEnteredEmailIsTouched(true);
	};

	// ----------SUBMIT
	const handleSubmit = async (event) => {
		event.preventDefault();

		setEnteredNameIsTouched(true);
		setEnteredEmailIsTouched(true);
		setEnteredCardIsTouched(true);

		if (!enteredNameIsValid || !enteredEmailIsValid || !enteredCardIsValid) {
			return;
		}

		// POST
		try {
			await axios.post(
				`https://react-all-in-one-default-rtdb.firebaseio.com/tickets.json`,
				{
					name: enteredName,
					email: enteredEmail,
					card: enteredCard,
				}
			);
		} catch (error) {
			if (error) {
				console.log(error);
				return;
			}
		}

		setEnteredName("");
		setEnteredNameIsTouched(false);
		setEnteredCard("");
		setEnteredCardIsTouched(false);
		setEnteredEmail("");
		setEnteredEmailIsTouched(false);
	};

	return (
		<section className="buyTicket">
			<h2 className="buyTicket__heading">Buy Ticket</h2>
			<main className="buyTicket__main-container">
				<div className="buyTicket__details--wrapper">
					<div className="buyTicket__details">
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
				</div>
				<form className="form" onSubmit={handleSubmit}>
					<label className="form__label" htmlFor="name">
						NAME
					</label>
					<input
						onChange={nameInputChangeHandler}
						onBlur={nameInputBlurHandler}
						className={nameInputClasses}
						type="text"
						name="name"
						value={enteredName}
						placeholder="First and last name"
					/>
					{nameInputIsValid && <p className="invalidInput">Name on the card</p>}

					<label className="form__label" htmlFor="email">
						EMAIL
					</label>
					<input
						onChange={emailInputChangeHandler}
						onBlur={emailInputBlurHandler}
						className={emailInputClasses}
						type="email"
						name="email"
						value={enteredEmail}
						placeholder="@ . and domain"
					/>
					{emailInputIsValid && (
						<p className="invalidInput">
							Email must not be empty, and must contain "email" elements.
						</p>
					)}

					<label className="form__label" htmlFor="card">
						CREDIT CARD
					</label>
					<input
						onChange={cardInputChangeHandler}
						onBlur={cardInputBlurHandler}
						className={cardInputClasses}
						type="number"
						name="card"
						value={enteredCard}
						placeholder="16 digits (no special characters)"
					/>
					{cardInputIsValid && (
						<p className="invalidInput">
							Card must have 16 digits, no special characters and must not be
							empty.
						</p>
					)}
					<div className="form__actions">
						<Button type="submit">Purchase</Button>
					</div>
				</form>
				<form></form>

				<div className="buyTicket__actions">
					<Button type="button" onClick={() => navigate(-1)}>
						Go Back
					</Button>
				</div>
			</main>
		</section>
	);
};
export default BuyTicket;
