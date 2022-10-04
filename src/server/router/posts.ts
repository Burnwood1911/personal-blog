import { createRouter } from "./context";
import { z } from "zod";
import * as trpc from "@trpc/server";

export const postsRouter = createRouter()
  .query("getPosts", {
    async resolve({ ctx }) {
      try {
        const posts = await ctx.prisma.post.findMany();
        return posts;
      } catch {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Some error occured",
        });
      }
    },
  })
  .query("getPost", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      try {
        const post = await ctx.prisma.post.findUnique({
          where: { id: input.id },
          include: {
            author: true,
          },
        });

        if (!post) {
          throw new trpc.TRPCError({
            code: "NOT_FOUND",
            message: "Post not found",
          });
        }

        return {
          title: post.title,
          id: post.id,
          image: post.image,
          body: post.body,
          created_at: post.created_at,
          authorImage: post.author.image,
        };
      } catch {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Some error occured",
        });
      }
    },
  })
  .mutation("addPost", {
    input: z.object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
      body: z.string(),
      authorId: z.string(),
    }),
    async resolve({ input, ctx }) {
      try {
        const isAuthorized = ctx.session;
        if (!isAuthorized) {
          throw new trpc.TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not authorized",
          });
        }

        const post = await ctx.prisma.post.create({
          data: {
            ...input,
          },
        });

        if (!post) {
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create Post",
          });
        }

        return post;
      } catch (e) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: e as string,
        });
      }
    },
  })
  .mutation("deletePost", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      try {
        await ctx.prisma.post.delete({
          where: { id: input.id },
        });
        return { success: true, message: "Post deleted" };
      } catch {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Some error occured",
        });
      }
    },
  })
  .mutation("updatePost", {
    input: z.object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      try {
        await ctx.prisma.post.update({
          where: { id: input.id },
          data: input,
        });
        return { success: true, message: "Post Updated" };
      } catch {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Some error occured",
        });
      }
    },
  });
