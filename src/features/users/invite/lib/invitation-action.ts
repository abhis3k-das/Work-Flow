"use server";

import { inviteUserSchema, InviteUserType } from "../lib/invitation-validation";
import { createInvitation } from "./invitation-service";

type InviteActionState = null | {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function createInviteAction(prevState: InviteActionState, formData: FormData): Promise<InviteActionState> {
  try {
    const values = {
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      note: formData.get("note"),
      workspaceId: formData.get("workspaceId"),
    };

    const parsed = inviteUserSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const data: InviteUserType = parsed.data;

    await createInvitation({
      invitedBy: "Abhisek", // later: take from session
      data,
    });

    return {
      success: true,
      message: "Invitation sent successfully!",
    };
  } catch (err) {
    console.error("[INVITE_ACTION_ERROR]", err);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
