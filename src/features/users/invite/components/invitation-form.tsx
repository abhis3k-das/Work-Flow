"use client";

import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createInviteAction } from "../lib/invitation-action";
import { inviteUserSchema, InviteUserType } from "../lib/invitation-validation";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type ActionState = null | {
  success: boolean;
  message?: string;
};

export function InviteForm({ workspaceId, setOpen }: { workspaceId: string; setOpen: Dispatch<SetStateAction<boolean>> }) {
  const router = useRouter();

  const [state, formAction, isSubmitting] = useActionState<ActionState, FormData>(createInviteAction, null);

  const form = useForm<InviteUserType>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "MEMBER",
      note: "",
    },
  });

  useEffect(() => {
    if (state?.success) {
      // 1. reset the client-side form
      form.reset();

      // 2. close the Sheet
      const timer = setTimeout(() => setOpen(false), 300);

      router.refresh();
      toast.success("Invitation sent", {
        description: "The invitation has been sent successfully.",
      });
      return () => clearTimeout(timer);
    }
  }, [state, form, setOpen, router]);

  return (
    <Form {...form}>
      <form action={formAction} className="mt-4 space-y-6">
        {/* Hidden workspace id (needed for server action) */}
        <input type="hidden" name="workspaceId" value={workspaceId} />

        {/* Full Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">
                Full Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">
                Role <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value} // use value instead of defaultValue
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="MEMBER">Member</SelectItem>
                    </SelectContent>
                  </Select>

                  <input type="hidden" name="role" value={field.value} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Note (optional) */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Note</FormLabel>
              <FormControl>
                <Input placeholder="Add a short message…" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!state?.success && state?.message && <p className="text-sm text-red-600">{state.message}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Invitation"}
        </Button>
      </form>
    </Form>
  );
}
