import type { User, Prisma } from "@prisma/client";
import { p } from "../prismaClient";
import { createUserSchema } from "../auth/schemas/createUserSchema";

export type { User } from "@prisma/client";

export function findById(
  id: number,
  args: Omit<Prisma.UserFindFirstArgs, "where"> = {}
) {
  return p.user.findFirst({
    ...args,
    where: {
      id,
    },
  });
}

export function findByEmail(
  email: string,
  args: Omit<Prisma.UserFindUniqueArgs, "where"> = {}
) {
  return p.user.findUnique({
    ...args,
    where: {
      email,
    },
  });
}

export async function create(
  user: User,
  args: Omit<Prisma.UserCreateArgs, "data"> = {}
) {
  const userValidation = await createUserSchema.safeParseAsync(user);
  if (userValidation.success === true) {
    const user = await p.user.create({
      ...args,
      data: userValidation.data,
    });
    return { user };
  } else {
    return {
      errors: userValidation.error.errors,
    };
  }
}