"use client";

import { useTransition } from "react";
import { acceptInvitation } from "../lib/invitation-service";
import { toast } from "sonner";

type Props = {
  token: string;
  email: string;
  name: string;
};

export default function AcceptInviteForm({ token, email, name }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    startTransition(async () => {
      const res = await acceptInvitation({ token, password });

      if (res.success) {
        toast.success("Account created, redirecting to login...");
        window.location.href = "/login";
      } else {
        toast.error(res.message || "Failed to accept invitation");
      }
    });
  };

  return (
    <form className="w-full max-w-md space-y-4 rounded-lg border p-6 shadow" action={handleSubmit}>
      <h1 className="text-xl font-semibold">Accept invitation</h1>

      <div className="space-y-1">
        <label className="text-sm text-gray-400">Email</label>
        <input className="w-full rounded border bg-gray-900 px-3 py-2 text-sm" defaultValue={email} disabled />
      </div>

      <div className="space-y-1">
        <label className="text-sm">Password</label>
        <input type="password" name="password" className="w-full rounded border bg-gray-900 px-3 py-2 text-sm" required />
      </div>

      <div className="space-y-1">
        <label className="text-sm">Confirm password</label>
        <input type="password" name="confirmPassword" className="w-full rounded border bg-gray-900 px-3 py-2 text-sm" required />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-white px-3 py-2 text-sm font-medium text-black disabled:opacity-60"
      >
        {isPending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
