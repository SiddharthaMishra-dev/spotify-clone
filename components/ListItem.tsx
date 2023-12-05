"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem = ({ image, name, href }: ListItemProps) => {
  const router = useRouter();

  const onClick = () => {
    //Add authentication before push
    router.push(href);
  };
  return (
    <button className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image
          src={image}
          className="object-cover"
          fill
          alt="image"
        />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute bg-green-500 rounded-full p-4 right-5 flex items-center justify-center opacity-0  group-hover:opacity-100 hover:scale-110 transition">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
