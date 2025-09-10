import React, { useEffect } from "react";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from "../todoSlice";

export default function List({ todos }) {
	// useEffect(() => {
	//    console.log(searchText);
	// }, [searchText]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			{todos.length === 0 ? (
				<div className="col-span-full text-center py-12">
					<div className="text-gray-400 text-6xl mb-4">📝</div>
					<h3 className="text-xl font-medium text-gray-500 mb-2">
						No todos yet
					</h3>
					<p className="text-gray-400">
						Create your first todo to get started!
					</p>
				</div>
			) : (
				todos.map((item, index) => {
					const { id, title, description, comment, deadline, isCompleted } =
						item;
					return (
						<ListItem
							key={index}
							id={id}
							title={title}
							desc={description}
							comm={comment}
							deadline={deadline}
							completed={isCompleted}
							expired={new Date() > new Date(deadline)}
						/>
					);
				})
			)}
		</div>
	);
}
