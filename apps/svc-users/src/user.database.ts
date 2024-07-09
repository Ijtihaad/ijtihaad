import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole, User as UserType } from '@repo/common';
import { ClientSession, type Connection, type Model, SchemaTypes, Types } from 'mongoose';

@Schema({ versionKey: false })
export class User implements UserType {

  _id: Types.ObjectId;

  @Prop()
  firstName: string;

  @Prop(String)
  lastName: string;

  @Prop(String)
  email: string;

  @Prop({ type: String, required: false, select: false })
  password?: string;

  @Prop({ type: Boolean, default: false })
  blocked: boolean;

  @Prop({ type: Boolean, default: false })
  emailVerified: boolean;

  @Prop({ type: String, default: null })
  username: string | null;

  @Prop({ type: String, default: null })
  picture: string | null;

  @Prop({ type: String, enum: ["ADMIN", "BASIC"], default: "BASIC" })
  role: UserRole;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now, immutable: true })
  updatedAt?: Date;
}

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private connection: Connection
  ) { }

  async startTransaction(): Promise<ClientSession> {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
