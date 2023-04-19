import Hero from "../../components/Hero/Hero";

import "./Shows.scss";

const Shows = () => {
	return (
		<Hero classProp="hero showsPage">
			<div className="hero__text-container">
				<p className="hero__text">Beautiful Beasts Album</p>
				<h1 className="hero__main-heading">Queen of Yellow x For The Stings</h1>
			</div>
			<iframe
				className="hero__song"
				src="https://www.youtube.com/embed/IAa_hZzZZ9o"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				// allowfullscreen
			></iframe>
		</Hero>
	);
};
export default Shows;
