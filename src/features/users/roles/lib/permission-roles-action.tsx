import { createRoleSchema, CreateRoleType } from "./permission-roles-validation";
import { createCustomRole, deleteRole, updatePermission } from "./permission-roles-service";
import { getStructuredErrors } from "@/lib/helper-functions";
import { Permission } from "@prisma/client";
import { PermissionKey } from "@/lib/constants/permission";

type CreateCustomRolesActionType = null | {
  success: boolean;
  message?: string;
  errors?: string;
};

export async function createCustomRolesAction(
  prevState: CreateCustomRolesActionType,
  formData: FormData,
): Promise<CreateCustomRolesActionType> {
  try {
    const values = {
      description: formData.get("description"),
      name: formData.get("name"),
    };
    const parsed = createRoleSchema.safeParse(values);

    if (!parsed.success) {
      const errorList = getStructuredErrors(parsed.error);
      return {
        success: false,
        message: errorList[0],
      };
    }
    const data: CreateRoleType = parsed.data;
    await createCustomRole(data);
    return {
      success: true,
      message: data.name,
    };
  } catch (err: any) {
    console.log("[CUSTOM_ROLE_CREATE_ERROR]", err);
    return {
      success: false,
      message: err.message || "Failed to create role. Please try again.",
    };
  }
}

type DeleteActionType = {
  success: boolean;
  message?: string;
};
export async function deleteRoleAction(id: string): Promise<DeleteActionType> {
  try {
    await deleteRole(id);
    return {
      success: true,
      message: "Ok",
    };
  } catch (err) {
    console.error("DELETE_ACTION_ERROR]", err);
    return {
      success: false,
      message: "Failed to delete.",
    };
  }
}

type updateActionType = {
  success: boolean;
  message?: string;
};
export async function updatePermissionAction({
  id,
  permissionList,
}: {
  id: string;
  permissionList: PermissionKey[];
}): Promise<updateActionType> {
  try {
    await updatePermission(id, permissionList);
    return {
      success: true,
      message: "Ok",
    };
  } catch (err: any) {
    console.error("UPDATE_ACTION_ERROR", err);
    return {
      success: false,
      message: err.message || "Failed to updated permission.",
    };
  }
}
