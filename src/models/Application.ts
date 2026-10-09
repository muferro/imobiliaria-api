import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  housingLocationId?: mongoose.Types.ObjectId;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    firstName: {
      type: String,
      required: [true, 'Primeiro nome é obrigatório'],
      trim: true,
      minlength: [2, 'Primeiro nome deve ter no mínimo 2 caracteres'],
    },
    lastName: {
      type: String,
      required: [true, 'Último nome é obrigatório'],
      trim: true,
      minlength: [2, 'Último nome deve ter no mínimo 2 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
    },
    phone: {
      type: String,
      trim: true,
    },
    housingLocationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HousingLocation',
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, 'Mensagem deve ter no máximo 500 caracteres'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Índice para melhorar buscas por email
applicationSchema.index({ email: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ createdAt: -1 });

export const Application = mongoose.model<IApplication>(
  'Application',
  applicationSchema
);
