import { ForceRefresh } from "@/components/force-refresh";
import { CloudinaryImage } from "../../components/CloudinaryImage";
import UploadButton from "./upload-button";
import cloudinary from "cloudinary";
import { ImageGrid } from "@/components/imagegrid";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function Gallery() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(10)
    .execute()) as { resources: SearchResult[] };
  console.log(results);

  return (
    <section>
      <ForceRefresh />
      <div>
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadButton />
        </div>
        <ImageGrid
          images={results.resources}
          getImage={(imageData: SearchResult) => {
            return (
              <CloudinaryImage
                key={imageData.public_id}
                imageData={imageData}
                width="400"
                height="300"
                sizes="100vw"
                alt="Description of my image"
              />
            );
          }}
        />
      </div>
    </section>
  );
}
