import "./Social.scss";

const Social = () => {
	return (
		<section className="social">
			<h2 className="social__heading">Join the Conversation</h2>
			<div className="form-container">
				<div className="img-container"></div>
				<form id="form" className="form">
					<label className="form__label" for="name">
						NAME
					</label>
					<input
						className="form__input"
						type="text"
						name="name"
						id="name"
						placeholder="Enter your name"
					/>

					<label className="form__label" for="comment">
						COMMENT
					</label>
					<textarea
						className="form__textarea"
						name="comment"
						placeholder="Add a new comment"
					></textarea>
					<button className="form__btn">COMMENT</button>
				</form>
			</div>

			<div className="posts-container"></div>
		</section>
	);
};
export default Social;
