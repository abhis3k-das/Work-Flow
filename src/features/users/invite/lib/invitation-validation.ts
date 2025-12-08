import { z } from "zod";

export const inviteUserSchema = z.object({
  workspaceId: z.string().min(1, "Workspace is required"),
  name: z.string().nonempty("Name is missing").min(2, "Name is too short").max(20, "Max 20 char allowed"),
  email: z.email("Invalid Email").nonempty("Email is required"),
  role: z.enum(["ADMIN", "MEMBER"], "Role is required"),
  note: z.string().optional(),
});

export type InviteUserType = z.infer<typeof inviteUserSchema>;
