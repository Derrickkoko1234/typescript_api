// src/controllers/contact.controller.ts
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Contact } from "../entity/Contact";
import { User } from "../entity/User";

export const addContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, name, email, phone } = req.body;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const contactRepository = getRepository(Contact);
    const newContact = contactRepository.create({
      name,
      email,
      phone,
      user,
    });

    await contactRepository.save(newContact);

    res
      .status(201)
      .json({
        message: "Contact added successfully",
        contactId: newContact.id,
      });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
