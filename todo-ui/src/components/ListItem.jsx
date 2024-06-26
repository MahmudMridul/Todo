import React from "react";
import { formatDateString } from "../todoUtils";

export default function ListItem({ title, desc, comm, deadline }) {
   return (
      <div className="my-5 border-2 rounded-2xl p-4 border-gray-400">
         <div className="text-xl font-semibold mb-2">{title}</div>
         <div className="mb-1">{desc}</div>
         <div className="text-gray-500 mb-1">{comm}</div>
         <div className="mb-1">
            <span className="text-rose-800 font-semibold">Due:</span>{" "}
            {formatDateString(deadline)}
         </div>
         <hr className="mb-4"></hr>
         <button className="w-16 p-1 bg-gray-800 rounded-md text-white font-semibold">
            Edit
         </button>
         <button className="w-16 p-1 mx-3 bg-rose-800 rounded-md text-white font-semibold">
            Delete
         </button>
      </div>
   );
}
