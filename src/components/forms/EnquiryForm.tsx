"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { T } from "@/components/i18n/T";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "success" | "error";

export function EnquiryForm({
  topic = "General enquiry",
  submitLabel = "Send message",
  messageLabel = "Message",
  dark = false,
}: {
  topic?: string;
  submitLabel?: string;
  messageLabel?: string;
  dark?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput>({ resolver: zodResolver(enquirySchema), defaultValues: { topic, email: "", message: "", website: "" } });

  async function onSubmit(values: EnquiryInput) {
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("success");
        reset({ topic, email: "", message: "", website: "" });
        return;
      }
      const data = await res.json().catch(() => ({}));
      setErrorMsg(
        data.error === "not_configured"
          ? "Online enquiries are not switched on yet."
          : data.error === "rate_limited"
            ? "Too many messages from this device. Please try again in a few minutes."
            : "We could not send your message.",
      );
    } catch {
      setErrorMsg("We could not reach the server. Check your connection.");
    }
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div role="status" className="flex gap-4 rounded-[6px] border border-sage/40 bg-sage-light/60 p-6 text-forest">
        <CheckCircle2 className="mt-1 size-6 shrink-0 text-sage" aria-hidden />
        <div>
          <p className="font-heading text-xl"><T>Thank you - your message has been sent.</T></p>
          <p className="mt-1 text-forest/80"><T>The HHC team will contact you on the number you gave.</T></p>
          <Button variant="link" className="mt-3" onClick={() => setStatus("idle")}><T>Send another message</T></Button>
        </div>
      </div>
    );
  }

  const labelCls = dark ? "!text-white" : "";
  const err = (id: string, msg?: string) =>
    msg ? (
      <p id={id} role="alert" className={dark ? "mt-1.5 text-sm text-[#ffb4a8]" : "mt-1.5 text-sm text-red-700"}>
        <T>{msg}</T>
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={status === "sending"} className="space-y-5">
      <input type="hidden" {...register("topic")} />
      {/* honeypot - hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className={labelCls}><T>Name *</T></Label>
          <Input id="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} {...register("name")} />
          {err("name-err", errors.name?.message)}
        </div>
        <div>
          <Label htmlFor="phone" className={labelCls}><T>Phone / WhatsApp *</T></Label>
          <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} {...register("phone")} />
          {err("phone-err", errors.phone?.message)}
        </div>
      </div>
      <div>
        <Label htmlFor="email" className={labelCls}><T>Email (optional)</T></Label>
        <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} {...register("email")} />
        {err("email-err", errors.email?.message)}
      </div>
      <div>
        <Label htmlFor="message" className={labelCls}><T>{messageLabel}</T></Label>
        <Textarea id="message" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} {...register("message")} />
        {err("message-err", errors.message?.message)}
      </div>

      {status === "error" && (
        <div role="alert" className="flex gap-3 rounded-[6px] border border-red-300 bg-red-50 p-4 text-red-900">
          <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p>
            <T>{errorMsg}</T> <T>Please call</T> <a className="font-semibold underline" href={`tel:${site.phone.tel}`}>{site.phone.display}</a> <T>or email</T>{" "}
            <a className="font-semibold underline" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      )}

      <Button type="submit" size="lg" variant={dark ? "white" : "primary"} disabled={status === "sending"}>
        {status === "sending" ? (<><Loader2 className="animate-spin" aria-hidden /> <T>Sending…</T></>) : <T>{submitLabel}</T>}
      </Button>
    </form>
  );
}
