import Biography from "./pages/Biography/Biography";
import Shows from "./pages/Shows/Shows";
import RootLayout from "./pages/Root/Root";
import ErrorPage from "./pages/Error/Error";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "biography", element: <Biography /> },
			{ path: "shows", element: <Shows /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
