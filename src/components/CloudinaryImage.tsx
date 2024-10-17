"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import React, { useState, useTransition } from "react";
import { setFavoriteStateAction } from "../app/gallery/actions";
import { SearchResult } from "../app/gallery/page";
import { ImageMenu } from "./imageMenu";
import { Heart, HeartIcon } from "lucide-react";
import { ImageFocus } from "./modals/imagefocus";

export function CloudinaryImage(
  props: {
    imageData: SearchResult;
    onUnfavorite?: (unheartedResource: SearchResult) => void;
    albums: { name: string; path: string }[];
  } & Omit<CldImageProps, "src">
) {
  const [transition, startTransition] = useTransition();
  const { imageData, onUnfavorite } = props;
  const [isFavorited, setIsFavorited] = useState(
    imageData.tags.includes("favorited")
  );

  return (
    <div className="relative group">
      <CldImage
        className="w-full h-full"
        {...props}
        src={imageData.public_id}
      />

      <div className="absolute top-2 right-2 flex flex-col  rounded-md p-1 items-center gap-2 group-hover:bg-gray-800 transition-all">
        {isFavorited ? (
          <Heart
            onClick={() => {
              startTransition(() => {
                onUnfavorite?.(imageData);
                setIsFavorited(false);
                setFavoriteStateAction(imageData.public_id, false);
              });
            }}
            className=" hover:text-white text-red-500 group hover:cursor-pointer fill-red-500"
          />
        ) : (
          <HeartIcon
            onClick={() => {
              startTransition(() => {
                setIsFavorited(true);

                setFavoriteStateAction(imageData.public_id, true);
              });
            }}
            className=" hover:text-red-500 text-slate-400 group hover:cursor-pointer "
          />
        )}
        <ImageFocus imageData={imageData} albums={props.albums} />

        <ImageMenu image={imageData} albums={props.albums} />
      </div>
    </div>
  );
}
