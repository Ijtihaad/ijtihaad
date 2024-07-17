import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Account, AccountType, Asset, AssetType } from '@repo/common';
import { ClientSession, Connection, Types } from 'mongoose';

export const ACCOUNT_MODEL_NAME = "account"
@Schema({ versionKey: false })
export class AccountModel implements Omit<Account, '_id'> {
    @Prop(String)
    accountId: Account["accountId"]

    @Prop(String)
    uniqueName: Account["uniqueName"]

    @Prop(String)
    displayName: Account["displayName"]

    @Prop(raw({
        type: String,
        enum: Object.values(AccountType)
    }))
    accountType: Account["accountType"];

    @Prop(raw({
        assetUrl: String,
        originalName: String,
        assetType: {
            type: String,
            default: AssetType.image
        },
    }))
    picture: Account["picture"];
}


@Injectable()
export class AccountRepository {
    constructor(
        @InjectModel(ACCOUNT_MODEL_NAME) private connection: Connection
    ) { }

    async startTransaction(): Promise<ClientSession> {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }
}

export const AccountSchema = SchemaFactory.createForClass(AccountModel);
