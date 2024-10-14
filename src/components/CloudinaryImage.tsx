"use client";

import Heart from "@/components/icons/heart";
import { CldImage, CldImageProps } from "next-cloudinary";
import React, { useState, useTransition } from "react";
import { setFavoriteStateAction } from "../app/gallery/actions";
import { SearchResult } from "../app/gallery/page";
import FullHeart from "@/components/icons/full-heart";
import { ImageMenu } from "./imageMenu";

export function CloudinaryImage(
  props: {
    imageData: SearchResult;
    onUnfavorite?: (unheartedResource: SearchResult) => void;
  } & Omit<CldImageProps, "src">
) {
  const [transition, startTransition] = useTransition();
  const { imageData, onUnfavorite } = props;
  const [isFavorited, setIsFavorited] = useState(
    imageData.tags.includes("favorited")
  );

  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} />

      <div className="absolute top-2 right-2 flex flex-col :bg-slate-600 hover:bg-slate-600 rounded-md p-2">
        {isFavorited ? (
          <FullHeart
            onClick={() => {
              startTransition(() => {
                console.log("Unfavorite", imageData.public_id);
                onUnfavorite?.(imageData);
                setIsFavorited(false);
                setFavoriteStateAction(imageData.public_id, false);
              });
            }}
            className=" hover:text-white text-red-500 group hover:cursor-pointer"
          />
        ) : (
          <Heart
            onClick={() => {
              startTransition(() => {
                console.log("Favorite", imageData.public_id);
                setIsFavorited(true);

                setFavoriteStateAction(imageData.public_id, true);
              });
            }}
            className=" hover:text-red-500 text-white group hover:cursor-pointer"
          />
        )}
        <ImageMenu image={imageData} />
      </div>
    </div>
  );
}
