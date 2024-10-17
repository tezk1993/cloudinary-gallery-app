"use client";
import { SearchResult } from "../gallery/page";
import { CloudinaryImage } from "../../components/CloudinaryImage";
import { useEffect, useState } from "react";
import { ImageGrid } from "@/components/imagegrid";

export default function FavoritesList({
  initialResources,
}: {
  initialResources: SearchResult[];
}) {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  return (
    <ImageGrid
      images={resources}
      getImage={(imageData: SearchResult) => {
        return (
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="400"
            height="300"
            sizes="100vw"
            alt="Description of my image"
            onUnfavorite={(unfavoritedResource: SearchResult) => {
              setResources((currentResources) =>
                currentResources.filter(
                  (resource) =>
                    resource.public_id !== unfavoritedResource.public_id
                )
              );
            }}
            albums={[]}
          />
        );
      }}
    />
  );
}
