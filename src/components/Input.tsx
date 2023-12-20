import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface Props<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  disable?: boolean
}

export const Input = (props: Props<any>) => {
  const { control, name, disable = false } = props
  return (
    <Controller
          control={control}
          name={name}
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <View>
              <TextInput
                editable={!disable}
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
  )
}

export default Input

const styles = StyleSheet.create({})