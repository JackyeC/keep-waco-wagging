import type { Metadata } from "next";
import { cityConfig } from "@/lib/site";

type OgImage = { src: string; alt: string; width?: number; height?: number };

function absoluteImageUrl(src: string): string {
  return src.startsWith("http") ? src : `${cityConfig.url}${src}`;
}

/**
 * Absolute canonical URL. Homepage is the origin with no trailing slash so
 * sitemap `<loc>` and `<link rel="canonical">` stay identical.
 */
export function canonicalUrl(path: string): string {
  const base = cityConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const indexFollowRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const noindexRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

/** Canonical, Open Graph, and Twitter metadata for primary pages. */
export function servicePageMetadata(
  path: string,
  title: string,
  description: string,
  ogImage?: OgImage,
): Metadata {
  const canonical = canonicalUrl(path);
  const image = ogImage ?? {
    src: cityConfig.brand.logo.full.src,
    alt: cityConfig.brand.logo.full.alt,
    width: cityConfig.brand.logo.full.width,
    height: cityConfig.brand.logo.full.height,
  };
  const imageUrl = absoluteImageUrl(image.src);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: indexFollowRobots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: cityConfig.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: image.alt,
          width: image.width,
          height: image.height,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function articlePageMetadata(
  path: string,
  title: string,
  description: string,
  ogImage: OgImage,
  publishedTime?: string,
  modifiedTime?: string,
): Metadata {
  const canonical = canonicalUrl(path);
  const imageUrl = absoluteImageUrl(ogImage.src);

  return {
    title: { absolute: `${title} | ${cityConfig.name}` },
    description,
    alternates: { canonical },
    robots: indexFollowRobots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: cityConfig.name,
      locale: "en_US",
      type: "article",
      publishedTime,
      modifiedTime,
      images: [
        {
          url: imageUrl,
          alt: ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
