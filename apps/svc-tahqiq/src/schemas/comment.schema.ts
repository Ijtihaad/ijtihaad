import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Account, Comment, Vote } from '@repo/common';
import { ClientSession, Connection, Types } from 'mongoose';
import { ACCOUNT_MODEL_NAME } from './account.schema';

export const COMMENT_MODEL_NAME = "comment"
@Schema({ versionKey: false })
export class CommentDoc implements Omit<Comment, '_id'> {

    @Prop({ type: String })
    body: string

    @Prop({ type: Types.ObjectId, ref: ACCOUNT_MODEL_NAME })
    user: Account

    @Prop(raw([{
        upVote: Boolean,
        user: {
            type: Types.ObjectId,
            ref: ACCOUNT_MODEL_NAME
        },
    }]))
    votes: Vote[]

    @Prop([{ type: Types.ObjectId, ref: COMMENT_MODEL_NAME }])
    comments: Comment[];

    @Prop({ type: Date, default: Date.now })
    createdAt?: Date;

    @Prop({ type: Date, default: Date.now, immutable: true })
    updatedAt?: Date;
}

@Injectable()
export class CommentRepository {
    constructor(
        @InjectModel(COMMENT_MODEL_NAME) private connection: Connection
    ) { }

    async startTransaction(): Promise<ClientSession> {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }
}

export const CommentSchema = SchemaFactory.createForClass(CommentDoc);
