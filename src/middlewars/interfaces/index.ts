import { User } from "@prisma/client";

export interface RequestUser {
    id:number
}

  export interface AuthRequest  extends Request{
    cookies: { [key: string]: string };
    user: RequestUser
  }