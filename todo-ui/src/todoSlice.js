import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   todos: [],
};

export const getAllTodos = createAsyncThunk(
   "app/getAllTodos",
   async (obj, { dispatch, getState }) => {

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
   }
});

export const { setState } = todoSlice.actions;
export default todoSlice.reducer;