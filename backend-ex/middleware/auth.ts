import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

const authUser = async (req: Request, res: Response, next: NextFunction) => {

    const tokenHeader = req.headers.token;

    if (!tokenHeader) {
        return res.json({ success: false, message: 'Not Authorized, Login Again' })
    }
    const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (typeof decoded === 'string') {
            // This should never happen if you sign with an object payload
            return res.status(401).json({ success: false, message: 'Invalid token payload' });
        }

        // Now decoded is JwtPayload
        req.body.userId = decoded.id;

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Invalid token, Login Again' });
    }

}

export default authUser