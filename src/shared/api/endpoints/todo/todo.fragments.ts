import { gql } from '../../__generated__';

export const ESSENTIALS_FRAGMENT = gql(`
fragment Essentials on Todo {
    id
    title
    completed
}
`);
