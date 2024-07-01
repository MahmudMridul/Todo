import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { urls } from "./todoUtils";

const initialState = {
   todos: [],

   popupMsg: "Popup message",
   popupOpen: true,
   popupStatus: "error", // default, success, warning, info, error
};

export const getAllTodos = createAsyncThunk(
   "app/getAllTodos",
   async (obj, { dispatch, getState }) => {
      try {
         const url = urls.common;
         const response = await fetch(url, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json"
            }
         });
         const data = await response.json();
         return data;
      }
      catch (error) {
         console.error("Error from getAllTodos: ", error);
      }
   }
);

export const removeItem = createAsyncThunk(
   "app/removeItem",
   async (obj, { dispatch, getState }) => {
      try {
         const { title } = obj;
         const url = `${urls.remove}${title}`;
         const response = await fetch(url, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json"
            }
         });
         const data = await response.json();
         return data;
      }
      catch (error) {
         console.error("Error from removeItem: ", error);
      }
   }
);

export const toggleIsCompleted = createAsyncThunk(
   "app/toggleIsCompleted",
   async (obj, { dispatch, getState }) => {
      try {
         const url = `${urls.toggleDone}`;
         const response = fetch(url, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json"
            },
            body: JSON.stringify(obj),
         });
         const data = await response.json();
         return data;
      }
      catch (error) {
         console.error("Error from toggleIsCompleted: ", error);
      }
   }
);

export const addItem = createAsyncThunk(
   "app/addItem",
   async (obj, { dispatch, getState }) => {
      try {
         const url = `${urls.common}`;
         const response = fetch(url, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json"
            },
            body: JSON.stringify(obj),
         });
         const data = await response.json();
         return data;
      }
      catch (error) {
         console.error("Error from addItem: ", error);
      }
   }
);

export const todoSlice = createSlice({
   name: "todo",
   initialState,
   reducers: {
      setState: {
         prepare(name, value) {
            return {
               payload: { name, value }
            };
         },
         reducer(state, action) {
            const { name, value } = action.payload;
            state[name] = value;
         }
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(getAllTodos.pending, (state, action) => {

         })
         .addCase(getAllTodos.fulfilled, (state, action) => {
            if (action.payload && "data" in action.payload) {
               state.todos = action.payload.data;
            }
            else {
               console.error("Error");
            }
         })
         .addCase(getAllTodos.rejected, (state, action) => {

         })

         .addCase(removeItem.pending, (state, action) => {

         })
         .addCase(removeItem.fulfilled, (state, action) => {

         })
         .addCase(removeItem.rejected, (state, action) => {

         })

         .addCase(toggleIsCompleted.pending, (state, action) => {

         })
         .addCase(toggleIsCompleted.fulfilled, (state, action) => {

         })
         .addCase(toggleIsCompleted.rejected, (state, action) => {

         })

         .addCase(addItem.pending, (state, action) => {

         })
         .addCase(addItem.fulfilled, (state, action) => {

         })
         .addCase(addItem.rejected, (state, action) => {

         })
   }
});

export const { setState } = todoSlice.actions;
export default todoSlice.reducer;