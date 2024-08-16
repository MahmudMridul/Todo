import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../todoSlice";

export default function Popup() {
   const dispatch = useDispatch();
   const states = useSelector((store) => store.todo);
   const { popupMsg, popupOpen, popupStatus } = states;

   useEffect(() => {
      const timer = setTimeout(() => {
         dispatch(setState("popupOpen", false));
      }, 3000);

      return () => clearTimeout(timer);
   }, [popupOpen]);

   let popBgColor = "bg-gray-100";
   if (popupStatus === "success") {
      popBgColor = "bg-gradient-to-r from-lime-500 to-green-700";
   } else if (popupStatus === "warning") {
      popBgColor = "bg-gradient-to-r from-yellow-300 to-amber-500";
   } else if (popupStatus === "info") {
      popBgColor = "bg-gradient-to-r from-cyan-500 to-blue-500";
   } else if (popupStatus === "error") {
      popBgColor = "bg-gradient-to-r from-rose-400 to-red-800";
   }

   return (
      <div
         className={`z-50 fixed top-10 right-8 w-full ${
            popupOpen ? "flex" : "hidden"
         } justify-end`}
      >
         <div
            className={`w-max h-max px-4 py-2 rounded-md ${popBgColor} text-white font-medium`}
         >
            {popupMsg}
         </div>
      </div>
   );
}
