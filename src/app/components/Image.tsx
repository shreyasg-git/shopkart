import { useState } from "react";
import Spinner from "./Spinner";
import NextImage from "next/image";

type ImageProps = {
  src: string;
  alt: string;
};

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  const [isLoading, setisLoading] = useState(false);
  const onLoad = () => {
    setisLoading(false);
  };
  return (
    <>
      <div
        style={{
          display: isLoading ? "flex" : "none",
          alignItems: "center",
        }}
      >
        <Spinner size="md" />
      </div>
      <NextImage
        src={src}
        alt={alt}
        height={480}
        width={480}
        onLoad={onLoad}
        loading="lazy"
        placeholder="empty"
        className="h-full w-auto mb-4 rounded"
        style={{ display: isLoading ? "none" : "block" }}
      />
    </>
  );
};
export default Image;
