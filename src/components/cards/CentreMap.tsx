"use client";
import { useState } from "react";
import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { T } from "@/components/i18n/T";
import { mapPlaces } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Pick a place, see it on an embedded Google map (no API key; loaded lazily when scrolled into view).
 * The pin comes from Google's own search of the address HHC published, so it is approximate — the note says so.
 */
export function CentreMap() {
  const [id, setId] = useState<string>(mapPlaces[0].id);
  const place = mapPlaces.find((p) => p.id === id) ?? mapPlaces[0];
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(place.query)}&z=15&output=embed`;
  const open = place.openUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.query)}`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.query)}`;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
      <div role="group" aria-label="Choose a place" className="flex flex-col gap-2">
        {mapPlaces.map((p) => {
          const on = p.id === id;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={on}
              onClick={() => setId(p.id)}
              className={cn(
                "rounded-2xl border p-4 text-left transition-colors duration-150",
                on ? "border-forest bg-forest text-white shadow-soft" : "border-line bg-white text-ink hover:border-forest/40",
              )}
            >
              <span className="flex items-center gap-2 font-heading text-lg">
                <MapPin className={cn("size-4 shrink-0", on ? "text-white" : "text-brand-brown")} aria-hidden />
                <T>{p.short}</T>
              </span>
              <span className={cn("mt-1 line-clamp-2 block text-sm", on ? "text-white/80" : "text-muted")}><T>{p.address}</T></span>
            </button>
          );
        })}
      </div>

      <div className="relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft lg:block lg:min-h-[28rem] lg:bg-sage-light">
        <iframe
          key={place.id}
          title={place.name}
          src={embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-72 w-full border-0 lg:absolute lg:inset-0 lg:h-full"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-4 lg:absolute lg:inset-x-4 lg:bottom-4 lg:rounded-2xl lg:border-0 lg:bg-white/95 lg:shadow-soft">
          <div className="min-w-0">
            <p className="font-semibold leading-snug text-forest"><T>{place.name}</T></p>
            <p className="text-sm text-muted"><T>Map position is approximate — please call before visiting.</T></p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={directions} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-forest px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-deep">
              <Navigation className="size-4" aria-hidden /> <T>Get directions</T>
            </a>
            <a href={open} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border border-forest/25 px-4 text-sm font-semibold text-forest transition-colors duration-150 hover:bg-sage-light">
              <T>Open in Google Maps</T> <ExternalLink className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
