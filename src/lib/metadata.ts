import type { Metadata } from "next";
import { cityConfig } from "@/lib/site";

type OgImage = { src: string; alt: string; width?: number; height?: number };

function absoluteImageUrl(src: string): string {
  return src.startsWith("http") ? src : `${cityConfig.url}${src}`;
}

/** Canonical, Open Graph, and Twitter metadata for primary pages. */
export function servicePageMetadata(
  path: string,
  title: string,
  description: string,
  ogImage?: OgImage,
): Metadata {
  const canonical = `${cityConfig.url}${path}`;
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
): Metadata {
  const canonical = `${cityConfig.url}${path}`;
  const imageUrl = absoluteImageUrl(ogImage.src);

  return {
    title: { absolute: `${title} | ${cityConfig.name}` },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: cityConfig.name,
      locale: "en_US",
      type: "article",
      publishedTime,
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
