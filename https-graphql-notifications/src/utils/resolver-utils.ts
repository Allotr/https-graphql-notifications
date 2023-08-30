import { UserDbObject } from "allotr-graphql-schema-types";
import { ObjectId, ClientSession, Db } from "mongodb"
import { USERS } from "../consts/collections";

async function getUser(userId: ObjectId | null | undefined, db: Db, session?: ClientSession): Promise<UserDbObject | null | undefined> {
    const userTikcet = await db.collection<UserDbObject>(USERS).findOne({
        _id: userId,
    }, { session })

    return userTikcet;
}


export { getUser }