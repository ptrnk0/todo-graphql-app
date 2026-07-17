import { gql } from '../../__generated__';

export const GET_TODOS = gql(`
query getTodos {
    todos {
        ...Essentials
    }
}
`);
