import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil } from "lucide-react";
import { AddToAlbumDialog } from "./modals/addtoAlbum";
import { SearchResult } from "@/app/gallery/page";
import { useState } from "react";
import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { DeleteDialog } from "./modals/deleteimage";
export function ImageMenu({
  image,
  albums,
}: {
  image: SearchResult;
  albums: { name: string; path: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="" asChild>
        <button>
          <HamburgerMenuIcon className="size-6 text-slate-400 " />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="-translate-x-1/3">
        <DropdownMenuGroup className="m-2 gap-2 flex flex-col">
          <DropdownMenuItem
            asChild
            className="p-0 cursor-pointer focus:bg-transparent group "
          >
            <AddToAlbumDialog
              image={image}
              onModalClose={() => setOpen(false)}
              albums={albums}
            />
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="p-0 cursor-pointer focus:bg-transparent group"
          >
            <Link
              href={`/edit?publicID=${encodeURIComponent(image.public_id)}`}
              className="flex flex-row group border-b border-solid hover:border-white border-transparent "
            >
              <Pencil className="group-hover:text-orange-500" />
              <span className="ml-1 text-lg mt-auto leading-none"> Edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="p-0 cursor-pointer focus:bg-transparent group"
          >
            <DeleteDialog image={image} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
