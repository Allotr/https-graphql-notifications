import 'graphql-import-node';
import * as notificationTypeDefs from "allotr-graphql-schema-types/src/schemas/resourceNotification.graphql"
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from '@graphql-tools/schema'
import { stitchingDirectives } from '@graphql-tools/stitching-directives'
import { mergeResolvers } from "@graphql-tools/merge";
import { NotificationResolvers } from './resolvers/NotificationResolvers';

const { allStitchingDirectivesTypeDefs, stitchingDirectivesValidator } = stitchingDirectives()

const typeDefs = /* GraphQL */ `
  ${allStitchingDirectivesTypeDefs}
  ${DIRECTIVES?.loc?.source?.body}
  ${notificationTypeDefs?.loc?.source?.body}
`
const resolvers = mergeResolvers([NotificationResolvers, {
    Query: {
        // 2. Setup a query that exposes the raw SDL...
        _sdlNotification: () => typeDefs,
    },
}]);

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// 3. Include the stitching directives validator...
export default stitchingDirectivesValidator(schema);
