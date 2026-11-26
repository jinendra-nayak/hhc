import Link from "next/link";
import { T } from "@/components/i18n/T";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-hhc py-28">
      <p className="eyebrow mb-4"><T>Error 404</T></p>
      <h1 className="text-5xl"><T>This page could not be found.</T></h1>
      <p className="mt-5 max-w-lg text-lg text-muted"><T>The page may have moved when HHC’s website was redesigned. Try the links below.</T></p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild><Link href="/"><T>Go to home</T></Link></Button>
        <Button asChild variant="outline"><Link href="/resources"><T>Browse resources</T></Link></Button>
        <Button asChild variant="outline"><Link href="/contact"><T>Contact us</T></Link></Button>
      </div>
    </div>
  );
}
