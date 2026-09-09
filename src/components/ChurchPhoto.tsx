import Image from "next/image";

type ChurchPhotoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  /** Crop into a shared frame so paired photos match. */
  cover?: boolean;
};

export function ChurchPhoto({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 768px",
  cover = false,
}: ChurchPhotoProps) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-border bg-photo-ground ${
        cover ? "relative aspect-[4/3]" : ""
      } ${className ?? ""}`}
    >
      {cover ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover object-center ${imgClassName ?? ""}`}
          sizes={sizes}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`h-auto w-full object-cover ${imgClassName ?? ""}`}
          sizes={sizes}
        />
      )}
    </figure>
  );
}
