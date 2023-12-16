import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import z from 'zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { nanoid } from 'nanoid'

const schema = z.object({
  title: z.string({required_error: 'Title is required'}).min(6, 'Todo title must be min 6'),
})

type FormField = z.infer<typeof schema>

const TodoListScreen = () => {
  const {control, handleSubmit, reset} = useForm<FormField>({
    defaultValues: {
      title: ''
    },
    resolver: zodResolver(schema)
  })

  const [todoList, setTodoList] = useState<{id: string, title: string}[]>([])

  const onSubmitHandler: SubmitHandler<FormField> = (value) => {
    const id = Math.floor(Math.random() * 1234456).toString()
    setTodoList(prev => [...prev, { id, title: value.title }])
    reset()
  }

  return (
    <View style={{flex: 1, backgroundColor: "black"}}>
      <View style={{flexDirection: "row", alignItems: 'center', gap: 24, marginVertical: 32, marginHorizontal: 16}}>
        <Controller control={control} name='title'
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <View>
              <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={'white'}
            style={{ borderWidth: 1, borderColor: 'white', minWidth: 280, color: 'white' }}
                placeholder='Add todo here' />
              <Text style={{color: 'white', fontSize: 16}}>{error?.message}</Text>
            </View>
          )} />
        <Button title='add' onPress={handleSubmit(onSubmitHandler)} />
      </View>
      
      <FlatList data={todoList} keyExtractor={item => item.id} renderItem={({ item }) => <View style={{borderWidth: 1, borderColor: '#fff', marginHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{color: '#fff', paddingHorizontal: 24, fontSize: 24}}>
          {item.title}
        </Text>
        <TouchableOpacity>
          <Text style={{color: 'red', fontSize: 16, marginRight: 24}}>DELETE</Text>
        </TouchableOpacity>
      </View>} />
    </View>
  )
}

export default TodoListScreen

const styles = StyleSheet.create({})