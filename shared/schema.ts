import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Blog Post types (in-memory, pre-seeded)
export interface BlogPost {
  id: string;
  slug: string;
  language: 'de' | 'en';
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  featured: boolean;
  imageUrl?: string;
}

export type InsertBlogPost = Omit<BlogPost, 'id'>;

export const blogGenerateSchema = z.object({
  language: z.enum(['de', 'en']).default('de'),
  count: z.number().min(1).max(10).default(5),
  topic: z.string().optional(),
});
