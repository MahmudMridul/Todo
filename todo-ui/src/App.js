import React, { useEffect } from 'react';
import Header from './components/Header';
import Popup from './components/Popup';
import List from './components/List';
import Loading from './components/Loading';
import TopOptions from './components/TopOptions';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTodos, setState } from './todoSlice';
import { filterItems } from './todoUtils';

export default function App() {
   const dispatch = useDispatch();
   const states = useSelector((store) => store.todo);
   const { todos, searchText, displayedTodos } = states;

   useEffect(() => {
      dispatch(getAllTodos());
   }, []);

   useEffect(() => {
      const items = filterItems(searchText, todos);
      dispatch(setState("displayedTodos", items));
   }, [searchText, todos]);

   return (
      <main className='container p-2'>
         <Popup />
         <Loading />
         <Header headerText={"Todos"} />
         <TopOptions />
         <List todos={displayedTodos} />
      </main>
   )
}
