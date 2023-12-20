import { AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axiosInstance"
import { QueryFunctionContext } from "@tanstack/react-query";

export type Todo = {
  id: string;
  title: string
}

export const getAllTodoList = async () => {
  try {
    const response: AxiosResponse<Todo[]> = await axiosInstance.get('/todo')
    
    return response.data
  } catch (err) {
    throw err
  }
}

export const getTodoItem = async ({ queryKey }: QueryFunctionContext) => {
  const [_, id] = queryKey
  try {
    const response: AxiosResponse<Todo> = await axiosInstance.get(`/todo/${id}`)
    
    return response.data
  } catch (err) {
    throw err
  }
}

export const createTodo = async (input: Todo) => {
  try {
    const response: AxiosResponse<Todo> = await axiosInstance.post('/todo', input)
    return response.data
  } catch (err) {
    throw err
  }
}

export const updateTodo = async (input: Todo) => {
  try {
    const response: AxiosResponse<Todo> = await axiosInstance.patch(`/todo/${input.id}`, {title: input.title})
    return response.data
  } catch (err) {
    throw err
  }
}

export const deleteTodo = async (id: string) => {
  try {
    const response: AxiosResponse<Todo> = await axiosInstance.delete(`/todo/${id}`,)
    return response.data
  } catch (err) {
    throw err
  }
}