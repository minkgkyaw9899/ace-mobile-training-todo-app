import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Todo, createTodo, deleteTodo, getAllTodoList, updateTodo } from "../../api/todo";
import { queryClient } from "../../utils/queryClient";
import z from 'zod';

const schema = z.object({
  title: z
    .string({required_error: 'Title is required'})
    .min(6, 'Todo title must be min 6'),
  status: z.string()
});

type FormField = z.infer<typeof schema>;

export const useTodo = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editTodoId, setEditTodoId] = useState<string | undefined>(undefined)

  const {control, handleSubmit, reset, setValue, watch} = useForm<FormField>({
    defaultValues: {
      title: '',
    },
    resolver: zodResolver(schema),
  });

  // const todo = useAppSelector(state => state.todo)

  // const dispatch = useAppDispatch()

  // const onDeleteHandler = (id: string) => {
  //   dispatch(deleteTodo(id))
  // }

  const onUpdateHandler = (item: {id: string, title: string}) => {
    setIsEdit(true);
    setEditTodoId(item.id)
    setValue('title', item.title)
  }

  // get all todo list from api
  const {data} = useQuery({
    queryKey: ['todo-list'],
    queryFn: getAllTodoList
  })

  // add new todo to api
  const { mutateAsync } = useMutation({
    mutationKey: ['add-todo'],
    mutationFn: createTodo,
    onError: (err) => {
// show error on ui
    },
    onSuccess: async (data) => {
      return await queryClient.invalidateQueries({queryKey: ['todo-list']})
      // return console.log(data);
      return queryClient.setQueryData(['todo-list'], (oldData: Todo[]) => {
        return oldData ? [...oldData, data] : oldData
      })
    }
  })

  // update todo
  const {mutate} = useMutation({
    mutationKey: ['update-todo'],
    mutationFn: updateTodo,
    onSuccess: async () => await queryClient.invalidateQueries({queryKey: ['todo-list']})
  })

  const onSubmitHandler: SubmitHandler<FormField> = async value => {
    if (isEdit) {
      // console.log(value.title)
      mutate({ id: editTodoId!, title: value.title })
      setIsEdit(false)
    } else {
      const id = Math.floor(Math.random() * 1234456).toString();
      await mutateAsync({id, title: value.title})
    }
    return reset();
  };

  // delete handler
  const {mutateAsync: deleteTodoById} = useMutation({
    mutationFn: deleteTodo,
    onSuccess: async () => await queryClient.invalidateQueries({queryKey: ['todo-list']})
  })

  const onDeleteHandler = async (id: string) => {
    return deleteTodoById(id)
  }


  const addOrUpdateHandler = handleSubmit(onSubmitHandler)
  return {control, isEdit, watch, addOrUpdateHandler, data, onDeleteHandler, onUpdateHandler, setValue}
}