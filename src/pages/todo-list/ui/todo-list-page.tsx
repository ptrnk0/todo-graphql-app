import { View, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { useQuery } from '@apollo/client/react';
import { GET_TODOS } from '@/shared/api';
import { TodoItem } from '@/pages/create-todo/ui/todo-item';

interface ITodoListPageProps {}

export function TodoListPage({}: ITodoListPageProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { data } = useQuery(GET_TODOS);

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.todos ?? []}
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
        }}
        keyExtractor={item => String(item?.id)}
        renderItem={({ item }) => <TodoItem {...item} />}
      />

      <LiquidGlassView
        interactive
        style={[styles.button, { bottom: insets.bottom }]}
        tintColor={'green'}
      >
        <Pressable onPress={() => navigation.navigate('CreateTodo')}>
          <Image
            source={{
              uri: 'https://img.icons8.com/sf-regular-filled/96/FFFFFF/plus-math.png',
            }}
            style={styles.image}
          />
        </Pressable>
      </LiquidGlassView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  button: {
    position: 'absolute',
    right: 16,
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: 24, height: 24 },
});
