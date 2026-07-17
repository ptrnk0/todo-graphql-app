/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\nfragment Essentials on Todo {\n    id\n    title\n    completed\n}\n": typeof types.EssentialsFragmentDoc,
    "\nmutation createTodo($title:String!) {\n    createTodo(title:$title) {\n        ...Essentials\n    }\n}\n": typeof types.CreateTodoDocument,
    "\nmutation updateTodo($id:ID!, $title:String, $completed:Boolean) {\n    updateTodo(id:$id, title:$title, completed:$completed) {\n        ...Essentials\n    }\n}\n": typeof types.UpdateTodoDocument,
    "\nquery getTodos {\n    todos {\n        ...Essentials\n    }\n}\n": typeof types.GetTodosDocument,
};
const documents: Documents = {
    "\nfragment Essentials on Todo {\n    id\n    title\n    completed\n}\n": types.EssentialsFragmentDoc,
    "\nmutation createTodo($title:String!) {\n    createTodo(title:$title) {\n        ...Essentials\n    }\n}\n": types.CreateTodoDocument,
    "\nmutation updateTodo($id:ID!, $title:String, $completed:Boolean) {\n    updateTodo(id:$id, title:$title, completed:$completed) {\n        ...Essentials\n    }\n}\n": types.UpdateTodoDocument,
    "\nquery getTodos {\n    todos {\n        ...Essentials\n    }\n}\n": types.GetTodosDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nfragment Essentials on Todo {\n    id\n    title\n    completed\n}\n"): (typeof documents)["\nfragment Essentials on Todo {\n    id\n    title\n    completed\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation createTodo($title:String!) {\n    createTodo(title:$title) {\n        ...Essentials\n    }\n}\n"): (typeof documents)["\nmutation createTodo($title:String!) {\n    createTodo(title:$title) {\n        ...Essentials\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation updateTodo($id:ID!, $title:String, $completed:Boolean) {\n    updateTodo(id:$id, title:$title, completed:$completed) {\n        ...Essentials\n    }\n}\n"): (typeof documents)["\nmutation updateTodo($id:ID!, $title:String, $completed:Boolean) {\n    updateTodo(id:$id, title:$title, completed:$completed) {\n        ...Essentials\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getTodos {\n    todos {\n        ...Essentials\n    }\n}\n"): (typeof documents)["\nquery getTodos {\n    todos {\n        ...Essentials\n    }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;