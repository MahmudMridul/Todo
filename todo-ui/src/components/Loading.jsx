import React from "react";
import { useSelector } from "react-redux";

export default function Loading() {
   const states = useSelector((store) => store.todo);
   const { isLoading } = states;

   return (
      <div
         className={`w-full h-screen bg-zinc-950/70 ${
            isLoading ? "flex" : "hidden"
         } justify-center items-center z-50 fixed top-0 right-0`}
      >
         <img
            src="/images/sand-clock.png"
            alt="sand-clock"
            className="animate-bounce"
            height="80"
            width="80"
         />
      </div>
   );
}
