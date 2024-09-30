import {Request , Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: string;
    role: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) : void => {
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).json({msg: 'Access Denied'});
        return;
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
        req.user = decoded;
        next();

    } catch (error) {
        res.status(400).json({msg: 'Invalid Token'});
    }
}