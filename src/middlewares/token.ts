// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const getUserIdFromToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const userId = getUserIdFromToken(authorization);

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // Attach the userId to the request object for later use
  (req as any).user = userId;

  next();
};
