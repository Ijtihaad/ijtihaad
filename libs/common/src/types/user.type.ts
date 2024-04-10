import { Prisma, Role } from '@prisma/client';

export type UserCreateInput = Prisma.UserCreateInput;

export type UserUpdateInput = Prisma.UserUpdateInput;

export type PasswordUpdateInput = Prisma.PasswordUpdateInput;

export type UserWhereUniqueInput = Prisma.UserWhereUniqueInput;

export type UserWhereInput = Prisma.UserWhereInput;

export type AddressCreateInput = Prisma.AddressCreateInput;

export type AddressUpdateInput = Prisma.AddressUpdateInput;

export type AddressWhereInput = Prisma.AddressWhereInput;

export type AddressWhereUniqueInput = Prisma.AddressWhereUniqueInput;

export type CreateUser = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  role?: Role;
  address?: CreateAddress;
};

export type UpdateUser = {
  blocked?: boolean;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  image?: string;
  role?: Role;
};

export type SetPassword = {
  password: string;
};

export type CreateAddress = {
  state: string;
  city: string;
  subcity: string;
  location?: string;
};

export type UpdateAddress = {
  state?: string;
  city?: string;
  subcity?: string;
  location?: string;
};

export type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};