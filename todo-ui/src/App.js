import React from 'react';
import Header from './components/Header';
import Popup from './components/Popup';
import List from './components/List';
import { useNavigate } from 'react-router-dom';

export default function App() {
   const naviage = useNavigate();

   function gotoAddPage() {
      naviage("/add");
   }

   return (
      <main className='container p-2'>
         <Popup />
         <Header headerText={"Todos"} />
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
         <List />
      </main>
   )
}
