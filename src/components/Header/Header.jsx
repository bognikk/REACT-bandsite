import "./Header.scss";

import logoImg from "../../assets/logos/Logo-bandsite.svg";

const Header = () => {
	return (
		<header className="header">
			<a className="header__link" href="./index.html">
				<img className="header__logo" src={logoImg} alt="bandsite" />
			</a>
			<nav className="nav">
				<ul className="nav__list">
					<a className="nav__link nav__link--active" href="#Biography">
						<ul className="nav__item">Biography</ul>
					</a>
					<a className="nav__link" href="#Shows">
						<ul className="nav__item">Shows</ul>
					</a>
				</ul>
			</nav>
		</header>
	);
};
export default Header;
