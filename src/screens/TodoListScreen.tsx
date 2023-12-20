import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
// import { nanoid } from 'nanoid'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import TrashIcon from '../../assets/icons/trash.svg'
import EditIcon from '../../assets/icons/edit.svg';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addTdo } from '../features/todoSlice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Todo, createTodo, getAllTodoList , getTodoItem, updateTodo, deleteTodo} from '../api/todo';
import { queryClient } from '../utils/queryClient';
import jestConfig from '../../jest.config';
import { useTodo } from './hooks/useTodo';
import Input from '../components/Input';
import Modal from 'react-native-modal'
const TodoListScreen = () => {
  
  const { control, setValue, isEdit, addOrUpdateHandler, data, onUpdateHandler, onDeleteHandler, watch } = useTodo();

  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)

  const handleOnCompleted = () => {
    setShowModal(false)
    setValue('status', 'completed')
  }

  useEffect(() => {
    const status = watch('status')
    console.log(status)
  }, [watch('status')])

   const handleOnUnCompleted = () => {
    setShowModal(false)
    setValue('status', 'uncompleted')
  }

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

        <Input name="title" control={control} />
        <Button title={isEdit ? 'update' : 'add'} onPress={addOrUpdateHandler} />
      </View>

      <Pressable onPress={handleShowModal}>
        <Input control={control} name={'status'} disable />
      </Pressable>
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
              <TouchableOpacity onPress={() => onUpdateHandler(item)}>
              {/* <MaterialIcon name='edit-note' color={'green'} size={32} /> */}
              <EditIcon width={32} height={32} style={{backgroundColor: 'white'}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDeleteHandler(item.id)}>
              <TrashIcon width={32} height={32} style={{backgroundColor: 'white'}} />
              {/* <EvilIcons name='trash' color={'red'} size={32} /> */}
            </TouchableOpacity>
              </View>
          </View>
        )}
      />
      <Modal isVisible={showModal} style={{flex: 1, margin: 0, justifyContent: "flex-end"}}>
        <View style={{backgroundColor: 'white', paddingVertical: 24}}>
          <Text> Hello world</Text>
          <Pressable onPress={() => handleOnCompleted()} style={{marginVertical: 24, backgroundColor: '#cbd5e1', padding: 16}}>
            <Text>Completed</Text>
          </Pressable>
          <Pressable onPress={handleOnUnCompleted} style={{marginVertical: 24, backgroundColor: '#cbd5e1', padding: 16}}>
            <Text>UnCompleted</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({});
