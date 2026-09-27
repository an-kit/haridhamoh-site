import Image from "next/image";

type SacredImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function SacredImage({ src, alt, width, height }: SacredImageProps) {
  return (
    <Image
      alt={alt}
      className="rounded-2xl"
      height={height}
      src={src}
      width={width}
    />
  );
}
