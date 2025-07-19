import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  userId: number;
}

export const authUser = async (req: Request, res: Response, next: NextFunction) => {

    const tokenHeader = req.headers.token;
    console.log(tokenHeader)

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
        (req as any).userId = decoded.id;

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Invalid token, Login Again' });
    }

}

export const authUser1 = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === 'string') {
      return res.status(401).json({ success: false, message: 'Invalid token payload' });
    }

    (req as any).userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: 'Invalid token, Login Again' });
  }
};


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};