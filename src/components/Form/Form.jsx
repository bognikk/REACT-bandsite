import axios from "axios";
import { sendRandomPost } from "../../assets/functions/functions";

import { useState } from "react";
import "./Form.scss";
import Button from "../UI/Button/Button";

const BASE_URL = "https://project-1-api.herokuapp.com";
const API_KEY = "40518c69-705d-4039-82fd-8693758271c5";

const Form = ({ onError }) => {
	// ----------FORM VALIDATION

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

	// ----------COMMENT
	const [enteredComment, setEnteredComment] = useState("");
	const [enteredCommentTouched, setEnteredCommentIsTouched] = useState(false);

	const enteredCommentIsValid = enteredComment.trim() !== "";

	const commentInputIsValid = !enteredCommentIsValid && enteredCommentTouched;
	const commentInputClasses = commentInputIsValid
		? "form__textarea invalidField"
		: "form__textarea";

	const commentInputChangeHandler = (event) => {
		setEnteredComment(event.target.value);
	};

	const commentInputBlurHandler = () => {
		setEnteredCommentIsTouched(true);
	};

	// ----------SUBMIT
	const handleSubmit = async (event) => {
		event.preventDefault();

		setEnteredNameIsTouched(true);
		setEnteredCommentIsTouched(true);

		if (!enteredNameIsValid || !enteredCommentIsValid) {
			return;
		}

		// POST
		try {
			await axios.post(`${BASE_URL}/comments?api_key=${API_KEY}`, {
				name: enteredName,
				comment: enteredComment,
			});
		} catch (error) {
			if (error) {
				onError();
				return;
			}
		}

		setEnteredName("");
		setEnteredNameIsTouched(false);
		setEnteredComment("");
		setEnteredCommentIsTouched(false);
	};

	return (
		<div className="form-container">
			<div className="img-container"></div>
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
					id="name"
					placeholder="Enter your name"
					value={enteredName}
				/>
				{nameInputIsValid && (
					<p className="invalidInput">Name must not be empty.</p>
				)}

				<label className="form__label" htmlFor="comment">
					COMMENT
				</label>
				<textarea
					onChange={commentInputChangeHandler}
					onBlur={commentInputBlurHandler}
					className={commentInputClasses}
					name="comment"
					placeholder="Add a new comment"
					value={enteredComment}
				></textarea>
				{commentInputIsValid && (
					<p className="invalidInput">Comment must not be empty.</p>
				)}
				<div className="form__actions">
					<Button onClick={sendRandomPost} type="button" className="form__btn">
						GENERATE RANDOM COMMENT
					</Button>
					<Button type="submit" className="form__btn">
						COMMENT
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Form;
