import { z } from "zod";

export const validateUser = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  clerkId: z.string().min(1),
});

export type createUserType = z.infer<typeof validateUser>;

export const validatePost = z.object({
  user_id: z.string().min(1),
  content: z.string().min(1),
  image: z.string().optional(),
  tag: z.string().optional(),
});

export type createPostType = z.infer<typeof validatePost>;

export const validateUpdate = z.object({
  username: z.string().min(1),
  bio: z.string().optional(),
  profileImage: z.string().optional(),
});

export type updateUserType = z.infer<typeof validateUpdate>;

export const validateComment = z.object({
  post_id: z.string().min(1),
  user_id: z.string().min(1),
  comment: z.string().min(1),
  image: z.string().nullable().optional(),
});

export type createCommentType = z.infer<typeof validateComment>;
