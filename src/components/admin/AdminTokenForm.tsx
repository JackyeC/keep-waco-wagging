"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

type AdminTokenFormProps = {
  title: string;
  description: string;
  action: (formData: FormData) => void | Promise<void>;
};

export function AdminTokenForm({
  title,
  description,
  action,
}: AdminTokenFormProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const error = searchParams.get("error") === "1";

  return (
    <div className="mx-auto max-w-sm rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
      <h1 className="font-display text-2xl text-bark">{title}</h1>
      <p className="mt-2 text-sm text-stone-600">{description}</p>
      <form action={action} className="mt-6 space-y-3">
        <input type="hidden" name="next" value={pathname} />
        <input
          type="password"
          name="token"
          required
          autoComplete="current-password"
          placeholder="Admin token"
          className="w-full rounded-full border border-stone-300 px-4 py-2.5 text-sm focus:border-sage-400 focus:outline-none"
        />
        <Button type="submit" className="w-full">
          Unlock
        </Button>
        {error ? (
          <p className="text-center text-sm text-rose-600">Invalid token.</p>
        ) : null}
      </form>
    </div>
  );
}
