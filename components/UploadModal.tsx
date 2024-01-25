"use client";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import uniqid from "uniqid";
import * as mm from "music-metadata-browser";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const songFile = values.song?.[0];
    const metadata = await mm.parseBlob(songFile);
    console.log(metadata);
    const imagesrc = URL.createObjectURL(metadata.common.picture[0].data);
    console.log(imagesrc);
    // setIsLoading(true);
    // try {
    //   // const imageFile = values.image?.[0];
    //   const imageFile = metadata.common.picture[0].data;
    //   const songFile = values.song?.[0];

    //   if (!songFile || !imageFile || !user) {
    //     toast.error("Missing fields");
    //     return;
    //   }
    //   const uniqID = uniqid();

    //   //upload song
    //   const { data: songData, error: songError } = await supabaseClient.storage
    //     .from("songs")
    //     .upload(`song-${values.title}-${uniqID}`, songFile, {
    //       cacheControl: "3600",
    //       upsert: false,
    //     });

    //   if (songError) {
    //     setIsLoading(false);
    //     return toast.error("Failed song upload");
    //   }

    //   //upload image

    //   const { data: imageData, error: imageError } = await supabaseClient.storage
    //     .from("images")
    //     .upload(`image-${values.title}-${uniqID}`, imageFile, {
    //       cacheControl: "3600",
    //       upsert: false,
    //     });
    //   if (imageError) {
    //     setIsLoading(false);
    //     return toast.error("Failed image upload");
    //   }

    //   //insert data to database
    //   const { error: supabaseError } = await supabaseClient.from("songs").insert({
    //     user_id: user.id,
    //     title: values.title,
    //     author: values.author,
    //     image_path: imageData.path,
    //     song_path: songData.path,
    //   });
    //   if (supabaseError) {
    //     setIsLoading(false);
    //     return toast.error(supabaseError.message);
    //   }

    //   router.refresh();
    //   setIsLoading(false);
    //   toast.success("Song created");
    //   reset();
    //   uploadModal.onClose();
    // } catch (error) {
    //   toast.error("Something went wrong");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Modal
      title="Add a song"
      description="upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register("song", { required: true })}
          />
        </div>
        {/* <div>
          <div className="pb-1">Select an image file</div>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image", { required: true })}
          />
        </div> */}
        <Button
          disabled={isLoading}
          type="submit"
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
