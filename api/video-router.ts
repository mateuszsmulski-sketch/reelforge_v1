import { z } from "zod";
import { eq, and, desc } from "drizzle-orm";
import { createRouter, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { videos } from "@db/schema";

export const videoRouter = createRouter({
  create: authedQuery
    .input(
      z.object({
        title: z.string().min(1).max(255),
        prompt: z.string().min(1),
        description: z.string().optional(),
        duration: z.number().min(4).max(12).default(5),
        ratio: z.enum(["9:16", "16:9", "1:1", "3:4", "4:3"]).default("9:16"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const result = await db.insert(videos).values({
        userId: ctx.user.id,
        title: input.title,
        prompt: input.prompt,
        description: input.description ?? null,
        duration: input.duration,
        ratio: input.ratio,
        status: "processing",
      }).returning();

      return { id: result[0].id, success: true };
    }),

  list: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db
      .select()
      .from(videos)
      .where(eq(videos.userId, ctx.user.id))
      .orderBy(desc(videos.createdAt))
      .all();
  }),

  getById: authedQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      return db
        .select()
        .from(videos)
        .where(and(eq(videos.id, input.id), eq(videos.userId, ctx.user.id)))
        .get() ?? null;
    }),

  delete: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      db.delete(videos)
        .where(and(eq(videos.id, input.id), eq(videos.userId, ctx.user.id)))
        .run();

      return { success: true };
    }),

  updateStatus: authedQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "processing", "completed", "failed"]),
        videoUrl: z.string().optional(),
        thumbnailUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const updates: Record<string, unknown> = { status: input.status };
      if (input.videoUrl) updates.videoUrl = input.videoUrl;
      if (input.thumbnailUrl) updates.thumbnailUrl = input.thumbnailUrl;

      db.update(videos)
        .set(updates)
        .where(and(eq(videos.id, input.id), eq(videos.userId, ctx.user.id)))
        .run();

      return { success: true };
    }),

  simulateComplete: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const video = db
        .select()
        .from(videos)
        .where(and(eq(videos.id, input.id), eq(videos.userId, ctx.user.id)))
        .get();

      if (!video) {
        throw new Error("Video not found");
      }

      const demoVideos = [
        "/videos/demo1.mp4",
        "/videos/demo2.mp4",
        "/videos/demo3.mp4",
      ];
      const randomVideo = demoVideos[Math.floor(Math.random() * demoVideos.length)];

      db.update(videos)
        .set({ status: "completed", videoUrl: randomVideo })
        .where(and(eq(videos.id, input.id), eq(videos.userId, ctx.user.id)))
        .run();

      return { success: true, videoUrl: randomVideo };
    }),
});
