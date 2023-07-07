type Props = {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
};

function ItemImage({ src, alt = "", width, height, className }: Props) {
  const OPTIONS = "w_300,h_300,f_webp,q_auto";

  return (
    <img
      src={`https://res.cloudinary.com/dr2ufkyd4/image/fetch/${OPTIONS}/${src}`}
      alt={alt}
      width={width}
      height={height}
      className={className}
      draggable="false"
    />
  );
}

export default ItemImage;
