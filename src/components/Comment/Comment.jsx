import "./Comment.scss";
import likeIcon from "../../assets/icons/icon-like.svg";
import deleteIcon from "../../assets/icons/icon-delete.svg";

const Comment = ({ commentsProp, onDelete, onLike }) => {
	const post = commentsProp.map((comment) => {
		return (
			<div className="comment" key={comment.id}>
				<div className="comment__img"></div>
				<div className="comment__container">
					<div className="comment__container__upper">
						<div className="comment__name">{comment.name}</div>
						<div className="comment__date">{comment.date}</div>
					</div>
					<p className="comment__text">{comment.text}</p>
					<div className="comment__container__lower">
						<div className="comment__container__likes-container">
							<p className="comment__likes">{comment.likes}</p>
							<a href="">
								<img
									onClick={() => onLike(comment)}
									className="comment__icon"
									src={likeIcon}
									alt="like button"
									tabIndex={0}
								/>
							</a>
						</div>
						<img
							onClick={() => onDelete(comment.id)}
							className="comment__icon"
							src={deleteIcon}
							alt="delete button"
							tabIndex={0}
						/>
					</div>
				</div>
			</div>
		);
	});

	return <div className="comments-container">{post}</div>;
};
export default Comment;
