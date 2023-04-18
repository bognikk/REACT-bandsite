import Biography from "./pages/Biography/Biography";
import Shows from "./pages/Shows/Shows";
import RootLayout from "./pages/Root/Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
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
