import Image from "next/image"

interface ImageComponentProps {
  src: string
  alt: string
  width: number
  height: number
}

export default function ImageComponent({ src, alt, width, height }: ImageComponentProps) {
  return <Image src={src || "/placeholder.svg"} alt={alt} width={width} height={height} layout="responsive" />
}

