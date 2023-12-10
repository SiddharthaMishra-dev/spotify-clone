"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem = ({ data, onClick }: MediaItemProps) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      onClick(data.id);
    }
    // Todo: default turn on player
  };
  return (
    <div
      className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-800/50
        rounded-md
        w-full
        p-2
        "
    >
      <div
        className="
            relative
            rounded-md
            min-h-[48px]
            min-w-[48px]
            overflow-hidden
            "
      >
        <Image
          fill
          src={imageUrl || "/public/images/liked.png"}
          alt={"image"}
          className="object-fit"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate ">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
