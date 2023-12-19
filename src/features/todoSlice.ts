import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  title: string;
}

const initialState: Todo[] = []

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTdo: (state, action: PayloadAction<Todo>) => {
      state = [...state, action.payload]
      return state
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const filteredTodo = state.filter(todo => todo.id !== action.payload)
      state = filteredTodo
      return state;
    },
    updatedTodo: (state, action: PayloadAction<Todo>) => {
      const {id, title } = action.payload
      const todoList = state.map(todo => todo.id === id ? {id, title}: todo)
      state = todoList
      return state
    }
  }
})


export const { addTdo, deleteTodo, updatedTodo } = todoSlice.actions

export default todoSlice.reducer