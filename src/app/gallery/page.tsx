import { ForceRefresh } from "@/components/force-refresh";
import { CloudinaryImage } from "../../components/CloudinaryImage";
import cloudinary from "cloudinary";
import { ImageGrid } from "@/components/imagegrid";
import SearchForm from "./searchform";

export type SearchResult = {
  public_id: string;
  tags: string[];
  asset_folder: string;
};

export default async function Gallery({
  searchParams: { search },
}: {
  searchParams: {
    search: string;
  };
}) {
  const results = (await cloudinary.v2.search
    .expression(
      `resource_type:image ${
        search ? `AND tags= ${search.toLocaleLowerCase()}` : ""
      } `
    )
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(10)
    .execute()) as { resources: SearchResult[] };

  const { folders: albums } = (await cloudinary.v2.api.root_folders()) as {
    folders: { name: string; path: string }[];
  };

  return (
    <section>
      <ForceRefresh />
      <div>
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <SearchForm initialSearch={search} />
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
                albums={albums}
              />
            );
          }}
        />
      </div>
    </section>
  );
}
