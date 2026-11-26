"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { ExternalLink, Play, SkipForward } from "lucide-react";
import { T } from "@/components/i18n/T";
import { cn } from "@/lib/utils";
import { videoTopics, videos, site } from "@/content/site";

type Topic = "All" | (typeof videoTopics)[number];

/**
 * Video hub: one large player + playlist. Nothing loads from YouTube until a video is played
 * (privacy-friendly, fast). Topic chips filter the playlist; "Next" moves through it.
 */
export function VideoGallery({ compact = false, headingLevel = 3 }: { compact?: boolean; headingLevel?: 2 | 3 }) {
  const Title = `h${headingLevel}` as "h2" | "h3";
  const [topic, setTopic] = useState<Topic>("All");
  const list = useMemo(() => (topic === "All" ? videos : videos.filter((v) => v.topic === topic)), [topic]);
  const shown = compact ? list.slice(0, 4) : list;
  const [id, setId] = useState<string>(videos[0].id);
  const [playing, setPlaying] = useState(false);
  const current = shown.find((v) => v.id === id) ?? shown[0];
  const idx = shown.findIndex((v) => v.id === current.id);

  const play = (vid: string) => { setId(vid); setPlaying(true); };
  const next = () => play(shown[(idx + 1) % shown.length].id);
  const choose = (t: Topic) => {
    setTopic(t);
    const first = (t === "All" ? videos : videos.filter((v) => v.topic === t))[0];
    if (first) { setId(first.id); setPlaying(false); }
  };

  return (
    <div>
      {!compact && (
        <div role="group" aria-label="Filter videos by topic" className="mb-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {(["All", ...videoTopics] as Topic[]).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={topic === t}
              onClick={() => choose(t)}
              className={cn(
                "min-h-11 rounded-full border px-3 py-1.5 text-sm font-semibold leading-snug sm:px-5 transition-colors duration-150",
                topic === t ? "border-forest bg-forest text-white" : "border-forest/25 bg-white text-forest hover:border-forest",
              )}
            >
              <T>{t}</T>
              <span className="ml-2 text-sm opacity-70">{t === "All" ? videos.length : videos.filter((v) => v.topic === t).length}</span>
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div>
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-forest shadow-soft">
            {playing ? (
              <iframe
                key={current.id}
                className="absolute inset-0 size-full"
                src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0`}
                title={current.title}
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 block size-full" aria-label={`Play video: ${current.title}`}>
                <Image src={`/images/videos/${current.id}.jpg`} alt="" fill unoptimized preload={!compact} loading={compact ? "lazy" : "eager"} fetchPriority={compact ? "auto" : "high"} sizes="(min-width:1024px) 720px, 100vw" className="object-cover" />
                <span className="absolute inset-0 bg-forest/20 transition-colors group-hover:bg-forest/5" />
                <span className="absolute left-1/2 top-1/2 flex size-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-forest shadow-soft transition-transform duration-150 group-hover:scale-105">
                  <Play className="ml-1 size-8 fill-current" aria-hidden />
                </span>
              </button>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-full bg-sage-light px-3 py-1 font-semibold text-deep"><T>{current.topic}</T></span>
                <span className="rounded-full border border-line bg-white px-3 py-1 text-muted"><T>Spoken in Gujarati</T></span>
              </p>
              <Title className="mt-3 text-2xl sm:text-3xl"><T>{current.title}</T></Title>
              {current.presenter ? <p className="mt-1 text-muted"><T>Presented by</T> <T>{current.presenter}</T></p> : null}
            </div>
            <div className="flex gap-2">
              {shown.length > 1 && (
                <button type="button" onClick={next} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-forest/25 px-5 text-sm font-semibold text-forest transition-colors hover:border-forest hover:bg-forest hover:text-white">
                  <T>Next video</T> <SkipForward className="size-4" aria-hidden />
                </button>
              )}
              <a href={`https://www.youtube.com/watch?v=${current.id}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-forest/25 px-5 text-sm font-semibold text-forest transition-colors hover:border-forest hover:bg-forest hover:text-white">
                YouTube <ExternalLink className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <aside aria-label="Playlist">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-brown"><T>Playlist</T> · {shown.length} <T>{shown.length === 1 ? "video" : "videos"}</T></p>
          <ul className="space-y-2">
            {shown.map((v, i) => {
              const on = v.id === current.id;
              return (
                <li key={v.id}>
                  <button
                    type="button"
                    onClick={() => play(v.id)}
                    aria-current={on ? "true" : undefined}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-colors duration-150",
                      on ? "border-forest bg-white shadow-soft" : "border-transparent hover:bg-white",
                    )}
                  >
                    <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-forest sm:w-32">
                      <Image src={`/images/videos/${v.id}.jpg`} alt="" fill unoptimized sizes="128px" className="object-cover" />
                      <span className="absolute bottom-1 left-1 flex size-6 items-center justify-center rounded-full bg-forest/85 text-[0.8125rem] font-semibold text-white">{i + 1}</span>
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug text-forest"><T>{v.title}</T></span>
                      <span className="mt-0.5 block text-sm text-muted"><T>{on ? (playing ? "Now playing" : "Selected") : v.topic}</T></span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>

      {!compact && (
        <p className="mt-10 text-muted">
          <T>More from HHC on</T> <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="link-sweep font-semibold text-deep">YouTube</a>. <T>All six videos are spoken in Gujarati.</T>
        </p>
      )}
    </div>
  );
}
