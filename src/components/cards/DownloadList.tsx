import { Download } from "lucide-react";
import { T } from "@/components/i18n/T";

type Doc = { title: string; file: string; pages: number; mb: number; language?: string };

export function DownloadList({ docs }: { docs: readonly Doc[] }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
      {docs.map((d) => (
        <li key={d.file}>
          <a href={d.file} download className="group flex items-center justify-between gap-6 px-5 py-6 transition-colors duration-150 hover:bg-sage-light/50">
            <span>
              <span className="block font-heading text-2xl text-forest"><T>{d.title}</T></span>
              <span className="mt-1 block text-sm text-muted">{d.language ? <><T>{d.language}</T> · </> : null}{d.pages} <T>pages</T> · {d.mb} MB · PDF</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-deep">
              <span className="hidden sm:inline"><T>Download</T></span>
              <Download className="size-5" aria-hidden />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
