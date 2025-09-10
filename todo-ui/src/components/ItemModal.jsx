import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearModalValues, setState } from "../todoSlice";

export default function ItemModal() {
	const dispatch = useDispatch();
	const states = useSelector((store) => store.todo);
	const { itemModalOpen, mTitle, mDesc, mComm, mDue } = states;

	function closeModal() {
		dispatch(setState("itemModalOpen", false));
		dispatch(clearModalValues());
	}

	return (
		<div
			className={`${
				itemModalOpen ? "flex" : "hidden"
			} fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm items-center justify-center p-4`}
			onClick={closeModal}
		>
			<div
				className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-100">
					<h2 className="text-xl font-semibold text-gray-800">Todo Details</h2>
					<button
						onClick={closeModal}
						className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
					>
						<svg
							className="h-5 w-5 text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Content */}
				<div className="p-6 space-y-4">
					<div>
						<h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
							Title
						</h3>
						<p className="text-lg font-semibold text-gray-800">{mTitle}</p>
					</div>

					{mDesc && (
						<div>
							<h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
								Description
							</h3>
							<p className="text-gray-700 leading-relaxed">{mDesc}</p>
						</div>
					)}

					{mComm && (
						<div>
							<h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
								Notes
							</h3>
							<p className="text-gray-700 leading-relaxed italic">{mComm}</p>
						</div>
					)}

					<div>
						<h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
							Due Date
						</h3>
						<div className="flex items-center gap-2 text-gray-800">
							<svg
								className="h-4 w-4 text-gray-400"
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
							<span>{mDue}</span>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="px-6 py-4 border-t border-gray-100">
					<button
						onClick={closeModal}
						className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
