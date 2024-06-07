import { z } from "zod";

export const ZSignupFormState = z
  .object({
    email: z.string().trim().min(1).email(),
    password: z.string().min(4),
    confirm_password: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.confirm_password === data.password;
    },
    { path: ["confirm_password"], message: "Passwords Must Match" }
  );
export type TSignupFormState = z.infer<typeof ZSignupFormState>;

// export const ZSigninFormState = ZSignupFormState.omit({
//   confirm_password: true,
// });
// export type TSigninFormState = z.infer<typeof ZSigninFormState>;

export type TBoard = {
  id: string;
  name: string;
};

export type TWorkspace = { board: { name: string } };
