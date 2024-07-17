import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { AssetType, UserEligibility } from '@repo/common';
import { ClientSession, Connection } from 'mongoose';

export const USER_ELIGIBILITY_MODEL_NAME = "userEligibility"
@Schema({ versionKey: false })
export class UserEligibilityModel implements Omit<UserEligibility, '_id'> {
    @Prop(String)
    name: UserEligibility['name'];

    @Prop(String)
    description: UserEligibility['description'];

    @Prop(Boolean)
    activated: UserEligibility['activated'];

    @Prop(raw({
        name: String,
        description: String,
        activated: Boolean,
        permissions: raw({
            askTahqiq: Boolean,
            answerTahqiq: Boolean,
            postThought: Boolean,
            postReels: Boolean,
            postVideo: Boolean,
            createJama: Boolean,
            createChannel: Boolean,
        })
    }))
    permissions: UserEligibility['permissions'];
}


@Injectable()
export class UserEligibilityRepository {
    constructor(
        @InjectModel(USER_ELIGIBILITY_MODEL_NAME) private connection: Connection
    ) { }

    async startTransaction(): Promise<ClientSession> {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }
}

export const UserEligibilitySchema = SchemaFactory.createForClass(UserEligibilityModel);
