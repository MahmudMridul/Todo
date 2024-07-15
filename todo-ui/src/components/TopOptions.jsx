import React from "react";
import { useNavigate } from "react-router-dom";

export default function TopOptions() {
   const naviage = useNavigate();

   function gotoAddPage() {
      naviage("/add");
   }

   return (
      <>
         <hr className="mb-4"></hr>
         <div className="w-full flex justify-end">
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
