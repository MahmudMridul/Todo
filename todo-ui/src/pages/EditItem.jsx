import React, { useState } from "react";
import { store } from "../store";
import { useLoaderData, useNavigate } from "react-router-dom";
import { combineDateTime, splitDateTime } from "../todoUtils";
import { useDispatch } from "react-redux";
import { getAllTodos, updateItem } from "../todoSlice";

export function loader({ params }) {
	const id = parseInt(params.id, 10);
	const todos = store.getState().todo.todos;
	const item = todos.find((obj) => obj.id === id);
	return item === undefined ? null : item;
}

export default function EditItem() {
	const { id, title, description, comment, deadline } = useLoaderData();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [date, time] = splitDateTime(deadline);

	const [eTitle, seteTitile] = useState(title);
	const [eDescription, seteDescription] = useState(description);
	const [eComment, seteComment] = useState(comment);
	const [eDate, seteDate] = useState(date);
	const [eTime, seteTime] = useState(time);

	function handleTitle(event) {
		const val = event.target.value;
		seteTitile(val);
	}

	function handleDesc(event) {
		const val = event.target.value;
		seteDescription(val);
	}

	function handleComment(event) {
		const val = event.target.value;
		seteComment(val);
	}

	function handleDate(event) {
		const val = event.target.value;
		seteDate(val);
	}

	function handleTime(event) {
		const val = event.target.value;
		seteTime(val);
	}

	function handleSave() {
		const date = combineDateTime(eDate, eTime);
		const obj = {
			id: id,
			title: eTitle,
			description: eDescription,
			comment: eComment,
			deadline: date,
		};
		dispatch(updateItem(obj)).then(() => {
			navigate("/");
			dispatch(getAllTodos());
		});
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
			<main className="container mx-auto px-4 py-8 max-w-2xl">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Todo</h1>
					<p className="text-gray-600">Update your task details</p>
				</div>

				{/* Form Card */}
				<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
					<div className="space-y-6">
						{/* Title Input */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Title <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								value={eTitle}
								onChange={handleTitle}
								required
								placeholder="Enter todo title..."
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
							/>
						</div>

						{/* Description */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Description
							</label>
							<textarea
								value={eDescription}
								onChange={handleDesc}
								placeholder="Add more details about this todo..."
								rows={4}
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
							/>
						</div>

						{/* Comment */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Notes
							</label>
							<textarea
								value={eComment}
								onChange={handleComment}
								placeholder="Any additional notes or comments..."
								rows={3}
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
							/>
						</div>

						{/* Date and Time Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Due Date <span className="text-red-500">*</span>
								</label>
								<input
									type="date"
									value={eDate}
									onChange={handleDate}
									required
									className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Due Time
								</label>
								<input
									type="time"
									value={eTime}
									onChange={handleTime}
									className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
								/>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-4 pt-4">
							<button
								onClick={() => navigate("/")}
								className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								disabled={!eTitle.trim()}
								className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl transition-all font-medium"
							>
								Save Changes
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
