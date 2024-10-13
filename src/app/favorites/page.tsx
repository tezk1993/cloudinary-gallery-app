import cloudinary from "cloudinary";
import { SearchResult } from "../gallery/page";
import { CloudinaryImage } from "../gallery/CloudinaryImage";
import { ForceRefresh } from "@/components/force-refresh";

export default async function FavoritesPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image AND tags=favorited")
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
          <h1 className="text-4xl font-bold">Favorites</h1>
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
              path="/favorites"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
