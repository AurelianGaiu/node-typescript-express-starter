import mongoose, { Schema, Document } from 'mongoose';
import Joi from '@hapi/joi';


const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, min: 6 },
  Date: { type: Date, default: Date.now },
});

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  date: Date;
}

export const RegisterValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6)
});

export const LoginValidationSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
})

export const User = mongoose.model<IUser>('User', UserSchema);
