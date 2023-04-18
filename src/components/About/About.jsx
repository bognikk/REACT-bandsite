import "./About.scss";

import aboutImg from "../../assets/images/band.jpg";

const About = () => {
	return (
		<main className="about">
			<h2 className="about__heading">About the Musicians</h2>
			<img className="about__img" src={aboutImg} alt="band" />

			<p className="about__quote">
				"We push each other to be the best. It’s not uncommon for one of us to
				say ‘this needs to be better, back to the drawing board'"
			</p>
			<p className="about__quote-credits">
				- Bryan Teddy, lead vocalist of The Bees Knees
			</p>

			<article className="article">
				<h3 className="article__heading">The Bees Knees</h3>
				<div className="article__text-container">
					<p className="article__text">
						The Bees Knees is a pop rock band originating from San Francisco,
						California. The band consists of lead vocalist Bryan Teddy,
						guitarist Mack Tolkens, guitarist Andrew Green, bassist Kent Zulkee
						and drummer Freddie Fischer. The band achieved its first commercial
						success as an unsigned act, drawing attention from manager Cam
						Adams. Having worked with other popular acts (The Elephant In The
						Room, One Trick Pony, The Cat’s Meow), Adams was confident the band
						could succeed even further, pushing them to sign with Magenta
						Records.
					</p>
					<p className="article__text">
						From there, the band has soared, gaining international recognition
						and ranking in the top 10 on the Poster Charts. New fans immediately
						fell in love with the band’s original and organic attitude,
						solidifying their place as one of the hottest and fastest up and
						coming acts of this century. Fans affectionately refer to themselves
						as “The Hive” and are drawn to their candid and authentic
						performances on stage. Looking forward to touring in the future, The
						Bees Knees are currently recording their second studio album,
						looking to be released in late 2021.
					</p>
				</div>
			</article>
		</main>
	);
};
export default About;
