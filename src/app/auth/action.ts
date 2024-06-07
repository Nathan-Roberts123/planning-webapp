"use server";
import { TSignupFormState, ZSignupFormState } from "@/lib/types";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { FieldErrors } from "react-hook-form";

type TState = {
  success: boolean | null;
  errors: FieldErrors<TSignupFormState> | null;
};

export const createUser = async (
  state: TState,
  data: FormData
): Promise<TState> => {
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const confirm_password = data.get("confirm_password");

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  const res = ZSignupFormState.safeParse({ email, password, confirm_password });

  if (res.error) {
    const zodErrors = res.error.flatten().fieldErrors;

    const errors: FieldErrors<TSignupFormState> = {};

    if (zodErrors.confirm_password) {
      errors["confirm_password"] = {
        type: "validate",
        message: zodErrors.confirm_password
          ? zodErrors.confirm_password[0]
          : undefined,
      };
    }

    if (zodErrors.password) {
      errors["password"] = {
        type: "validate",
        message: zodErrors.password ? zodErrors.password[0] : undefined,
      };
    }

    if (zodErrors.email) {
      errors["email"] = {
        type: "validate",
        message: zodErrors.email ? zodErrors.email[0] : undefined,
      };
    }

    return { success: false, errors: errors };
  }

  if (res.success) {
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hash,
        },
      });

      const account = await prisma.account.create({
        data: {
          userId: user.id,
          type: "email",
          provider: "Credentials",
          providerAccountId: uuidv4(),
        },
      });
      return { success: true, errors: null };
    } catch (e) {
      return { success: false, errors: null };
    }
  }

  return { success: null, errors: null };
};
