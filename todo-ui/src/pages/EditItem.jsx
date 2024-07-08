import React, { useState } from "react";
import { store } from "../store";
import { useLoaderData, useNavigate } from "react-router-dom";
import { splitDateTime } from "../todoUtils";

export function loader({ params }) {
   const id = parseInt(params.id, 10);
   const todos = store.getState().todo.todos;
   const item = todos.find((obj) => obj.id === id);
   return item === undefined ? null : item;
}

export default function EditItem() {
   const { id, title, description, comment, deadline, isCompleted } =
      useLoaderData();

   const navigate = useNavigate();

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
      navigate("/");
   }

   return (
      <main className="container p-2 flex">
         <div className="grid grid-cols-6 gap-y-5 mt-10">
            <label className="col-span-2 text-xl">Title *</label>
            <input
               type="text"
               value={eTitle}
               onChange={handleTitle}
               required
               className="col-span-4 border-2 w-80 h-8 rounded-md text-xl"
            />

            <label className="col-span-2 text-xl">Description</label>
            <textarea
               type="text"
               value={eDescription}
               onChange={handleDesc}
               className="col-span-4 border-2 w-80 h-20 rounded-md text-xl"
            />

            <label className="col-span-2 text-xl">Comment</label>
            <textarea
               type="text"
               value={eComment}
               onChange={handleComment}
               className="col-span-4 border-2 w-80 h-20 rounded-md text-xl"
            />

            <label className="col-span-2 text-xl">Due Date *</label>
            <input
               type="date"
               value={eDate}
               onChange={handleDate}
               required
               className="col-span-4 border-2 w-80 h-8 rounded-md text-xl"
            />

            <label className="col-span-2 text-xl">Due Time *</label>
            <input
               type="time"
               value={eTime}
               onChange={handleTime}
               required
               className="col-span-4 border-2 w-80 h-8 rounded-md text-xl"
            />

            <button
               className="w-20 p-1 bg-gray-800 rounded-md text-white font-semibold"
               onClick={handleSave}
            >
               Save
            </button>
         </div>
      </main>
   );
}
