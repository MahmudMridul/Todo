import React from "react";
import { store } from "../store";
import { useLoaderData } from "react-router-dom";

export function loader({ params }) {
   const id = parseInt(params.id, 10);
   const todos = store.getState().todo.todos;
   const item = todos.find((obj) => obj.id === id);
   return item === undefined ? null : item;
}

export default function EditItem() {
   const { id, title, description, comment, deadline, isCompleted } =
      useLoaderData();
   console.log(title, description, comment);
   return (
      <main className="container p-2 flex">
         <div className="grid grid-cols-6 gap-y-5 mt-10">
            <label className="col-span-2 text-xl">Title *</label>
            <input
               type="text"
               required
               className="col-span-4 border-2 w-80 h-8 rounded-md text-xl"
            />

            <label className="col-span-2 text-xl">Description</label>
            <textarea
               type="text"
               className="col-span-4 border-2 w-80 h-20 rounded-md text-xl"
            />

            <label className="col-span-2 text-xl">Comment</label>
            <textarea
               type="text"
               className="col-span-4 border-2 w-80 h-20 rounded-md text-xl"
            />

            <label className="col-span-2 text-xl">Due Date *</label>
            <input
               type="date"
               required
               className="col-span-4 border-2 w-80 h-8 rounded-md text-xl"
            />

            <button className="w-20 p-1 bg-gray-800 rounded-md text-white font-semibold">
               Save
            </button>
         </div>
      </main>
   );
}
