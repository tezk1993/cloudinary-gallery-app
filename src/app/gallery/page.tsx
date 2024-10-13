import { ForceRefresh } from "@/components/force-refresh";
import { CloudinaryImage } from "./CloudinaryImage";
import UploadButton from "./upload-button";
import cloudinary from "cloudinary";

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

  console.log("results", results);

  return (
    <section>
      <ForceRefresh />
      <div>
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadButton />
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          {results.resources.map((result) => (
            <CloudinaryImage
              key={result.public_id}
              imageData={result}
              width="400"
              height="300"
              sizes="100vw"
              alt="Description of my image"
              path="/gallery"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
