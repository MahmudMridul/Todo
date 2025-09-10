import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import { loader as editLoader } from "./pages/EditItem";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/add",
		element: <AddItem />,
	},
	{
		path: "/edit/:id",
		element: <EditItem />,
		loader: editLoader,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
