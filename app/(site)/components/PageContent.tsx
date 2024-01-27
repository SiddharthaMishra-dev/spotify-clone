"use client";

import { AiOutlinePlus } from "react-icons/ai";

import SongItem from "@/components/SongItem";
import useAuthModal from "@/hooks/useAuthModal";
import useOnPlay from "@/hooks/useOnPlay";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import { Song } from "@/types";

interface PageContentProps {
  songs: Song[];
}

const PageContent = ({ songs }: PageContentProps) => {
  const onPlay = useOnPlay(songs);
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const { user } = useUser();
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    return uploadModal.onOpen();
  };

  if (songs.length === 0) {
    return <div className="mt-d text-neutral-400">No songs available</div>;
  }
  return (
    <>
      <div
        className="
    grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-8
    gap-4
    mt-4
    "
      >
        {songs.map((item) => (
          <SongItem
            key={item.id}
            onClick={(id: string) => onPlay(id)}
            data={item}
          />
        ))}
      </div>
      <div
        onClick={onClick}
        className="md:hidden absolute bottom-20 left-10 bg-white rounded-full p-3 flex justify-center items-center hover:opacity-75 transition"
      >
        <AiOutlinePlus
          className="text-black font-bold"
          size={20}
        />
      </div>
    </>
  );
};

export default PageContent;
