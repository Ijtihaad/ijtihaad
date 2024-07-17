import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Account, Answer, Comment, Vote } from '@repo/common';
import { ClientSession, Connection, Types } from 'mongoose';
import { ACCOUNT_MODEL_NAME } from './account.schema';
import { COMMENT_MODEL_NAME } from './comment.schema';

export const ANSWER_MODEL_NAME = "answer"
@Schema({ versionKey: false })
export class AnswerModel implements Omit<Answer, '_id'> {

    @Prop({ type: String })
    body: Answer['body']

    @Prop(raw([{
        type: Types.ObjectId,
        ref: COMMENT_MODEL_NAME
    }]))
    comments: Answer['comments'];

    @Prop({ type: Types.ObjectId, ref: ACCOUNT_MODEL_NAME })
    author: Answer["author"]

    @Prop({ type: Types.ObjectId, ref: ACCOUNT_MODEL_NAME })
    account: Answer['account']

    @Prop(raw([{
        upVote: Boolean,
        user: {
            type: Types.ObjectId,
            ref: ACCOUNT_MODEL_NAME
        },
    }]))
    votes: Answer['votes']

    @Prop({ type: Date, default: Date.now })
    createdAt?: Date;

    @Prop({ type: Date, default: Date.now, immutable: true })
    updatedAt?: Date;
}

@Injectable()
export class AnswerRepository {
    constructor(
        @InjectModel(ANSWER_MODEL_NAME) private connection: Connection
    ) { }

    async startTransaction(): Promise<ClientSession> {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }
}

export const AnswerSchema = SchemaFactory.createForClass(AnswerModel);
