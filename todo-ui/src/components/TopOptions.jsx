import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sortByOptions } from "../todoUtils";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../todoSlice";

export default function TopOptions() {
   const naviage = useNavigate();
   const dispatch = useDispatch();
   const [sortby, setSortby] = useState("Default");

   const states = useSelector((store) => store.todo);
   const { todos } = states;

   function gotoAddPage() {
      naviage("/add");
   }

   function handleSortBy(e) {
      const val = e.target.value;
      setSortby(val);

      let isAsc = false;
      let sortBy = "Default";

      if (val.includes("Name")) {
         sortBy = "Name";
      } else if (val.includes("Date")) {
         sortBy = "Date";
      } else if (val.includes("Completed")) {
         sortBy = "Completed";
      }

      if (val.includes("Asc")) {
         isAsc = true;
      }
      let list = todos.slice();
      list = sortTodos(list, sortBy, isAsc);
      dispatch(setState("todos", list));
   }

   function sortTodos(list, sortBy, isAsc) {
      return list.sort((a, b) => {
         let comparison = 0;

         if (sortBy === "Name") {
            comparison = a.title.localeCompare(b.title);
         } else if (sortBy === "Date") {
            comparison = new Date(a.deadline) - new Date(b.deadline);
         } else if (sortBy === "Completed") {
            comparison = a.isCompleted - b.isCompleted;
         }

         return isAsc ? comparison : -comparison;
      });
   }

   return (
      <>
         <hr className="mb-4"></hr>
         <div className="w-full flex justify-end">
            <div>
               <label className="font-semibold mx-2">Sort by</label>
               <select
                  className="h-8 border-2 border-gray-800 rounded-lg"
                  value={sortby}
                  onChange={handleSortBy}
               >
                  {sortByOptions.map((item, index) => {
                     return <option key={index}>{item}</option>;
                  })}
               </select>
            </div>

            <button
               className="w-16 p-1 ml-3 bg-gray-800 rounded-md text-white font-semibold"
               onClick={gotoAddPage}
            >
               Add
            </button>
         </div>
         <hr className="my-4"></hr>
      </>
   );
}
