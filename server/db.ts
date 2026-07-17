import { DatabaseSync } from 'node:sqlite';
import { join } from 'node:path';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Resolve relative to this file so the db lands in server/ no matter the cwd.
const db = new DatabaseSync(join(import.meta.dirname, 'todos.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
  )
`);

// SQLite has no boolean type: it stores 0/1. Convert at this boundary so the
// rest of the server only ever deals in real booleans.
function toTodo(row: Record<string, unknown>): Todo {
  return {
    id: Number(row.id),
    title: String(row.title),
    completed: Boolean(row.completed),
  };
}

function seed() {
  const { count } = db.prepare('SELECT COUNT(*) AS count FROM todos').get() as {
    count: number;
  };
  if (count > 0) {
    return;
  }

  const insert = db.prepare('INSERT INTO todos (title, completed) VALUES (?, ?)');
  insert.run('Learn GraphQL schemas', 1);
  insert.run('Wire Apollo Client to the local server', 0);
  insert.run('Write a mutation by hand', 0);
}

seed();

export function getTodos(): Todo[] {
  const rows = db
    .prepare('SELECT id, title, completed FROM todos ORDER BY id')
    .all() as Record<string, unknown>[];
  return rows.map(toTodo);
}

export function getTodo(id: number): Todo | null {
  const row = db
    .prepare('SELECT id, title, completed FROM todos WHERE id = ?')
    .get(id) as Record<string, unknown> | undefined;
  return row ? toTodo(row) : null;
}

export function insertTodo(title: string): Todo {
  const { lastInsertRowid } = db
    .prepare('INSERT INTO todos (title, completed) VALUES (?, 0)')
    .run(title);
  return getTodo(Number(lastInsertRowid))!;
}

export function saveTodo(id: number, title: string, completed: boolean): Todo {
  db.prepare('UPDATE todos SET title = ?, completed = ? WHERE id = ?').run(
    title,
    completed ? 1 : 0,
    id,
  );
  return getTodo(id)!;
}

export function deleteTodo(id: number): boolean {
  const { changes } = db.prepare('DELETE FROM todos WHERE id = ?').run(id);
  return Number(changes) > 0;
}
