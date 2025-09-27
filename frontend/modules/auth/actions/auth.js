"use server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export async function signUpAction(formData) {
  const { email, name, password } = formData;

  const existingAcc = await prisma.user.findUnique({ where: { email } });

  if (existingAcc) {
    return { error: "User already Exists" };
  }

  const hashPass = await bcrypt.hash(password, 10);

  const userDets = {
    email,
    name,
    password: hashPass,
  };

  await prisma.user.create({
    data: userDets,
  });

  return { success: true };
}

export async function loginAction(formData) {
  const { email, password } = formData;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Invalid Credentials" };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    return { error: "Invalid Credentials" };
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "superaditya",
    { expiresIn: "7d" }
  );

  return { token };
}
