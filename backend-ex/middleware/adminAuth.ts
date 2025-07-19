import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.token as string | undefined;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized, Login Again" });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET as string);

    // This comparison should depend on how you encoded the token during sign
    if (typeof token_decode !== 'object' || token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized, Login Again" });
    }
    next();
  } catch (error: any) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export default adminAuth;