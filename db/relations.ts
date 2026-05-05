import { relations } from "drizzle-orm";
import { users, videos } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  videos: many(videos),
}));

export const videosRelations = relations(videos, ({ one }) => ({
  user: one(users, {
    fields: [videos.userId],
    references: [users.id],
  }),
}));
