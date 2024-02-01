// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userRepository = getRepository(User);
    const newUser = userRepository.create({
      username,
      password: hashedPassword,
    });

    await userRepository.save(newUser);

    const token = jwt.sign(
      { userId: newUser.id, isAdmin: newUser.isAdmin },
      JWT_SECRET
    );

    res.status(201).json({
      status: true,
      message: "Signup successful",
      data: { user: newUser, token },
    });
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.message, data: null });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { username } });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      JWT_SECRET
    );

    res.json({
      status: true,
      message: "Login successful",
      data: { user, token },
    });
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.message, data: null });
  }
};
