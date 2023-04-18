import About from "../../components/About/About";
import Gallery from "../../components/Gallery/Gallery";
import Hero from "../../components/Hero/Hero";

import "./Biography.scss";

const Biography = () => {
	return (
		<>
			<Hero>
				<h1 className="hero__main-heading">The Bees Knees</h1>
			</Hero>
			<About />
			<Gallery />
		</>
	);
};
export default Biography;
