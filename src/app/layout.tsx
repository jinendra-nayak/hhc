import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/animations";
import { NavProgress } from "@/components/navigation/NavProgress";
import { JsonLd } from "@/components/layout/JsonLd";
import { site } from "@/content/site";

const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });
// Gujarati/Devanagari use the visitor's system fonts (see globals.css): the webfonts were 110+ KB and delayed the hero on slow phones.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} - ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: site.url },
  openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
};

export const viewport: Viewport = { themeColor: "#173F35", width: "device-width", initialScale: 1 };

// Development only. Some browser extensions (e.g. Bitdefender) stamp attributes onto the page before React loads, which
// raises a false "hydration mismatch" error. Strip only those known attributes, then stop watching.
// Production builds do not include this script.
const stripExtensionAttributes = `(function(){
var bad=function(n){return n==="bis_skin_checked"||n==="bis_register"||n.indexOf("__processed_")===0};
var clean=function(el){if(!el.attributes)return;for(var i=el.attributes.length-1;i>=0;i--){var n=el.attributes[i].name;if(bad(n))el.removeAttribute(n)}};
var all=function(root){clean(root);if(root.querySelectorAll)root.querySelectorAll("*").forEach(clean)};
var o=new MutationObserver(function(list){list.forEach(function(m){if(m.type==="attributes"){if(bad(m.attributeName))m.target.removeAttribute(m.attributeName)}else m.addedNodes.forEach(all)})});
o.observe(document.documentElement,{subtree:true,childList:true,attributes:true});
all(document.documentElement);
addEventListener("load",function(){setTimeout(function(){o.disconnect()},5000)});
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lora.variable} ${inter.variable}`}>
      <head>
        {process.env.NODE_ENV === "development" ? <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: stripExtensionAttributes }} /> : null}
        {/* apply the visitor's saved language before first paint (no flash) */}
        {/* suppressHydrationWarning: extensions inject their own <script> into <head>, which React would otherwise compare with ours */}
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("hhc-lang")==="gu"){var d=document.documentElement;d.dataset.lang="gu";d.lang="gu"}}catch(e){}` }} />
        {/* If JavaScript fails, scroll-reveal content must still be readable. */}
        <noscript>
          <style>{`[style*="opacity: 0"],[style*="opacity:0"],[style*="translateY(-100%)"],[style*="translateY(100%)"]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <MotionProvider>
          <NavProgress />
          <Header />
          <main id="main" className="pt-[5.5rem]">{children}</main>
          <Footer />
        </MotionProvider>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            alternateName: site.shortName,
            url: site.url,
            logo: `${site.url}/images/brand/hhc-logo.png`,
            email: site.email,
            telephone: site.phone.tel,
            sameAs: Object.values(site.social),
          }}
        />
      </body>
    </html>
  );
}
