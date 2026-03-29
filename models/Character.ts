

import mongoose, { Schema, model, models } from 'mongoose';

const characterSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  sexo: { type: String, required: true },
  edad: { type: Number, required: true },
  altura: { type: Number, required: true },
  peso: { type: Number, required: true },
  fotoUrl: { type: String, required: true },
}, {
  timestamps: true,
});

const Character = models.Character || model('Character', characterSchema, 'OC');

export default Character;
