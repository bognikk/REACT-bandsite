import "./Modal.scss";
import ReactDOM from "react-dom";
import Button from "../Button/Button";

import FocusTrap from "focus-trap-react";

const Backdrop = ({ onClose }) => {
	return <div className="backdrop" onClick={onClose} />;
};

const ModalOverlay = ({
	type,
	onClose,
	onConfirm,
	name,
	messageOne,
	messageTwo,
}) => {
	return (
		<>
			{type === "alert" ? (
				<FocusTrap>
					<div className="modal">
						{messageOne ? (
							<h2>{messageOne}</h2>
						) : (
							<h2>Something went wrong!</h2>
						)}
						{messageTwo && <h2>{messageTwo}</h2>}
						<Button className="modal__btn" onClick={onClose}>
							Close
						</Button>
					</div>
				</FocusTrap>
			) : null}

			{type === "confirm" ? (
				<FocusTrap>
					<div className="modal">
						{messageOne ? (
							<h2>{messageOne}</h2>
						) : (
							<h2>Are you sure you want to delete the comment from {name}?</h2>
						)}
						<div className="modal__actions">
							<Button className="modal__btn" onClick={onConfirm}>
								Confirm
							</Button>
							<Button className="modal__btn" onClick={onClose}>
								Close
							</Button>
						</div>
					</div>
				</FocusTrap>
			) : null}
		</>
	);
};

const portalElement = document.getElementById("overlays");

const Modal = ({ type, onClose, onConfirm, name, messageOne, messageTwo }) => {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay
					type={type}
					onClose={onClose}
					onConfirm={onConfirm}
					name={name}
					messageOne={messageOne}
					messageTwo={messageTwo}
				/>,
				portalElement
			)}
		</>
	);
};

export default Modal;
