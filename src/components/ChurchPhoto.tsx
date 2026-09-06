import Image from "next/image";

type ChurchPhotoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  sizes?: string;
};

export function ChurchPhoto({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 768px",
}: ChurchPhotoProps) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-border bg-surface ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`h-auto w-full object-cover ${imgClassName ?? ""}`}
        sizes={sizes}
      />
    </figure>
  );
}
