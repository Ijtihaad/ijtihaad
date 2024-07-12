import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Account, Answer, Asset, AssetType, Bookmark, Reaction, Tahqiq, Vote } from '@repo/common';
import { ClientSession, type Connection, Types } from 'mongoose';
import { ACCOUNT_MODEL_NAME, AccountDoc } from './account.schema';
import { ANSWER_MODEL_NAME } from './answer.schema';

export const TAHQIQ_MODEL_NAME = 'tahqiq'

@Schema({ versionKey: false })
export class TahqiqDoc implements Omit<Tahqiq, '_id'> {

    @Prop()
    question: string;

    @Prop(raw({
        assetUrl: String,
        originalName: String,
        assetType: {
            type: String,
            enum: Object.values(AssetType)
        },
    }))
    asset: {
        assetUrl: string;
        originalName: string;
        assetType: AssetType.audio;
    }

    @Prop({
        type: Types.ObjectId,
        ref: AccountDoc
    })
    user: Account

    @Prop(raw([{
        type: Types.ObjectId,
        ref: ANSWER_MODEL_NAME
    }]))
    answers: Answer[]


    @Prop(raw([{
        type: String,
        user: {
            type: Types.ObjectId,
            ref: ACCOUNT_MODEL_NAME
        },
    }]))
    votes: Vote[]


    @Prop(raw([{
        type: String,
        user: {
            type: Types.ObjectId,
            ref: ACCOUNT_MODEL_NAME
        },
    }]))
    bookmarks: Bookmark[]

    @Prop(raw([{
        type: String,
        user: {
            type: Types.ObjectId,
            ref: ACCOUNT_MODEL_NAME
        },
    }]))
    reactions: Reaction[]

    @Prop({ type: Date, default: Date.now })
    createdAt?: Date;

    @Prop({ type: Date, default: Date.now, immutable: true })
    updatedAt?: Date;
}


@Injectable()
export class TahqiqRepository {
    constructor(
        @InjectModel(TAHQIQ_MODEL_NAME) private connection: Connection
    ) { }

    async startTransaction(): Promise<ClientSession> {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }
}

export const TahqiqSchema = SchemaFactory.createForClass(TahqiqDoc);
