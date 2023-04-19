import Hero from "../../components/Hero/Hero";

function ErrorPage() {
	return (
		<>
			<Hero>
				<h1 className="hero__main-heading">
					An error occured! <br /> Could not find this page!
				</h1>
			</Hero>
		</>
	);
}

export default ErrorPage;
