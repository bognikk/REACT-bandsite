import "./Modal.scss";
import ReactDOM from "react-dom";
import Button from "../Button/Button";

const Backdrop = ({ onClose }) => {
	return <div className="backdrop" onClick={onClose} />;
};

const ModalOverlay = ({ onClose, messageOne, messageTwo }) => {
	return (
		<div className="modal">
			{messageOne ? <h2>{messageOne}</h2> : <h2>Something went wrong!</h2>}
			{messageTwo && <h2>{messageTwo}</h2>}
			<Button className="modal__btn" onClick={onClose}>
				Close
			</Button>
		</div>
	);
};

const portalElement = document.getElementById("overlays");

const Modal = ({ onClose, messageOne, messageTwo }) => {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay
					onClose={onClose}
					messageOne={messageOne}
					messageTwo={messageTwo}
				/>,
				portalElement
			)}
		</>
	);
};

export default Modal;
