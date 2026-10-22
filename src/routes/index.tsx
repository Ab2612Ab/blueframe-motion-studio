import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { About, Faq, Footer, Gallery, Header, Hero, Process, Services, Strip, VideoModal } from "@/components/site/sections";
import { Contact, Reviews } from "@/components/site/forms";
import type { MediaRef } from "@/components/site/media";

const TITLE = "Blueframe Motion | CGI, 3D Animation & AI Video";
const DESC =
  "Blueframe Motion is an animation studio led by Taiwo Emmanuel creating CGI and 3D product animation, launch films, character animation, AI avatar videos and motion graphics.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: Index,
});

function Index() {
  const [media, setMedia] = useState<MediaRef | null>(null);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <Header />
      <main id="main">
        <Hero onPlay={setMedia} />
        <Strip />
        <Services />
        <Gallery onPlay={setMedia} />
        <Process />
        <About />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <VideoModal media={media} onClose={() => setMedia(null)} />
    </>
  );
}