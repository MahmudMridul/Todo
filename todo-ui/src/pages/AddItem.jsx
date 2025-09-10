import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../todoSlice";
import { combineDateTime, getCurrentTime, getTodayDate } from "../todoUtils";
import Popup from "../components/Popup";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [description, setDesc] = useState("");
	const [comment, setComm] = useState("");
	const [deadline, setDeadline] = useState(getTodayDate());
	const [time, setTime] = useState(getCurrentTime());

	function handleTitle(event) {
		const val = event.target.value;
		setTitle(val);
	}

	function handleDesc(event) {
		const val = event.target.value;
		setDesc(val);
	}

	function handleComm(event) {
		const val = event.target.value;
		setComm(val);
	}

	function handleDeadline(event) {
		const val = event.target.value;
		setDeadline(val);
	}

	function handleTime(event) {
		const val = event.target.value;
		setTime(val);
	}

	function handleAdd() {
		const date = combineDateTime(deadline, time);
		const obj = {
			title,
			description,
			comment,
			deadline: date,
		};
		console.log("handleAdd", obj);
		dispatch(addItem(obj)).then(() => {
			navigate("/");
		});
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
			<main className="container mx-auto px-4 py-8 max-w-2xl">
				<Popup />
				<Loading />

				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						Create New Todo
					</h1>
					<p className="text-gray-600">Add a new task to stay organized</p>
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
								value={title}
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
								value={description}
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
								value={comment}
								onChange={handleComm}
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
									value={deadline}
									onChange={handleDeadline}
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
									value={time}
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
								onClick={handleAdd}
								disabled={!title.trim()}
								className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl transition-all font-medium"
							>
								Create Todo
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
