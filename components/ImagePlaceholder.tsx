"use client";

import Image from "next/image";
import { useState } from "react";
import { classNames } from "../lib/utils";

type ImagePlaceholderProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

export const ImagePlaceholder = ({
  src,
  alt,
  width,
  height,
  className,
  priority
}: ImagePlaceholderProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={classNames(
          "flex h-full w-full items-center justify-center rounded-2xl border border-line bg-paper text-xs uppercase tracking-[0.3em] text-mute shadow-soft",
          className
        )}
      >
        IMAGE
      </div>
    );
  }

  return (
    <div
      className={classNames(
        "relative h-full w-full overflow-hidden rounded-2xl border border-line bg-paper shadow-soft",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
};
