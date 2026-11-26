import Link from "next/link";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { posts } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog - updates and archive",
  description: "HHC updates and archive: camps, courses and health packages.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow={<T>Resources</T>} title={<T>Blog.</T>} lead={<T>News, updates and archive. New articles will be added as HHC publishes them.</T>} crumbs={[{ label: <T>Blog</T> }]} />
      <Section tone="cream">
        <ul className="divide-y divide-line border-y border-line">
          {posts.map((p) => (
            <li key={p.slug} className="grid gap-2 py-8 md:grid-cols-[10rem_1fr] md:gap-10">
              <p className="text-sm text-muted"><time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time></p>
              <div>
                <h2 className="text-2xl"><Link href={p.href} className="hover:text-sage"><T>{p.title}</T></Link></h2>
                <p className="mt-2 max-w-2xl text-muted"><T>{p.summary}</T></p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
