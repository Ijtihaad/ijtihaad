import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Account, AccountType, Asset, AssetType } from '@repo/common';
import { ClientSession, Connection, Types } from 'mongoose';

export const ACCOUNT_MODEL_NAME = "account"
@Schema({ versionKey: false })
export class AccountDoc implements Omit<Account, '_id'> {
    @Prop(String)
    accountId: string;

    @Prop(String)
    uniqueName: string;

    @Prop(String)
    displayName: string;

    @Prop(raw({
        type: String,
        enum: Object.values(AccountType)
    }))
    accountType: AccountType;

    @Prop(raw({
        assetUrl: String,
        originalName: String,
        assetType: {
            type: String,
            default: AssetType.image
        },
    }))
    picture: Asset;
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

export const AccountSchema = SchemaFactory.createForClass(AccountDoc);
