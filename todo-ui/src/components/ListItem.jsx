import React from "react";
import { formatDateString } from "../todoUtils";
import { useDispatch } from "react-redux";
import { getAllTodos, removeItem } from "../todoSlice";

export default function ListItem({ title, desc, comm, deadline, completed }) {
   const dispatch = useDispatch();

   function deleteItem() {
      dispatch(removeItem({ title })).then(() => dispatch(getAllTodos()));
   }

   return (
      <div
         className={`my-5 border-2 rounded-2xl p-4 border-gray-300 ${
            completed ? "bg-gray-300" : ""
         }`}
      >
         <div className="text-xl font-semibold mb-2">{title}</div>
         <div className="mb-1">{desc}</div>
         <div className="text-gray-500 mb-1">{comm}</div>
         <div className="mb-1">
            <span className="text-rose-800 font-semibold">Due:</span>{" "}
            {formatDateString(deadline)}
         </div>
         <hr className="mb-4"></hr>
         <button className="w-36 p-1 bg-green-700 rounded-md text-white font-semibold">
            {completed ? "Mark as Pending" : "Mark as Done"}
         </button>
         <button className="w-16 p-1 ml-3 bg-gray-800 rounded-md text-white font-semibold">
            Edit
         </button>
         <button
            className="w-16 p-1 ml-3 bg-rose-800 rounded-md text-white font-semibold"
            onClick={deleteItem}
         >
            Delete
         </button>
      </div>
   );
}
