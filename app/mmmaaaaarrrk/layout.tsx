import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MARK",
  description: "Hey Mark, this is for you",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default function MarkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}