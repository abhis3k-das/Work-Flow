import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(3, "Role name too short").max(20, "Max 20 chars allowed"),

  description: z
    .string()
    .max(50, "Max 50 chars allowed")
    .optional()
    .refine((val) => !val || val.trim().length >= 3, { message: "Description is too short." }),
});

export type CreateRoleType = z.infer<typeof createRoleSchema>;
