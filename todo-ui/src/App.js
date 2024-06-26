import React, { useEffect } from 'react'
import Header from './components/Header'
import ListItem from './components/ListItem'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTodos } from './todoSlice';

export default function App() {
   const dispatch = useDispatch();
   const states = useSelector(store => store.todo);
   const { todos } = states;
   useEffect(() => {
      dispatch(getAllTodos());
   }, []);
   return (
      <main className='container p-2'>
         <Header headerText={"Todos"} />
         {todos.map((item, index) => {
            const { id, title, description, comment, deadline, isCompleted } = item;
            return (
               <ListItem
                  key={index}
                  id={id}
                  title={title}
                  desc={description}
                  comm={comment}
                  deadline={deadline}
                  completed={isCompleted}
               />
            );
         })}
      </main>
   )
}
