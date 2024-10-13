"use client";

import Heart from "@/components/icons/heart";
import { CldImage } from "next-cloudinary";
import React, { useTransition } from "react";
import { setFavoriteStateAction } from "./actions";
import { SearchResult } from "./page";
import FullHeart from "@/components/icons/full-heart";
export function CloudinaryImage(
  props: any & { imageData: SearchResult; path: string }
) {
  const [transition, startTransition] = useTransition();
  const { imageData } = props;
  const isFavorited = imageData.tags.includes("favorited");

  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} />
      {isFavorited ? (
        <FullHeart
          onClick={() => {
            startTransition(() => {
              console.log("Unfavorite", imageData.public_id);
              setFavoriteStateAction(imageData.public_id, true, props.path);
            });
          }}
          className="absolute top-2 right-2 hover:text-white text-red-500 group hover:cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            startTransition(() => {
              console.log("Favorite", imageData.public_id);
              setFavoriteStateAction(imageData.public_id, false, props.path);
            });
          }}
          className="absolute top-2 right-2 hover:text-red-500 text-white group hover:cursor-pointer"
        />
      )}
    </div>
  );
}
