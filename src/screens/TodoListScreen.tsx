import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import z from 'zod';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
// import { nanoid } from 'nanoid'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import TrashIcon from '../../assets/icons/trash.svg'
import EditIcon from '../../assets/icons/edit.svg';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addTdo, deleteTodo, updatedTodo } from '../features/todoSlice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createTodo, getAllTodoList } from '../api/todo';
import { queryClient } from '../utils/queryClient';

const schema = z.object({
  title: z
    .string({required_error: 'Title is required'})
    .min(6, 'Todo title must be min 6'),
});

type FormField = z.infer<typeof schema>;

const TodoListScreen = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editTodoId, setEditTodoId] = useState<string | undefined>(undefined)

  const {control, handleSubmit, reset, setValue, setError} = useForm<FormField>({
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

  // const onUpdateHandler = (item: {id: string, title: string}) => {
  //   setIsEdit(true);
  //   setError('title', {message: 'please upate data'})
  //   setEditTodoId(item.id)
  //   setValue('title', item.title)
  // }

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
    }
  })

  const onSubmitHandler: SubmitHandler<FormField> = async value => {
  
      const id = Math.floor(Math.random() * 1234456).toString();
  
      await mutateAsync({id, title: value.title})
      reset();
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 24,
          marginVertical: 32,
          marginHorizontal: 16,
        }}>
        <Controller
          control={control}
          name="title"
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <View>
              <TextInput
                // onEndEditing={handleSubmit(onSubmitHandler)}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor={'white'}
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  minWidth: 280,
                  color: 'white',
                }}
                placeholder="Add todo here"
              />
              <Text style={{color: 'white', fontSize: 16}}>
                {error?.message}
              </Text>
            </View>
          )}
        />
        <Button title={isEdit ? 'update' : 'add'} onPress={handleSubmit(onSubmitHandler)} />
      </View>

      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={{marginVertical: 8}} />}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: '#fff',
              marginHorizontal: 24,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', paddingHorizontal: 24, fontSize: 24}}>
              {item.title}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <TouchableOpacity>
              {/* <MaterialIcon name='edit-note' color={'green'} size={32} /> */}
              <EditIcon width={32} height={32} style={{backgroundColor: 'white'}} />
            </TouchableOpacity>
            <TouchableOpacity>
              <TrashIcon width={32} height={32} style={{backgroundColor: 'white'}} />
              {/* <EvilIcons name='trash' color={'red'} size={32} /> */}
            </TouchableOpacity>
              </View>
          </View>
        )}
      />
    </View>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({});
