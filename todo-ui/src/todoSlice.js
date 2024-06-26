import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { urls } from "./todoUtils";

const initialState = {
   todos: [],
};

export const getAllTodos = createAsyncThunk(
   "app/getAllTodos",
   async (obj, { dispatch, getState }) => {
      try {
         const url = urls.allTodos;
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
            state.todos = action.payload.data;
         })
         .addCase(getAllTodos.rejected, (state, action) => {

         })

         .addCase(removeItem.pending, (state, action) => {

         })
         .addCase(removeItem.fulfilled, (state, action) => {

         })
         .addCase(removeItem.rejected, (state, action) => {

         })
   }
});

export const { setState } = todoSlice.actions;
export default todoSlice.reducer;