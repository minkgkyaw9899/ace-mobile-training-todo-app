import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoListScreen from "../screens/TodoListScreen";

type RootStackParamList = {
  TodoListScreen: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  return <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name='TodoListScreen' component={TodoListScreen} />
  </Stack.Navigator>
}