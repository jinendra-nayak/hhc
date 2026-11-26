import { Archive } from "lucide-react";

export function ArchiveNotice({ children }: { children: React.ReactNode }) {
  return (
    <div role="note" className="flex gap-4 rounded-2xl border border-sage/40 border-l-4 border-l-sage bg-white p-5 text-forest shadow-soft">
      <Archive className="mt-1 size-5 shrink-0 text-brand-brown" aria-hidden />
      <div>{children}</div>
    </div>
  );
}
