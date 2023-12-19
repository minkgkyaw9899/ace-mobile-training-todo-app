import { AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axiosInstance"

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

export const createTodo = async (input: Todo) => {
  try {
    const response: AxiosResponse<Todo> = await axiosInstance.post('/todo', input)
    return response.data
  } catch (err) {

  }
}
