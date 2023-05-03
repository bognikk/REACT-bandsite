import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../UI/Button/Button";
import "./BuyTicket.scss";

const BuyTicket = () => {
	let navigate = useNavigate();

	const params = useParams();
	const ticketId = params.ticketId;

	return (
		<section className="buyTicket">
			<h2 className="tiketDetails__heading">Buy Ticket</h2>
			<main className="tiketDetails__main-container">
				<p>{ticketId}</p>
				<div className="actions">
					<Button onClick={() => navigate(-1)}>Go Back</Button>
					<Button>Purchase</Button>
				</div>
			</main>
		</section>
	);
};
export default BuyTicket;
