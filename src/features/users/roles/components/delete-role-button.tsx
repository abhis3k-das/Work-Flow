import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteRoleAction } from "../lib/permission-roles-action";

export default function DeleteRoleButton(props: { id: string }) {
  const router = useRouter();
  const [isPending, startTransistion] = useTransition();

  const handleDelete = () => {
    startTransistion(async () => {
      const res = await deleteRoleAction(props.id);
      if (!res.success) {
        toast.error(res.message ?? "Failed to delete role.");
        return;
      }
      toast.success("Role deleted.");
      router.refresh();
    });
  };
  return (
    <Button type="button" className="button-md-red" disabled={isPending} onClick={handleDelete}>
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
