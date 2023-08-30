import { GlobalRole, UserDbObject } from "allotr-graphql-schema-types";
import { ObjectId } from "mongodb";
import { GraphQLError } from "graphql";


function hasGlobalAdminAccess(sessionUser: UserDbObject): boolean {
    return sessionUser.globalRole === GlobalRole.Admin;
}

function getTargetUserId(sessionUser: UserDbObject, targetUserId?: string | null): ObjectId {
    const isAdmin = hasGlobalAdminAccess(sessionUser);

    // USER role
    if (!isAdmin) {
        // Session is authenticated before this, so the session user is never null
        return sessionUser?._id!;
    }

    // ADMIN role but targetUserId is null
    if (targetUserId == null) {
        throw new GraphQLError("ADMIN users need to provide a userId as parameter. This request will be done on behalf of that user");
    }

    // ADMIN role with targetUserId
    return new ObjectId(targetUserId);
}



export { getTargetUserId }