import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { urls } from "./todoUtils";

const initialState = {
   todos: [],

   popupMsg: "",
   popupOpen: false,
   popupStatus: "default", // default, success, warning, info, error

   isLoading: false,
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
         const response = await fetch(url, {
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
         const response = await fetch(url, {
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

export const updateItem = createAsyncThunk(
   "app/updateItem",
   async (obj, { dispatch, getState }) => {
      try {
         const url = `${urls.update}${obj.id}`;
         const response = await fetch(url, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
            },
            body: JSON.stringify(obj),
         });
         const data = await response.json();
         return data;
      }
      catch (error) {
         console.error("Error from updateItem: ", error);
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
            state.isLoading = true;
         })
         .addCase(getAllTodos.fulfilled, (state, action) => {
            if (action.payload && "data" in action.payload) {
               const { data, isSuccess, message } = action.payload;
               state.todos = data;
               if (isSuccess === false) {
                  state.popupStatus = "error";
                  state.popupMsg = message;
                  state.popupOpen = true;
               }
            }
            else {
               console.error("Error");
            }
            state.isLoading = false;
         })
         .addCase(getAllTodos.rejected, (state, action) => {
            state.isLoading = false;
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
            state.isLoading = true;
         })
         .addCase(addItem.fulfilled, (state, action) => {
            if (action.payload && "isSuccess" in action.payload) {
               const { isSuccess, message } = action.payload;
               state.popupStatus = isSuccess === true ? "success" : "error";
               state.popupMsg = message;
               state.popupOpen = true;
            }
            else {
               console.error("Error");
            }
            state.isLoading = false;
         })
         .addCase(addItem.rejected, (state, action) => {
            state.isLoading = false;
         })

         .addCase(updateItem.pending, (state, action) => {
            state.isLoading = true;
         })
         .addCase(updateItem.fulfilled, (state, action) => {
            if (action.payload && "isSuccess" in action.payload) {
               const { isSuccess, message } = action.payload;
               state.popupStatus = isSuccess === true ? "success" : "error";
               state.popupMsg = message;
               state.popupOpen = true;
            }
            else {
               console.error("Error");
            }
            state.isLoading = false;
         })
         .addCase(updateItem.rejected, (state, action) => {
            state.isLoading = false;
         })
   }
});

export const { setState } = todoSlice.actions;
export default todoSlice.reducer;