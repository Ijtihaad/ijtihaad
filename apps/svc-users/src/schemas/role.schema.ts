import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Asset, AssetType, UserRole, UserRolePermission } from '@repo/common';
import { ClientSession, Connection, Types } from 'mongoose';

export const USER_ROLE_MODEL_NAME = "userRole"
@Schema({ versionKey: false })
export class UserRoleModel implements Omit<UserRole, '_id'> {
    @Prop(String)
    name: UserRole['name'];

    @Prop(String)
    description: UserRole['description'];

    @Prop(raw({
        name: String,
        description: String,
        permissions: raw({
            addRole: Boolean,
            verifyEligibility: Boolean,
        })
    }))
    permissions: UserRole['permissions'];
}


@Injectable()
export class UserRoleRepository {
    constructor(
        @InjectModel(USER_ROLE_MODEL_NAME) private connection: Connection
    ) { }

    async startTransaction(): Promise<ClientSession> {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRoleModel);
