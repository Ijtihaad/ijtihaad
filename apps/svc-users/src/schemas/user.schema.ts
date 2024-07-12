import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { AssetType, Gender, UserRole, User as UserType } from '@repo/common';
import { ClientSession, type Connection } from 'mongoose';

export const USER_MODEL_NAME = "user"
@Schema({ versionKey: false })
export class UserDoc implements Omit<UserType, "_id"> {
  // ==========basicEligibility=============

  @Prop(String)
  firstName: string;

  @Prop(String)
  lastName: string;

  @Prop({ type: String })
  username: string;

  @Prop(String)
  email: string;

  @Prop({ type: Boolean, default: false })
  emailVerified: boolean;

  @Prop({ type: String, required: false, select: false })
  password: string | null;

  @Prop({ type: String, enum: Object.values(Gender) })
  gender: Gender;

  @Prop({ type: Number, min: 7, max: 100 })
  age: number;

  // =========standardEligibility============
  @Prop({ type: String, required: false })
  phone: string | null;

  @Prop({ type: String, required: false })
  phoneVerified: boolean;

  @Prop(raw({ country: String, state: String, street: String, }))
  address: { country: string; state: string; street: string; } | null;

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

  // =========intermediateEligibility============
  @Prop(raw({
    assetUrl: String,
    originalName: String,
    assetType: {
      type: String,
      default: AssetType.image
    },
  }))
  frontIdCard: { assetUrl: string; originalName: string; assetType: AssetType.image; } | null;

  @Prop(raw({
    assetUrl: String,
    originalName: String,
    assetType: {
      type: String,
      default: AssetType.image
    },
  }))
  backIdCard: { assetUrl: string; originalName: string; assetType: AssetType.image; } | null;

  @Prop(raw({
    assetUrl: String,
    originalName: String,
    assetType: {
      type: String,
      default: AssetType.image
    },
  }))
  frontPassport: { assetUrl: string; originalName: string; assetType: AssetType.image; } | null;

  @Prop(raw({
    assetUrl: String,
    originalName: String,
    assetType: {
      type: String,
      default: AssetType.image
    },
  }))
  backPassport: { assetUrl: string; originalName: string; assetType: AssetType.image; } | null;

  @Prop(raw({
    assetUrl: String,
    originalName: String,
    assetType: {
      type: String,
      default: AssetType.image
    },
  }))
  frontDriverLicence: { assetUrl: string; originalName: string; assetType: AssetType.image; } | null;

  @Prop(raw({
    assetUrl: String,
    originalName: String,
    assetType: {
      type: String,
      default: AssetType.image
    },
  }))
  backDriverLicence: { assetUrl: string; originalName: string; assetType: AssetType.image; } | null;

  @Prop(raw({
    assetUrl: String,
    originalName: String,
    assetType: {
      type: String,
      default: AssetType.video
    },
  }))
  faceVideo: { assetUrl: string; originalName: string; assetType: AssetType.video; } | null;

  // =============advancedEligibility===============


  // =============tahqiqEligibility===============


  // ==========Status================
  @Prop({ type: Boolean, default: false })
  basicEligibility: boolean;

  @Prop({ type: Boolean, default: false })
  standardEligibility: boolean;

  @Prop({ type: Boolean, default: false })
  intermediateEligibility: boolean;

  @Prop({ type: Boolean, default: false })
  advancedEligibility: boolean;

  @Prop({ type: Boolean, default: false })
  tahqiqEligibility: boolean;

  @Prop({ type: Boolean, default: false })
  blocked: boolean;


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
