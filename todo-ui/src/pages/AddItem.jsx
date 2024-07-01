import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../todoSlice";
import { getCurrentTime, getTodayDate } from "../todoUtils";
import Popup from "../components/Popup";
import Loading from "../components/Loading";

export default function AddItem() {
   const dispatch = useDispatch();

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

   function combineDateTime() {
      return `${deadline}T${time}:00.000Z`;
   }

   function handleAdd() {
      const date = combineDateTime();
      const obj = {
         title,
         description,
         comment,
         deadline: date,
      };
      console.log("handleAdd", obj);
      dispatch(addItem(obj));
   }

   return (
      <main className="container p-2 flex">
         <Popup />
         <Loading />
         <div className="grid grid-cols-6 gap-y-5 gap-x-2 mt-10">
            <label className="col-span-2 text-xl">Title *</label>
            <input
               type="text"
               value={title}
               onChange={handleTitle}
               required
               className="col-span-4 border-2 w-80 h-8 rounded-md text-xl"
            />

            <label className="col-span-2 text-xl">Description</label>
            <textarea
               type="text"
               value={description}
               onChange={handleDesc}
               className="col-span-4 border-2 w-80 h-20 rounded-md text-xl"
            />

            <label className="col-span-2 text-xl">Comment</label>
            <textarea
               type="text"
               value={comment}
               onChange={handleComm}
               className="col-span-4 border-2 w-80 h-20 rounded-md text-xl"
            />

            <label className="col-span-2 text-xl">Due Date *</label>
            <input
               type="date"
               value={deadline}
               onChange={handleDeadline}
               required
               className="col-span-4 border-2 w-80 h-8 rounded-md text-xl"
            />

            <label className="col-span-2 text-xl">Due Time</label>
            <input
               type="time"
               value={time}
               onChange={handleTime}
               className="col-span-4 border-2 w-80 h-8 rounded-md text-xl"
            />

            <button
               onClick={handleAdd}
               className="w-20 p-1 bg-gray-800 rounded-md text-white font-semibold"
            >
               Add
            </button>
         </div>
      </main>
   );
}
