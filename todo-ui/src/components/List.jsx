import React, { useEffect } from "react";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from "../todoSlice";

export default function List({ todos }) {
   // useEffect(() => {
   //    console.log(searchText);
   // }, [searchText]);

   return (
      <div className="grid lap:grid-cols-3 tabL:grid-cols-2 gap-x-5 gap-y-1">
         {todos.map((item, index) => {
            const { id, title, description, comment, deadline, isCompleted } =
               item;
            return (
               <ListItem
                  key={index}
                  id={id}
                  title={title}
                  desc={description}
                  comm={comment}
                  deadline={deadline}
                  completed={isCompleted}
                  expired={new Date() > new Date(deadline)}
               />
            );
         })}
      </div>
   );
}
