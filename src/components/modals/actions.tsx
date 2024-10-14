"use server";
import { SearchResult } from "@/app/gallery/page";
import cloudinary from "cloudinary";

export async function AddImageToAlbum(image: SearchResult, albumName: string) {
  await cloudinary.v2.api.create_folder(albumName);

  cloudinary.v2.api
    .update(image.public_id, { asset_folder: `${albumName}` })
    .then((result) => console.log(result));
}
