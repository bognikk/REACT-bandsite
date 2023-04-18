import "./Header.scss";

import logoImg from "../../assets/logos/Logo-bandsite.svg";

const Header = () => {
	return (
		<header class="header">
			<a class="header__link" href="./index.html">
				<img class="header__logo" src={logoImg} alt="bandsite" />
			</a>
			<nav class="nav">
				<ul class="nav__list">
					<a class="nav__link nav__link--active" href="#Biography">
						<ul class="nav__item">Biography</ul>
					</a>
					<a class="nav__link" href="#Shows">
						<ul class="nav__item">Shows</ul>
					</a>
				</ul>
			</nav>
		</header>
	);
};
export default Header;
