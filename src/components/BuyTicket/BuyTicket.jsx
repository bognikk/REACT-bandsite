import axios from "axios";
import useInput from "../../hooks/use-input";

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
	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetNameInput,
	} = useInput((value) => value.trim() !== "");

	const nameInputClasses = nameInputHasError
		? "form__input invalidField"
		: "form__input";

	// ----------CARD
	const {
		value: enteredCard,
		isValid: enteredCardIsValid,
		hasError: cardInputHasError,
		valueChangeHandler: cardChangeHandler,
		inputBlurHandler: cardBlurHandler,
		reset: resetCardInput,
	} = useInput((value) => value.trim() !== "" && value.length === 16);

	const cardInputClasses = cardInputHasError
		? "form__input invalidField"
		: "form__input";

	// ----------EMAIL
	const isEmail = (email) =>
		/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmailInput,
	} = useInput((value) => value.trim() !== "" && isEmail(value));

	const emailInputClasses = emailInputHasError
		? "form__input invalidField"
		: "form__input";

	let formIsValid = false;
	if (enteredNameIsValid && enteredEmailIsValid && enteredCardIsValid) {
		formIsValid = true;
	}

	// ----------SUBMIT
	const handleSubmit = async (event) => {
		event.preventDefault();

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

		resetNameInput();
		resetEmailInput();
		resetCardInput();
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
						onChange={nameChangeHandler}
						onBlur={nameBlurHandler}
						className={nameInputClasses}
						type="text"
						name="name"
						value={enteredName}
						placeholder="First and last name"
					/>
					{nameInputHasError && (
						<p className="invalidInput">Name on the card</p>
					)}

					<label className="form__label" htmlFor="email">
						EMAIL
					</label>
					<input
						onChange={emailChangeHandler}
						onBlur={emailBlurHandler}
						className={emailInputClasses}
						type="email"
						name="email"
						value={enteredEmail}
						placeholder="@ . and domain"
					/>
					{emailInputHasError && (
						<p className="invalidInput">
							Email must not be empty, and must contain "email" elements.
						</p>
					)}

					<label className="form__label" htmlFor="card">
						CREDIT CARD
					</label>
					<input
						onChange={cardChangeHandler}
						onBlur={cardBlurHandler}
						className={cardInputClasses}
						type="number"
						name="card"
						value={enteredCard}
						placeholder="16 digits (no special characters)"
					/>
					{cardInputHasError && (
						<p className="invalidInput">
							Card must have 16 digits, no special characters and must not be
							empty.
						</p>
					)}
					<div className="form__actions">
						<Button type="submit" disabled={!formIsValid}>
							Purchase
						</Button>
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
