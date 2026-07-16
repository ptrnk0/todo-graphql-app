import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://graphqlplaceholder.vercel.app/graphql',
  documents: ['src/**/*.{ts,tsx,graphql}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
