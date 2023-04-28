import Gigs from "../../components/Gigs/Gigs";
import Hero from "../../components/Layout/Hero/Hero";

const Shows = () => {
	return (
		<>
			<Hero classProp="hero showsPage">
				<div className="hero__text-container">
					<p className="hero__text">Beautiful Beasts Album</p>
					<h1 className="hero__main-heading">
						Queen of Yellow x For The Stings
					</h1>
				</div>
				<iframe
					className="hero__song"
					src="https://www.youtube.com/embed/keZtX91WNK4"
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				></iframe>
			</Hero>
			<Gigs />
		</>
	);
};
export default Shows;
