import { ForceRefresh } from "@/components/force-refresh";
import cloudinary from "cloudinary";
import AlbumCard from "./album-card";

export type AlbumData = {
  folders: {
    name: string;
    path: string;
    picture_amount: number;
  }[];
};

export default async function Albums() {
  const albums = (await cloudinary.v2.api.root_folders()) as AlbumData;

  albums.folders.map(async (album) => {
    const amount = (await cloudinary.v2.search
      .expression(`resource_type:image AND asset_folder:${album.name}`)
      .sort_by("created_at", "desc")
      .with_field("tags")
      .max_results(1)
      .execute()) as { total_count: number };

    console.log(album.name + " " + amount.total_count);
  });

  return (
    <section>
      <ForceRefresh />
      <div>
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Albums</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-flow-col  gap-2 mt-4 lg:grid-cols-3  md:grid-cols-2 ">
          {albums.folders.map((album) => (
            <AlbumCard key={album.path} name={album.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
