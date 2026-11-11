import Image from "next/image";

/**
 * 9:16 poster box. Reserves its aspect ratio so cards never shift layout.
 * Renders placeholder styling while the owner hasn't supplied a poster yet.
 */
export default function Poster({
  src,
  alt,
  sizes,
  priority = false,
  label = "poster",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  label?: string;
}) {
  if (!src) {
    return (
      <div
        className="absolute inset-0 flex items-end bg-[linear-gradient(160deg,#f3d9cf_0%,#eeeae4_55%,#d5d2cb_100%)] p-3"
        role="img"
        aria-label={`${alt} (placeholder)`}
      >
        <span className="text-[11px] text-foreground/70">
          {`TODO: ${label}`}
        </span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
    />
  );
}
