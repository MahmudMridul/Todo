import React from "react";

export default function Header({ headerText }) {
	return (
		<div className="text-center mb-8">
			<h1 className="text-5xl font-extrabold text-gray-800 mb-2 tracking-tight">
				{headerText}
			</h1>
			<p className="text-gray-500 text-lg">Stay organized and productive</p>
		</div>
	);
}
