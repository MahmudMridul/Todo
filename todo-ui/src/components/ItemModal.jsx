import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearModalValues, setState } from "../todoSlice";

export default function ItemModal() {
   const dispatch = useDispatch();
   const states = useSelector((store) => store.todo);
   const { itemModalOpen, mTitle, mDesc, mComm, mDue } = states;

   function closeModal() {
      dispatch(setState("itemModalOpen", false));
      dispatch(clearModalValues());
   }

   return (
      <div
         className={`${
            itemModalOpen ? "block" : "hidden"
         }z-50 fixed top-0 left-0 w-screen h-screen bg-black flex justify-center items-center opacity-80`}
      >
         <div className="bg-white p-5 rounded-3xl h-auto w-1/2 opacity-100 text-xl">
            <div className="flex justify-end m-1">
               <button onClick={closeModal}>
                  <img
                     src="/images/close.png"
                     alt="close"
                     width="25"
                     height="25"
                  />
               </button>
            </div>

            <div className="m-1">
               <span className="font-bold">Title: </span>
               <span>{mTitle}</span>
            </div>

            <div className="m-1">
               <span className="font-bold">Description: </span>
               <span>{mDesc}</span>
            </div>

            <div className="m-1">
               <span className="font-bold">Comment: </span>
               <span>{mComm}</span>
            </div>

            <div className="m-1">
               <span className="font-bold">Due: </span>
               <span>{mDue}</span>
            </div>
         </div>
      </div>
   );
}
