import "./Header.scss";

import logoImg from "../../assets/logos/Logo-bandsite.svg";
import { NavLink } from "react-router-dom";

const Header = () => {
	return (
		<header className="header">
			<img className="header__logo" src={logoImg} alt="bandsite" />
			<nav className="nav">
				<ul className="nav__list">
					<NavLink
						className={({ isActive }) =>
							isActive ? "nav__link nav__link--active" : "nav__link"
						}
						to="/biography"
					>
						<li className="nav__item">Biography</li>
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							isActive ? "nav__link nav__link--active" : "nav__link"
						}
						to="/shows"
					>
						<li className="nav__item">Shows</li>
					</NavLink>
				</ul>
			</nav>
		</header>
	);
};
export default Header;
