import { CreateTodoPage } from '@/pages/create-todo';
import { TodoListPage } from '@/pages/todo-list';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator({
  screens: {
    Todos: {
      screen: TodoListPage,
      options: {
        headerLargeTitleEnabled: true,
      },
    },
    CreateTodo: {
      screen: CreateTodoPage,
      options: {
        presentation: 'formSheet',
        sheetAllowedDetents: [0.5, 1] as number[],
        sheetInitialDetentIndex: 0,
        headerTransparent: true,
        headerTitle: 'Create',
        sheetGrabberVisible: true,
        keyboardHandlingEnabled: true,
        contentStyle: { backgroundColor: 'rgba(0,0,0,0)' },
      },
    },
  },
});

type RootStackType = typeof RootStack;

declare module '@react-navigation/core' {
  interface RootNavigator extends RootStackType {}
}

export const Navigation = createStaticNavigation(RootStack);
