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
      popBgColor = "bg-lime-700";
   } else if (popupStatus === "warning") {
      popBgColor = "bg-amber-600";
   } else if (popupStatus === "info") {
      popBgColor = "bg-sky-500";
   } else if (popupStatus === "error") {
      popBgColor = "bg-rose-800";
   }

   return (
      <div
         className={`z-50 fixed top-10 right-8 w-full ${
            popupOpen ? "flex" : "hidden"
         } justify-end`}
      >
         <div
            className={`w-max h-max px-4 py-1 rounded-xl ${popBgColor} text-white font-medium`}
         >
            {popupMsg}
         </div>
      </div>
   );
}
