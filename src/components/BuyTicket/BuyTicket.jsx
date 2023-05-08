import axios from "axios";
import emailjs from "@emailjs/browser";

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
	const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
	const [enteredNameTouched, setEnteredNameIsTouched] = useState(false);

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);

		if (event.target.value.trim() !== "") {
			setEnteredNameIsValid(true);
		}
	};

	const nameInputBlurHandler = () => {
		setEnteredNameIsTouched(true);

		if (enteredName.trim() === "") {
			setEnteredNameIsValid(false);
			return;
		}
	};

	// ----------CARD
	const [enteredCard, setEnteredCard] = useState("");
	const [enteredCardIsValid, setEnteredCardIsValid] = useState(false);
	const [enteredCardTouched, setEnteredCardIsTouched] = useState(false);

	const cardInputChangeHandler = (event) => {
		setEnteredCard(event.target.value);

		if (event.target.value.trim() !== "") {
			setEnteredCardIsValid(true);
		}
	};

	const cardInputBlurHandler = () => {
		setEnteredCardIsTouched(true);
		console.log(enteredCard);

		if (enteredCard.trim() === "" || enteredCard.length !== 16) {
			setEnteredCardIsValid(false);
			return;
		} else if (enteredCard.trim() !== "" && enteredCard.trim().length === 16) {
			setEnteredCardIsValid(true);
		}
	};

	// ----------EMAIL
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(false);
	const [enteredEmailTouched, setEnteredEmailIsTouched] = useState(false);

	const isEmail = (email) =>
		/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

	const emailInputChangeHandler = (event) => {
		setEnteredEmail(event.target.value);

		if (event.target.value.trim() !== "") {
			setEnteredEmailIsValid(true);
		}
	};

	const emailInputBlurHandler = () => {
		setEnteredEmailIsTouched(true);

		if (enteredEmail.trim() === "" || !isEmail(enteredEmail)) {
			setEnteredEmailIsValid(false);
			return;
		}
	};

	const formData = {
		user_email: enteredEmail,
		to_name: enteredName,
		message: "Test message!!",
	};

	// ----------SUBMIT
	const handleSubmit = async (event) => {
		event.preventDefault();

		console.log(formData);

		setEnteredNameIsTouched(true);
		setEnteredEmailIsTouched(true);
		setEnteredCardIsTouched(true);

		if (enteredName.trim() === "") {
			setEnteredNameIsValid(false);
			return;
		}

		if (enteredEmail.trim() === "") {
			setEnteredEmailIsValid(false);
			return;
		}

		if (enteredCard.trim() === "") {
			setEnteredCardIsValid(false);
			return;
		}

		setEnteredNameIsValid(true);
		setEnteredCardIsValid(true);
		setEnteredEmailIsValid(true);

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

		// SEND EMAIL

		emailjs
			.sendForm(
				process.env.REACT_APP_EMAILJS_SERVICE_ID,
				process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
				formData,
				process.env.REACT_APP_EMAILJS_USER_ID
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log("Error: ", error.text);
				}
			);

		setEnteredName("");
		setEnteredCard("");
		setEnteredEmail("");
	};

	const nameInputIsValid = !enteredNameIsValid && enteredNameTouched;
	const nameInputClasses = nameInputIsValid
		? "form__input invalidField"
		: "form__input";

	const cardInputIsValid = !enteredCardIsValid && enteredCardTouched;
	const cardInputClasses = cardInputIsValid
		? "form__input invalidField"
		: "form__input";

	const emailInputIsValid = !enteredEmailIsValid && enteredEmailTouched;
	const emailInputClasses = emailInputIsValid
		? "form__input invalidField"
		: "form__input";

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
