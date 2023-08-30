
import { Resolvers, TicketStatusCode, ResourceNotification, ResourceNotificationDbObject } from "allotr-graphql-schema-types";
import { NOTIFICATIONS } from "../consts/collections";
import { GraphQLContext } from "../types/yoga-context";
import { getTargetUserId } from "../guards/guards";


export const NotificationResolvers: Resolvers = {
    Query: {
        myNotificationData: async (parent, args, context: GraphQLContext) => {
            const { userId: targetUserId } = args;
            const userId = getTargetUserId(context.user, targetUserId);
            const db = await (await context.mongoDBConnection).db;

            const userNotifications = await db.collection<ResourceNotificationDbObject>(NOTIFICATIONS).find({
                "user._id": userId
            }).sort({
                timestamp: -1
            }).toArray();

            return userNotifications.map<ResourceNotification>(({ ticketStatus, user, _id, descriptionRef, resource, timestamp, titleRef }) => ({
                ticketStatus: ticketStatus as TicketStatusCode,
                user: { username: user.username, id: user._id as any },
                descriptionRef,
                id: _id?.toHexString(),
                resource: {
                    id: resource?._id as any, name: resource?.name ?? "", createdBy: {
                        username: resource?.createdBy?.username ?? "",
                        id: resource?.createdBy?._id as any
                    }
                },
                timestamp,
                titleRef
            }));
        }
    }
}