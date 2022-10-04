// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "../db/client";
import { unstable_getServerSession } from "next-auth"; // 👈 added this
import { nextAuthOptions } from "../../common/auth";

export const createContext = async (ctx: trpcNext.CreateNextContextOptions) => {
  const { req, res } = ctx;
  const session = await unstable_getServerSession(req, res, nextAuthOptions); // 👈 added this

  return {
    req,
    res,
    session,
    prisma,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
