import React from "react";
import { useNavigate } from "react-router-dom";
import { sortByOptions } from "../todoUtils";

export default function TopOptions() {
   const naviage = useNavigate();

   function gotoAddPage() {
      naviage("/add");
   }

   return (
      <>
         <hr className="mb-4"></hr>
         <div className="w-full flex justify-end">
            <div>
               <label className="font-semibold mx-2">Sort by</label>
               <select className="h-8 border-2 border-gray-800 rounded-lg">
                  {sortByOptions.map((item, index) => {
                     return <option key={index}>{item.value}</option>;
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
