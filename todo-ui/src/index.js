import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';


const router = createBrowserRouter([
   {
      path: "/",
      element: <App />
   },
   {
      path: "/add",
      element: <AddItem />
   },
   {
      path: "/edit",
      element: <EditItem />
   }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </React.StrictMode>
);
