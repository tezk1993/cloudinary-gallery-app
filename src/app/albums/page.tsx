import { ForceRefresh } from "@/components/force-refresh";
import cloudinary from "cloudinary";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchResult } from "../gallery/page";
import { ImageGrid } from "@/components/imagegrid";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import AlbumCard from "./album-card";
export default async function Albums() {
  const { folders: albums } = (await cloudinary.v2.api.root_folders()) as {
    folders: { name: string; path: string }[];
  };
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(10)
    .execute()) as { resources: SearchResult[] };

  console.log(albums);
  return (
    <section>
      <ForceRefresh />
      <div>
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Albums</h1>
        </div>
        <div className="grid grid-cols-4 grid-flow-col gap-4 mt-4 ">
          {albums.map((album) => (
            <AlbumCard key={album.path} name={album.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
