import { HttpLink } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { ESSENTIALS_FRAGMENT } from '../endpoints/todo/todo.fragments';
import { createFragmentRegistry } from '@apollo/client/cache';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(ESSENTIALS_FRAGMENT),
  }),
});
