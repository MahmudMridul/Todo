import React from "react";
import { formatDateString, truncateString } from "../todoUtils";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllTodos,
	removeItem,
	setModalValues,
	setState,
	toggleIsCompleted,
} from "../todoSlice";
import { useNavigate } from "react-router-dom";

export default function ListItem({
	id,
	title,
	desc,
	comm,
	deadline,
	completed,
	expired,
}) {
	const dispatch = useDispatch();
	const states = useSelector((store) => store.todo);
	const { todos } = states;

	const navigate = useNavigate();

	function deleteItem() {
		dispatch(removeItem({ title })).then(() => dispatch(getAllTodos()));
	}

	function toggleCompleted() {
		const updated = todos.map((item) => {
			if (item.id === id) {
				return {
					...item,
					isCompleted: !completed,
				};
			}
			return item;
		});
		dispatch(setState("todos", updated));
		const obj = {
			id,
			status: !completed,
		};
		dispatch(toggleIsCompleted(obj)).then(() => dispatch(getAllTodos()));
	}

	function gotoEditPage() {
		navigate(`/edit/${id}`);
	}

	function openModal() {
		dispatch(
			setModalValues({
				mTitle: title,
				mDesc: desc,
				mComm: comm,
				mDue: formatDateString(deadline),
			})
		);
		dispatch(setState("itemModalOpen", true));
	}

	const isOverdue = !completed && expired;

	return (
		<div
			className={`relative bg-white rounded-2xl p-6 shadow-sm border transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-1 group ${
				completed
					? "border-green-200 bg-green-50"
					: isOverdue
					? "border-red-200 bg-red-50"
					: "border-gray-200 hover:border-blue-200"
			}`}
			onClick={openModal}
		>
			{/* Status Badge */}
			{completed && (
				<div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
					<svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
					Done
				</div>
			)}

			{isOverdue && (
				<div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
					<svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clipRule="evenodd"
						/>
					</svg>
					Overdue
				</div>
			)}

			{/* Content */}
			<div className="mb-4">
				<h3
					className={`text-lg font-semibold mb-3 ${
						completed ? "text-green-700 line-through" : "text-gray-800"
					}`}
				>
					{title}
				</h3>

				{desc && (
					<p className="text-gray-600 text-sm mb-2 leading-relaxed">
						{truncateString(desc, 80)}
					</p>
				)}

				{comm && (
					<p className="text-gray-500 text-xs italic">
						💭 {truncateString(comm, 60)}
					</p>
				)}
			</div>

			{/* Due Date */}
			<div
				className={`flex items-center gap-2 text-sm mb-4 ${
					isOverdue ? "text-red-600" : "text-gray-500"
				}`}
			>
				<svg
					className="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<span className="font-medium">{formatDateString(deadline)}</span>
			</div>

			{/* Actions */}
			<div className="flex items-center justify-between pt-4 border-t border-gray-100">
				<button
					className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
						completed
							? "text-green-600 bg-green-100 hover:bg-green-200"
							: "text-gray-600 bg-gray-100 hover:bg-gray-200"
					}`}
					onClick={(e) => {
						e.stopPropagation();
						toggleCompleted();
					}}
				>
					<svg
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
					{completed ? "Completed" : "Mark Done"}
				</button>

				<div className="flex gap-2">
					<button
						className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
						onClick={(e) => {
							e.stopPropagation();
							gotoEditPage();
						}}
						title="Edit todo"
					>
						<svg
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
					</button>

					<button
						className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
						onClick={(e) => {
							e.stopPropagation();
							deleteItem();
						}}
						title="Delete todo"
					>
						<svg
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
