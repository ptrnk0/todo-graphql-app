# TodoGraphQL

A React Native todo app backed by a local GraphQL server. The client is Apollo Client 4 with fully typed operations generated from the running server's schema; the server is Apollo Server 5 on Express 5, persisting to SQLite via Node's built-in `node:sqlite`.

## Architecture

```
server/         Apollo Server 5 + Express 5, SQLite (node:sqlite) — http://localhost:4000/graphql
src/            React Native app, organised by Feature-Sliced Design
  app/          App root: providers (Apollo, SafeArea) and the navigation stack
  pages/        Screens — todo-list, create-todo
  shared/api/   Apollo Client setup, GraphQL documents, and generated types
```

The app talks to the server over plain HTTP at `http://localhost:4000/graphql`. That URL is hardcoded in `src/shared/api/apollo-client/client.ts` and works as-is on the iOS Simulator; on an Android emulator or a physical device you'll need to point it at `http://10.0.2.2:4000/graphql` or your machine's LAN address respectively.

Imports use the `@/` alias for `src/`, wired up through `babel-plugin-module-resolver` in `babel.config.js` and mirrored in `tsconfig.json`.

## Requirements

- Node 24+ (the server relies on `node:sqlite` and on Node's native TypeScript stripping — it runs `.ts` files directly with no build step)
- Xcode / Android Studio per the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment)
- Ruby bundler for CocoaPods (iOS only)

## Getting started

### 1. Start the GraphQL server

```sh
cd server
npm install
npm run dev      # node --watch index.ts
```

It listens on `http://localhost:4000/graphql`. On first run it creates `server/todos.db` and seeds three todos. Open that URL in a browser for the Apollo Sandbox to poke at the schema by hand.

### 2. Generate the typed GraphQL client

```sh
npm install
npm run compile  # or: npm run watch
```

**The server must be running first.** `codegen.ts` points at `http://localhost:4000/graphql` and introspects the live server rather than reading `server/schema.graphql`, so codegen fails with a connection error if the server is down. Output lands in `src/shared/api/__generated__/` and is what makes the `gql()` tag return typed documents.

Re-run `npm run compile` whenever you change `server/schema.graphql` or add/edit a document under `src/**`.

### 3. Run the app

```sh
npm start        # Metro, in its own terminal

# iOS — first clone only:
bundle install && bundle exec pod install
npm run ios

# Android:
npm run android
```

## The GraphQL schema

Defined in `server/schema.graphql` and resolved in `server/resolvers.ts`:

```graphql
type Todo {
  id: ID!
  title: String!
  completed: Boolean!
}

type Query {
  todos: [Todo!]!
  todo(id: ID!): Todo
}

type Mutation {
  createTodo(title: String!): Todo!
  updateTodo(id: ID!, title: String, completed: Boolean): Todo
  deleteTodo(id: ID!): Boolean!
}
```

Client-side operations live in `src/shared/api/endpoints/todo/` — split into `todo.query.ts`, `todo.mutations.ts`, and `todo.fragments.ts`. The `Essentials` fragment is registered with the Apollo cache through `createFragmentRegistry`, which is why documents can spread `...Essentials` without importing it.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Metro dev server (`npm run start:clear` to reset the cache) |
| `npm run ios` / `npm run android` | Build and launch the app |
| `npm run compile` | Generate typed GraphQL documents (needs the server running) |
| `npm run watch` | Same, in watch mode |
| `npm run lint` | ESLint |
| `npm test` | Jest |

Server-side, from `server/`: `npm run dev` (watch mode) or `npm start`.

## Notes

- The React Compiler is enabled via `babel-plugin-react-compiler`, so memoisation is largely handled for you — reach for `useMemo`/`useCallback` only when you have a measured reason.
- `server/todos.db` is local state. Delete it to reset to the seed data.

## Troubleshooting

- **Codegen fails to connect** — the server isn't running. See step 1.
- **App shows a network error** — check the server is up, and that the URL in `client.ts` is reachable from your target (see Architecture above for the Android/device caveat).
- **Anything Metro or native build related** — [React Native troubleshooting](https://reactnative.dev/docs/troubleshooting).
