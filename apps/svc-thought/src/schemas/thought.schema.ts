import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { AssetType, Thought } from '@repo/common';
import { ClientSession, type Connection, Types } from 'mongoose';
import { ACCOUNT_MODEL_NAME } from './account.schema';
import { COMMENT_MODEL_NAME } from './comment.schema';


export const THOUGHT_MODEL_NAME = "thought"
@Schema({ versionKey: false })
export class ThoughtModel implements Omit<Thought, '_id'> {

    @Prop({ type: String })
    content: Thought['content']

    @Prop(raw({
        assetUrl: String,
        originalName: String,
        assetType: {
            type: String,
            enum: Object.values(AssetType)
        },
    }))
    asset: Thought['asset']

    @Prop({ type: Types.ObjectId, ref: ACCOUNT_MODEL_NAME })
    author: Thought['author']

    @Prop({ type: Types.ObjectId, ref: ACCOUNT_MODEL_NAME })
    account: Thought['account']

    @Prop([{ type: Types.ObjectId, ref: COMMENT_MODEL_NAME }])
    comments: Thought['comments']

    @Prop(raw([{
        type: String,
        user: {
            type: Types.ObjectId,
            ref: ACCOUNT_MODEL_NAME
        },
    }]))
    reactions: Thought['reactions']

    @Prop(raw([{
        user: {
            type: Types.ObjectId,
            ref: ACCOUNT_MODEL_NAME
        },
    }]))
    bookmarks: Thought['bookmarks']

    @Prop({ type: Date, default: Date.now })
    createdAt?: Date;

    @Prop({ type: Date, default: Date.now, immutable: true })
    updatedAt?: Date;
}


@Injectable()
export class ThoughtRepository {
    constructor(
        @InjectModel(THOUGHT_MODEL_NAME) private connection: Connection
    ) { }

    async startTransaction(): Promise<ClientSession> {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }
}

export const ThoughtSchema = SchemaFactory.createForClass(ThoughtModel);
