import About from "../../components/About/About";
import Gallery from "../../components/Gallery/Gallery";
import Hero from "../../components/Layout/Hero/Hero";
import Social from "../../components/Social/Social";

const Biography = () => {
	return (
		<>
			<Hero classProp="hero bioPage">
				<h1 className="hero__main-heading">The Bees Knees</h1>
			</Hero>
			<About />
			<Gallery />
			<Social />
		</>
	);
};
export default Biography;
