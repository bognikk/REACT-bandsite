import Biography from "./pages/Biography/Biography";
import Shows from "./pages/Shows/Shows";
import RootLayout from "./pages/Root/Root";
import ErrorPage from "./pages/Error/Error";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import Gigs from "./components/Gigs/Gigs";
import TicketDetails from "./components/TicketDetails/TicketDetails";
import BuyTicket from "./components/BuyTicket/BuyTicket";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			// { index: true, element: <Biography /> },
			{ path: "", element: <Navigate to="/biography" replace /> },
			{ path: "biography", element: <Biography /> },
			{
				path: "shows",
				element: <Shows />,
				children: [
					{ path: "", element: <Gigs /> },
					{ path: "ticket/:ticketId", element: <TicketDetails /> },
					{ path: "ticket/:ticketId/purchase", element: <BuyTicket /> },
				],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
