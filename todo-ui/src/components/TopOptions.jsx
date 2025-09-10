import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sortByOptions } from "../todoUtils";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../todoSlice";

export default function TopOptions() {
	const naviage = useNavigate();
	const dispatch = useDispatch();
	const [sortby, setSortby] = useState("Default");

	const states = useSelector((store) => store.todo);
	const { todos, searchText } = states;

	function handleSearchText(e) {
		let val = e.target.value;
		dispatch(setState("searchText", val));
	}

	function gotoAddPage() {
		naviage("/add");
	}

	function handleSortBy(e) {
		const val = e.target.value;
		setSortby(val);

		let isAsc = false;
		let sortBy = "Default";

		if (val.includes("Name")) {
			sortBy = "Name";
		} else if (val.includes("Date")) {
			sortBy = "Date";
		} else if (val.includes("Completed")) {
			sortBy = "Completed";
		}

		if (val.includes("Asc")) {
			isAsc = true;
		}
		let list = todos.slice();
		list = sortTodos(list, sortBy, isAsc);
		dispatch(setState("todos", list));
	}

	function sortTodos(list, sortBy, isAsc) {
		return list.sort((a, b) => {
			let comparison = 0;

			if (sortBy === "Name") {
				comparison = a.title.localeCompare(b.title);
			} else if (sortBy === "Date") {
				comparison = new Date(a.deadline) - new Date(b.deadline);
			} else if (sortBy === "Completed") {
				comparison = a.isCompleted - b.isCompleted;
			}

			return isAsc ? comparison : -comparison;
		});
	}

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
			<div className="flex flex-col lg:flex-row gap-4 items-center">
				{/* Search Input */}
				<div className="relative flex-1 w-full lg:max-w-md">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<svg
							className="h-5 w-5 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<input
						className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
						placeholder="Search todos..."
						value={searchText}
						onChange={handleSearchText}
					/>
				</div>

				{/* Sort Dropdown */}
				<div className="flex items-center gap-2">
					<svg
						className="h-5 w-5 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
						/>
					</svg>
					<select
						className="py-3 px-4 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
						value={sortby}
						onChange={handleSortBy}
					>
						{sortByOptions.map((item, index) => {
							return <option key={index}>{item}</option>;
						})}
					</select>
				</div>

				{/* Add Button */}
				<button
					className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
					onClick={gotoAddPage}
				>
					<svg
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						/>
					</svg>
					<span className="hidden sm:inline">Add Todo</span>
				</button>
			</div>
		</div>
	);
}
