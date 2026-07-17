import { UPDATE_TODO } from '@/shared/api';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { View, StyleSheet, Pressable, TextInput } from 'react-native';

interface ITodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

export function TodoItem({
  id,
  title: initialTitle,
  completed,
}: ITodoItemProps) {
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [title, setTitle] = useState(initialTitle);

  const handleToggle = async () => {
    await updateTodo({
      variables: {
        id,
        completed: !completed,
      },
    });
  };

  const handleRename = async () => {
    if (title === initialTitle) return;

    try {
      await updateTodo({
        variables: {
          id,
          title,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.completedBorder} onPress={handleToggle}>
        {completed && <View style={styles.completed} />}
      </Pressable>

      <TextInput
        style={styles.title}
        onBlur={handleRename}
        value={title}
        onChangeText={setTitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flexDirection: 'row', gap: 16 },
  title: { fontWeight: '500', fontSize: 16, height: 20, flex: 1 },
  completed: { backgroundColor: 'green', borderRadius: 12, flex: 1 },
  completedBorder: {
    borderRadius: 20,
    width: 20,
    height: 20,
    padding: 2,
    borderWidth: 1,
    borderColor: 'gray',
  },
});
