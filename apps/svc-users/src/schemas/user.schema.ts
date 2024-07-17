import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { AssetType, Gender, User, UserEligibility, UserRole, UserRolePermission } from '@repo/common';
import { ClientSession, type Connection, Types } from 'mongoose';
import { USER_ELIGIBILITY_MODEL_NAME } from './eligibility.schema';
import { USER_ROLE_MODEL_NAME } from './role.schema';

export const USER_MODEL_NAME = "user"
@Schema({ versionKey: false })
export class UserModel implements Omit<User, "_id"> {
  // ==========basicEligibility=============

  @Prop(String)
  firstName: User["firstName"];

  @Prop(String)
  lastName: User["lastName"]

  @Prop({ type: String })
  username: User['username'];

  @Prop(String)
  email: User["email"]

  @Prop({
    type: Boolean,
    default: false
  })
  emailVerified: User["emailVerified"];

  @Prop({
    type: String,
    required: false,
    select: false
  })
  password: User["password"];

  @Prop({
    type: String,
    enum: Object.values(Gender)
  })
  gender: User["gender"];

  @Prop({
    type: Number,
    min: 7,
    max: 100
  })
  age: User["age"];

  // =========standardEligibility============
  @Prop({
    type: String,
    required: false
  })
  phone: User['phone'];

  @Prop({
    type: String,
    required: false
  })
  phoneVerified: User['phoneVerified'];

  @Prop(raw({
    country: String,
    state: String,
    street: String,
  }))
  address: User['address'];

  @Prop(raw({
    assetUrl: String,
    originalName: String,
    assetType: {
      type: String,
      default: AssetType.image
    },
  }))
  picture: User['picture'];

  // =========intermediateEligibility============
  @Prop(raw({
    assetUrl: String,
    originalName: String,
    assetType: {
      type: String,
      default: AssetType.image
    },
  }))
  frontIdCard: User['frontIdCard'];

  @Prop(raw({
    assetUrl: String,
    originalName: String,
    assetType: {
      type: String,
      default: AssetType.image
    },
  }))
  backIdCard: User['backIdCard'];

  @Prop(raw({
    assetUrl: String,
    originalName: String,
    assetType: {
      type: String,
      default: AssetType.image
    },
  }))
  frontPassport: User['frontPassport'];

  @Prop(raw({
    assetUrl: String,
    originalName: String,
    assetType: {
      type: String,
      default: AssetType.image
    },
  }))
  backPassport: User['backPassport'];

  @Prop(raw({
    assetUrl: String,
    originalName: String,
    assetType: {
      type: String,
      default: AssetType.video
    },
  }))
  faceVideo: User['faceVideo'];

  // =============advancedEligibility===============


  // =============tahqiqEligibility===============


  // ==========Status================
  @Prop({ type: Types.ObjectId, ref: USER_ROLE_MODEL_NAME })
  roles: User["roles"];

  @Prop({ type: Types.ObjectId, ref: USER_ELIGIBILITY_MODEL_NAME })
  eligibilities: User["eligibilities"];

  @Prop({
    type: Boolean,
    default: false
  })
  blocked: User["blocked"];

  @Prop({
    type: Date,
    default: Date.now
  })
  createdAt?: Date;

  @Prop({
    type: Date,
    default: Date.now,
    immutable: true
  })
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

export const UserSchema = SchemaFactory.createForClass(UserModel);
