import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { AssetType, Gender, UserRole, User as UserType } from '@repo/common';
import { ClientSession, type Connection } from 'mongoose';

export const USER_MODEL_NAME = "user"
@Schema({ versionKey: false })
export class UserDoc implements Omit<UserType, "_id"> {
  @Prop()
  firstName: string;

  @Prop(String)
  lastName: string;

  @Prop(String)
  email: string;

  @Prop({ type: String, enum: Object.values(Gender) })
  gender: Gender;


  @Prop({ type: Boolean, default: false })
  emailVerified: boolean;

  @Prop({ type: String, default: null })
  username: string | null;

  @Prop({ type: Number, min: 7, max: 100 })
  age: number;

  @Prop({ type: String, required: false, select: false })
  password?: string;

  @Prop({ type: Boolean, default: false })
  blocked: boolean;

  @Prop(raw({
    assetUrl: String,
    originalName: String,
    assetType: {
      type: String,
      default: AssetType.image
    },
  }))
  picture: {
    assetUrl: string;
    originalName: string,
    assetType: AssetType.image
  };

  @Prop({ type: String, enum: Object.values(UserRole), default: UserRole.user })
  role: UserRole;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now, immutable: true })
  updatedAt?: Date;
}

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(USER_MODEL_NAME) private connection: Connection
  ) { }

  async startTransaction(): Promise<ClientSession> {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}

export const UserSchema = SchemaFactory.createForClass(UserDoc);
