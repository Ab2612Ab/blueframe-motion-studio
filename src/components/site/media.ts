export type MediaRef = { id: string; title: string; tag: string; poster: string; mp4: string; source: string; credit: string; vertical: boolean };

export const MEDIA = [
  {
    id: "product",
    title: "Product visual styling",
    tag: "Product",
    poster: "https://images.pexels.com/videos/7316975/pexels-photo-7316975.jpeg?auto=compress&w=1260&h=750&dpr=1",
    mp4: "https://videos.pexels.com/video-files/7316975/7316975-uhd_1440_2560_25fps.mp4",
    source: "https://www.pexels.com/video/sample-white-cosmetic-containers-7316975/",
    credit: "Angela Roma / Pexels",
    vertical: true,
  },
  {
    id: "cgi",
    title: "CGI & abstract motion study",
    tag: "3D / CGI",
    poster: "https://images.pexels.com/videos/12783148/pexels-photo-12783148.jpeg?auto=compress&w=1260&h=750&dpr=1",
    mp4: "https://videos.pexels.com/video-files/12783148/12783148-uhd_2560_1440_60fps.mp4",
    source: "https://www.pexels.com/video/abstract-3d-cg-animation-12783148/",
    credit: "Colors Motion Graphics / Pexels",
    vertical: false,
  },
  {
    id: "ai",
    title: "AI visual storytelling reference",
    tag: "AI concept",
    poster: "https://images.pexels.com/videos/18069233/ai-ai-tool-artificial-intelligence-assistive-technology-18069233.jpeg?auto=compress&w=1260&h=750&dpr=1",
    mp4: "https://videos.pexels.com/video-files/18069233/18069233-uhd_1440_2560_24fps.mp4",
    source: "https://www.pexels.com/video/an-artist-s-animation-of-artificial-intelligence-ai-this-video-represents-how-ai-powered-tools-can-support-us-and-save-time-it-was-created-by-martina-stiftinger-as-part-of-the-visualis-18069233/",
    credit: "Google DeepMind / Pexels",
    vertical: true,
  },
  {
    id: "character",
    title: "Character performance / VFX reference",
    tag: "Character",
    poster: "https://images.pexels.com/videos/15876222/furry-monster-on-green-15876222.jpeg?auto=compress&w=1260&h=750&dpr=1",
    mp4: "https://videos.pexels.com/video-files/15876222/15876222-hd_1920_1080_30fps.mp4",
    source: "https://www.pexels.com/video/furry-monster-on-green-15876222/",
    credit: "Jason Liquori / Pexels",
    vertical: false,
  },
] as const satisfies readonly MediaRef[];