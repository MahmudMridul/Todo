import React from "react";
import { formatDateString, truncateString } from "../todoUtils";
import { useDispatch, useSelector } from "react-redux";
import {
   getAllTodos,
   removeItem,
   setModalValues,
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

   function openModal() {
      dispatch(
         setModalValues({
            mTitle: title,
            mDesc: desc,
            mComm: comm,
            mDue: formatDateString(deadline),
         })
      );
      dispatch(setState("itemModalOpen", true));
   }

   return (
      <div
         className={`h-48 my-8 rounded-2xl p-4 border-gray-300 shadow-lg hover:shadow-2xl hover:scale-101 ${
            completed || expired ? "bg-gray-300" : ""
         }`}
         onClick={openModal}
      >
         {/* commented this because not required */}
         {/*<div
            className={`${
               !completed && expired ? "block" : "hidden"
            } font-bold text-white p-1 text-center w-24 rounded-xl bg-rose-700`}
         >
            Overdue!
         </div>*/}
         {/* Title */}
         <div className="text-xl font-semibold mb-2">{title}</div>
         {/* Description */}
         <div className="mb-1">{truncateString(desc, 45)}</div>
         {/* Comment */}
         <div className="text-gray-500 mb-1">{truncateString(comm, 45)}</div>
         {/* Due date */}
         <div className="mb-1">
            <span className="text-rose-800 font-semibold">Due:</span>{" "}
            {formatDateString(deadline)}
         </div>
         <hr className="mb-4"></hr>
         <div className="flex align-middle mb-1">
            {/* mark as completed button */}
            <button className={`w-12`} onClick={toggleCompleted}>
               <img
                  src={`${
                     completed ? "/images/done.png" : "/images/checkbox.png"
                  }`}
                  alt="done/reject"
                  width="25"
                  height="25"
                  className="mt-1"
               />
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
