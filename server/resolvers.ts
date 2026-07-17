import {
  deleteTodo,
  getTodo,
  getTodos,
  insertTodo,
  saveTodo,
  type Todo,
} from './db.ts';

interface UpdateTodoArgs {
  id: string;
  title?: string | null;
  completed?: boolean | null;
}

export const resolvers = {
  Query: {
    todos: (): Todo[] => getTodos(),
    todo: (_parent: unknown, { id }: { id: string }): Todo | null =>
      getTodo(Number(id)),
  },

  Mutation: {
    createTodo: (_parent: unknown, { title }: { title: string }): Todo =>
      insertTodo(title),

    updateTodo: (_parent: unknown, args: UpdateTodoArgs): Todo | null => {
      const existing = getTodo(Number(args.id));
      if (!existing) {
        return null;
      }

      // An omitted or null field keeps its existing value. `??` rather than
      // `||` so that `completed: false` is applied instead of falling back.
      return saveTodo(
        existing.id,
        args.title ?? existing.title,
        args.completed ?? existing.completed,
      );
    },

    deleteTodo: (_parent: unknown, { id }: { id: string }): boolean =>
      deleteTodo(Number(id)),
  },
};
