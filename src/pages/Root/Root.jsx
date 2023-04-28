import { Outlet } from "react-router-dom";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";

function RootLayout() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default RootLayout;
