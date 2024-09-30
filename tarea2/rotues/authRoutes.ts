import {Router} from 'express';
import {check} from 'express-validator';
import {register, login} from '../controllers/authController';

const router = Router();

router.post('/register',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('correo', 'Agrega un email válido').isEmail(),
    check('contrasena', 'La contraseña debe ser de al menos 6 caracteres').isLength({min: 6})
], register);

router.post('/login',[
    check('correo', 'Agrega un email válido').isEmail(),
    check('contrasena', 'La contraseña debe ser de al menos 6 caracteres').isLength({min: 6})
], login);

export default router;