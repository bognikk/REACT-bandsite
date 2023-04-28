import "./Hero.scss";

const Hero = ({ children, classProp }) => {
	return <section className={classProp}>{children}</section>;
};
export default Hero;
