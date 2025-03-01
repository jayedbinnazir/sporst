// src/modules/auth/services/AuthService.ts
// src/modules/auth/repositories/AuthRepository.ts
import { PrismaClient, User } from "@prisma/client";
import { RegisterDTO } from "../interfaces/RegisterDTO";
import bcrypt from "bcrypt"
import createHttpError from "http-errors";

const prisma = new PrismaClient();

export class AuthService {

  async createUser({
    name,
    phone,
    email,
    password,
  }: RegisterDTO): Promise<User> {

     // Hash the password
     const hashedPassword = await bcrypt.hash(password, 10);

     // Check if the user already exists
     const existingUser = await prisma.user.findUnique({
      where:{
        email
      }
     })

     if (existingUser) {
        const err = createHttpError(400, "User already exists");
        throw err;
     }

     try {
      return prisma.user.create({ data: { name, phone, email, password:hashedPassword } });

     } catch(err){
      const error = createHttpError(500, `Failed to save the user in the database: ${err}`);
         throw error;
     }

  }

  async updateUser(id: number): Promise<User | null> {
    // Find the user by ID
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    // Update the user with all fields (you can modify this to update only specific fields)
    return prisma.user.update({
      where: { id },
      data: {
        ...user, // Spread the existing user data
        updatedAt: new Date(), // Ensure the updatedAt timestamp is refreshed
      },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }
  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async deleteUser(id: number): Promise<User | null> {
    return prisma.user.delete({ where: { id } });
  }
}

// Add other methods like findUserByEmail, etc.
