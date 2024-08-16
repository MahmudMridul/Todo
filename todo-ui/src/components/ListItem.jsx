import React from "react";
import { formatDateString } from "../todoUtils";
import { useDispatch, useSelector } from "react-redux";
import {
   getAllTodos,
   removeItem,
   setState,
   toggleIsCompleted,
} from "../todoSlice";
import { useNavigate } from "react-router-dom";

export default function ListItem({
   id,
   title,
   desc,
   comm,
   deadline,
   completed,
   expired,
}) {
   const dispatch = useDispatch();
   const states = useSelector((store) => store.todo);
   const { todos } = states;

   const navigate = useNavigate();

   function deleteItem() {
      dispatch(removeItem({ title })).then(() => dispatch(getAllTodos()));
   }

   function toggleCompleted() {
      const updated = todos.map((item) => {
         if (item.id === id) {
            return {
               ...item,
               isCompleted: !completed,
            };
         }
         return item;
      });
      dispatch(setState("todos", updated));
      const obj = {
         id,
         status: !completed,
      };
      dispatch(toggleIsCompleted(obj)).then(() => dispatch(getAllTodos()));
   }

   function gotoEditPage() {
      navigate(`/edit/${id}`);
   }

   return (
      <div
         className={`my-8 rounded-2xl p-4 border-gray-300 shadow-lg hover:shadow-2xl hover:scale-101 ${
            completed || expired ? "bg-gray-300" : ""
         }`}
      >
         <div
            className={`${
               !completed && expired ? "block" : "hidden"
            } font-bold text-white p-1 text-center w-24 rounded-xl bg-rose-700`}
         >
            Overdue!
         </div>
         <div className="text-xl font-semibold mb-2">{title}</div>
         <div className="mb-1">{desc}</div>
         <div className="text-gray-500 mb-1">{comm}</div>
         <div className="mb-1">
            <span className="text-rose-800 font-semibold">Due:</span>{" "}
            {formatDateString(deadline)}
         </div>
         <hr className="mb-4"></hr>
         <div className="flex align-middle">
            {/* mark as completed button */}
            <button className={`w-12`} onClick={toggleCompleted}>
               <img src="/images/done.png" alt="done" width="30" height="30" />
            </button>
            {/* edit button */}
            <button className="w-12 ml-3" onClick={gotoEditPage}>
               <img src="/images/edit.png" alt="edit" width="25" height="25" />
            </button>
            {/* delete button */}
            <button className="w-12 ml-3" onClick={deleteItem}>
               <img
                  src="/images/delete.png"
                  alt="delete"
                  width="25"
                  height="25"
               />
            </button>
         </div>
      </div>
   );
}
