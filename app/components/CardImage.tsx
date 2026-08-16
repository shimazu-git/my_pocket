import Image from "next/image";

type CardImageProps = {
  thumbnail: string | null;
};
export default function CardImage({ thumbnail }: CardImageProps) {
  return (
    <div className="relative w-full h-full">
      {thumbnail ? (
        <Image
          className="object-cover md:object-contain object-center md:object-top"
          src={thumbnail}
          alt="サムネイル画像"
          fill={true}
          priority
          sizes="300px"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse">画像無し</div>
      )}
    </div>
  );
}
