import mongoose, { Schema, Document } from 'mongoose';

export interface IHousingLocation extends Document {
  name: string;
  city: string;
  state: string;
  photo: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const housingLocationSchema = new Schema<IHousingLocation>(
  {
    name: {
      type: String,
      required: [true, 'Nome do imóvel é obrigatório'],
      trim: true,
      minlength: [3, 'Nome deve ter no mínimo 3 caracteres'],
      maxlength: [100, 'Nome deve ter no máximo 100 caracteres'],
    },
    city: {
      type: String,
      required: [true, 'Cidade é obrigatória'],
      trim: true,
      minlength: [2, 'Cidade deve ter no mínimo 2 caracteres'],
    },
    state: {
      type: String,
      required: [true, 'Estado é obrigatório'],
      trim: true,
      uppercase: true,
      match: /^[A-Z]{2}$/,
    },
    photo: {
      type: String,
      required: [true, 'URL da foto é obrigatória'],
      match: /^https?:\/\/.+/,
    },
    availableUnits: {
      type: Number,
      required: [true, 'Número de unidades disponíveis é obrigatório'],
      min: [0, 'Unidades não pode ser negativo'],
      default: 0,
    },
    wifi: {
      type: Boolean,
      default: false,
    },
    laundry: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const HousingLocation = mongoose.model<IHousingLocation>(
  'HousingLocation',
  housingLocationSchema
);
