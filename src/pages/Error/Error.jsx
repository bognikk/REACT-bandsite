import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";

function ErrorPage() {
	return (
		<>
			<Hero classProp="hero bioPage">
				<h1 className="hero__main-heading">
					An error occured! <br /> Could not find this page! Check out the{" "}
					<Link to="/biography">biograpthy</Link> page!
				</h1>
			</Hero>
		</>
	);
}

export default ErrorPage;
