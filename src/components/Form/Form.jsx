import axios from "axios";
import useInput from "../../hooks/use-input";
import { sendRandomPost } from "../../assets/functions/functions";

import "./Form.scss";
import Button from "../UI/Button/Button";

const BASE_URL = "https://project-1-api.herokuapp.com";
const API_KEY = "40518c69-705d-4039-82fd-8693758271c5";

const Form = ({ onError }) => {
	// ----------FORM VALIDATION

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

	// ----------COMMENT
	const {
		value: enteredComment,
		isValid: enteredCommentIsValid,
		hasError: commentInputHasError,
		valueChangeHandler: commentChangeHandler,
		inputBlurHandler: commentBlurHandler,
		reset: resetCommentInput,
	} = useInput((value) => value.trim() !== "");

	const commentInputClasses = commentInputHasError
		? "form__textarea invalidField"
		: "form__textarea";

	let formIsValid = false;
	if (enteredCommentIsValid && enteredCommentIsValid) {
		formIsValid = true;
	}

	// ----------SUBMIT
	const handleSubmit = async (event) => {
		event.preventDefault();

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

		resetNameInput();
		resetCommentInput();
	};

	return (
		<div className="form-container">
			<div className="img-container"></div>
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
					id="name"
					placeholder="Enter your name"
					value={enteredName}
				/>
				{nameInputHasError && (
					<p className="invalidInput">Name must not be empty.</p>
				)}

				<label className="form__label" htmlFor="comment">
					COMMENT
				</label>
				<textarea
					onChange={commentChangeHandler}
					onBlur={commentBlurHandler}
					className={commentInputClasses}
					name="comment"
					placeholder="Add a new comment"
					value={enteredComment}
				></textarea>
				{commentInputHasError && (
					<p className="invalidInput">Comment must not be empty.</p>
				)}
				<div className="form__actions">
					<Button onClick={sendRandomPost} type="button" className="form__btn">
						GENERATE RANDOM COMMENT
					</Button>
					<Button type="submit" className="form__btn" disabled={!formIsValid}>
						COMMENT
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Form;
