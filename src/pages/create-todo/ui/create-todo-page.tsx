import { CREATE_TODO, GET_TODOS } from '@/shared/api';
import { useMutation } from '@apollo/client/react';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

interface ICreateTodoPageProps {}

export function CreateTodoPage({}: ICreateTodoPageProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');

  const [createTodo, { loading }] = useMutation(CREATE_TODO, {
    refetchQueries: [GET_TODOS],
    awaitRefetchQueries: true,
  });

  const handleCreate = async () => {
    try {
      await createTodo({ variables: { title } });
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };

  const submitLabelOpacity = loading ? 0 : 1;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <LiquidGlassView interactive style={styles.inputGlass}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Todo..."
          placeholderTextColor={'gray'}
        />
      </LiquidGlassView>

      <LiquidGlassView
        interactive
        style={styles.submitGlass}
        tintColor={'green'}
      >
        <Pressable onPress={handleCreate}>
          <Text style={[styles.submitLabel, { opacity: submitLabelOpacity }]}>
            Create
          </Text>
          {loading && (
            <ActivityIndicator size={20} style={styles.submitSpinner} />
          )}
        </Pressable>
      </LiquidGlassView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, gap: 40 },
  inputGlass: {
    borderRadius: 20,
  },
  input: {
    padding: 16,
  },
  submitGlass: {
    padding: 16,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  submitLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  submitSpinner: {
    position: 'absolute',
  },
});
