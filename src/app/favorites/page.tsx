import cloudinary from "cloudinary";
import { SearchResult } from "../gallery/page";
import { CloudinaryImage } from "../../components/CloudinaryImage";
import { ForceRefresh } from "@/components/force-refresh";
import FavoritesList from "./favorites-list";

export default async function FavoritesPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image AND tags=favorited")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(10)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <ForceRefresh />
      <div>
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Favorites</h1>
        </div>
        <FavoritesList initialResources={results.resources} />
      </div>
    </section>
  );
}
