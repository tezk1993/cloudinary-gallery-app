"use server";
import cloudinary from "cloudinary";

export async function setFavoriteStateAction(
  publicId: string,
  favoriteState: boolean
) {
  if (favoriteState) {
    await cloudinary.v2.uploader.add_tag("favorited", [publicId]);
  } else {
    await cloudinary.v2.uploader.remove_tag("favorited", [publicId]);
  }
}
