import { Request, Response } from "express";
import User, {IUser} from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import dotenv from 'dotenv';    

dotenv.config();

export const register = async (req: Request, res: Response ): Promise <void> =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
         res.status(400).json({errors: errors.array()});
         return;
    }

    const {nombre, apellidos, correo, contrasena} = req.body;

    try {
        let user: IUser | null = await User.findOne({correo});

        if(user){
             res.status(400).json({msg: 'El usuario ya existe'});
             return;
        }

        user = new User({nombre, apellidos, correo, contrasena});
        await user.save();
        
        res.status(200).json({msg: 'Usuario registrado correctamente'});

        
    } catch (error) {
        console.log(error)};
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { correo, contrasena } = req.body;

    try {
        let user: IUser | null = await User.findOne({ correo });

        if (!user || user.status !== 'active') {
            res.status(400).json({ msg: 'El usuario no existe o está bloqueado' });
            return;
        }

        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            res.status(400).json({ msg: 'Contraseña incorrecta' });
            return;
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.jwtsecret as string, { expiresIn: '1h' });
        res.json({ token });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};