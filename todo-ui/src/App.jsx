import React, { useEffect } from "react";
import Header from "./components/Header";
import Popup from "./components/Popup";
import List from "./components/List";
import Loading from "./components/Loading";
import TopOptions from "./components/TopOptions";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos, setState } from "./todoSlice";
import { filterItems } from "./todoUtils";
import ItemModal from "./components/ItemModal";

export default function App() {
	const dispatch = useDispatch();
	const states = useSelector((store) => store.todo);
	const { todos, searchText, displayedTodos, itemModalOpen } = states;

	useEffect(() => {
		dispatch(getAllTodos());
	}, []);

	useEffect(() => {
		const items = filterItems(searchText, todos);
		dispatch(setState("displayedTodos", items));
	}, [searchText, todos]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
			{itemModalOpen ? <ItemModal /> : null}
			<main className="container mx-auto px-4 py-8 max-w-7xl">
				<Popup />
				<Loading />

				<Header headerText={"Todo App"} />
				<TopOptions />
				<List todos={displayedTodos} />
			</main>
		</div>
	);
}
