import React from "react";

interface LocationImageProps {
  path: string ;
  width: string;
  alt: string;
}

export default function LocationImage({
  path,
  alt,
  width,
}: LocationImageProps) {
  return (
    <img
      src={path}
      alt={alt}
      style={{
        width: width,
        height: "auto",
        border: "1px solid #ccc",
      }}
    />
  );
}
