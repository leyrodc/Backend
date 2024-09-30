import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    nombre: string;
    apellidos: string;
    correo: string;
    role: string;
    contrasena: string;
    status: string;
}

const userSchema = new Schema<IUser>({
    nombre: { type: String, required: true },  
    apellidos: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    contrasena: { type: String, required: true },
    status: { type: String, enum: ['active', 'blocked'], default: 'active' }
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('contrasena')) return next();

    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);  
    next();
});

export default model<IUser>('User', userSchema);
