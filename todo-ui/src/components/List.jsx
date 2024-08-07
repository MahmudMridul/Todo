import React, { useEffect } from "react";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from "../todoSlice";

export default function List() {
   const dispatch = useDispatch();
   const states = useSelector((store) => store.todo);
   const { todos } = states;
   useEffect(() => {
      dispatch(getAllTodos());
   }, []);

   return (
      <div>
         {todos.map((item, index) => {
            const {
               id,
               title,
               description,
               comment,
               deadline,
               isCompleted,
               isExpired,
            } = item;
            return (
               <ListItem
                  key={index}
                  id={id}
                  title={title}
                  desc={description}
                  comm={comment}
                  deadline={deadline}
                  completed={isCompleted}
                  expired={isExpired}
               />
            );
         })}
      </div>
   );
}
