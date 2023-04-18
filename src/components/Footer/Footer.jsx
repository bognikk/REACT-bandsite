import logoImg from "../../assets/logos/Logo-bandsite.svg";
import instagramIcon from "../../assets/icons/Icon-instagram.svg";
import facebookIcon from "../../assets/icons/Icon-facebook.svg";
import twitterIcon from "../../assets/icons/Icon-twitter.svg";

import "./Footer.scss";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__title-and-icons">
				<h2 className="footer__title">Get in Touch</h2>
				<div className="footer__icons-container">
					<a className="footer__link" href="https://instagram.com">
						<img
							className="footer__img"
							src="../../assets/icons/Icon-instagram.svg"
							alt="instagram"
						/>
					</a>
					<a className="footer__link" href="https://facebook.com">
						<img
							className="footer__img"
							src={facebookIcon}
							alt="facebook"
							style={{ display: "block" }}
						/>
					</a>
					<a className="footer__link" href="https://twitter.com">
						<img className="footer__img" src={twitterIcon} alt="twitter" />
					</a>
				</div>
			</div>
			<div className="footer__info">
				<div className="footer__card">
					<p className="footer__card__name">
						Cam Adams
						<br />
						The Bees Knees Management
					</p>
					<p className="footer__card__region">
						503 Broadway Penthouse,
						<br />
						New York, NY 10012, USA
					</p>
					<a
						className="footer__card__email"
						href="mailto:info@thebeesknees.com"
					>
						info@thebeesknees.com
					</a>
				</div>

				<div className="footer__card">
					<p className="footer__card__name">
						Pearl Gregg
						<br />
						Limitless Artist Group
					</p>
					<p className="footer__card__region">
						Booking Agent for
						<br />
						US / South America / Japan
					</p>
					<a
						className="footer__card__email"
						href="mailto:pearl.gregg@limitlessag.com"
					>
						pearl.gregg@limitlessag.com
					</a>
				</div>

				<div className="footer__card">
					<p className="footer__card__name">
						Carson Whyte
						<br />
						ARCH Entertainment
					</p>
					<p className="footer__card__region">
						Booking Agent for
						<br />
						UK / EU / AU
					</p>
					<a
						className="footer__card__email"
						href="mailto:cwhyte@archentertainment.com"
					>
						cwhyte@archentertainment.com
					</a>
				</div>
			</div>

			<img className="footer__logo" src={logoImg} alt="logo" />
			<p className="footer__copyright">
				Copyright The Bees Knees &copy; 2021 All Rights Reserved
			</p>
		</footer>
	);
};
export default Footer;
