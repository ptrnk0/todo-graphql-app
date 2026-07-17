import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import express from 'express';

import { resolvers } from './resolvers.ts';

const PORT = 4000;

const typeDefs = readFileSync(
  join(import.meta.dirname, 'schema.graphql'),
  'utf8',
);

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

const app = express();
app.use('/graphql', cors(), express.json(), expressMiddleware(server));

app.listen(PORT, () => {
  console.log(`GraphQL ready at http://localhost:${PORT}/graphql`);
});
