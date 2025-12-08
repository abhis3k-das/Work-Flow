import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { createCustomRolesAction } from "../lib/permission-roles-action";
import { createRoleSchema, CreateRoleType } from "../lib/permission-roles-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type ActionState = null | {
  success: boolean;
  message?: string;
};
export default function CustomRoleForm({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const router = useRouter();
  const [state, formAction, isSubmitting] = useActionState<ActionState, FormData>(createCustomRolesAction, null);
  const form = useForm<CreateRoleType>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (state?.success) {
      form.reset();
      const timer = setTimeout(() => setOpen(false), 300);
      router.refresh();
      toast.success(`Role ${state.message} created.`);
      return () => clearTimeout(timer);
    }
  }, [state, form, setOpen, router]);

  return (
    <Form {...form}>
      <form action={formAction} className="mt-4 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">
                Role Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Custom-Admin" {...field} required minLength={3} maxLength={20} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Role decription..." {...field} minLength={3} maxLength={50} />
              </FormControl>
            </FormItem>
          )}
        />

        {!state?.success && state?.message && <p className="text-sm text-red-600">{state.message}</p>}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </Form>
  );
}
