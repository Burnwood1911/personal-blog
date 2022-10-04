import { createRouter } from "./context";
import { z } from "zod";
import bcrypt from "bcryptjs";
import * as trpc from "@trpc/server";

export const authRouter = createRouter().mutation("register", {
  input: z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    image: z.string(),
  }),
  async resolve({ input, ctx }) {
    const user = await ctx.prisma.user.findFirst({
      where: { email: input.email },
    });

    if (user) {
      throw new trpc.TRPCError({
        code: "CONFLICT",
        message: "User already exists",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(input.password, salt);

    ctx.prisma.user
      .create({
        data: {
          username: input.username,
          email: input.email,
          password: hash,
          image: input.image,
        },
      })
      .then(() => {
        return { success: true, message: "User succefully created" };
      })
      .catch(() => {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Some error occured",
        });
      });
  },
});
