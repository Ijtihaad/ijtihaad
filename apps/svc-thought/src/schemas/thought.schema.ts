import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Account, Asset, AssetType, Bookmark, Comment, Reaction, Thought, Vote } from '@repo/common';
import { ClientSession, type Connection, Types } from 'mongoose';
import { ACCOUNT_MODEL_NAME } from './account.schema';
import { COMMENT_MODEL_NAME } from './comment.schema';


export const THOUGHT_MODEL_NAME = "thought"
@Schema({ versionKey: false })
export class ThoughtDoc implements Omit<Thought, '_id'> {

    @Prop({ type: String })
    content: string

    @Prop(raw({
        assetUrl: String,
        originalName: String,
        assetType: {
            type: String,
            enum: Object.values(AssetType)
        },
    }))
    asset: Asset

    @Prop({ type: Types.ObjectId, ref: ACCOUNT_MODEL_NAME })
    author: Account

    @Prop({ type: Types.ObjectId, ref: ACCOUNT_MODEL_NAME })
    account: Account

    @Prop([{ type: Types.ObjectId, ref: COMMENT_MODEL_NAME }])
    comments: Comment[]

    @Prop(raw([{
        type: String,
        user: {
            type: Types.ObjectId,
            ref: ACCOUNT_MODEL_NAME
        },
    }]))
    reactions: Reaction[]

    @Prop(raw([{
        upVote: Boolean,
        user: {
            type: Types.ObjectId,
            ref: ACCOUNT_MODEL_NAME
        },
    }]))
    votes: Vote[]

    @Prop(raw([{
        user: {
            type: Types.ObjectId,
            ref: ACCOUNT_MODEL_NAME
        },
    }]))
    bookmarks: Bookmark[]

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

export const ThoughtSchema = SchemaFactory.createForClass(ThoughtDoc);
