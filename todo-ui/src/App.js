import React from 'react';
import Header from './components/Header';
import Popup from './components/Popup';
import List from './components/List';
import Loading from './components/Loading';
import TopOptions from './components/TopOptions';

export default function App() {


   return (
      <main className='container p-2'>
         <Popup />
         <Loading />
         <Header headerText={"Todos"} />
         <TopOptions />
         <List />
      </main>
   )
}
