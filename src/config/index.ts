import { GraphQLClient } from 'graphql-request'

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || ''

const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT)

export { graphQLClient }
