import { SearchResult } from "@/app/gallery/page";
import { ReactNode } from "react";

export function ImageGrid({
  images,
  getImage,
}: {
  images: SearchResult[];
  getImage: (imageData: SearchResult) => ReactNode;
}) {
  const MAX_COLUMNS = 4;

  function getColumns(colIndex: number) {
    return images.filter((resource, idx) => {
      console.log(resource);
      return idx % MAX_COLUMNS === colIndex;
    });
  }

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
        (column, idx) => (
          <div className="flex flex-col gap-4" key={idx}>
            {column.map(getImage)}
          </div>
        )
      )}
    </div>
  );
}
