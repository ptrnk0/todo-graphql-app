import { gql } from '../../__generated__';

export const CREATE_TODO = gql(`
mutation createTodo($title:String!) {
    createTodo(title:$title) {
        ...Essentials
    }
}
`);

export const UPDATE_TODO = gql(`
mutation updateTodo($id:ID!, $title:String, $completed:Boolean) {
    updateTodo(id:$id, title:$title, completed:$completed) {
        ...Essentials
    }
}
`);
