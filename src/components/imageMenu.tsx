import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HamburgerMenu from "./icons/hamburger-menu";
import Folder from "./icons/folder";
import { FolderPlus } from "lucide-react";
import { AddToAlbumDialog } from "./modals/addtoAlbum";
import { SearchResult } from "@/app/gallery/page";
import { useState } from "react";
export function ImageMenu({ image }: { image: SearchResult }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="" asChild>
        <button>
          <HamburgerMenu />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 -translate-x-1/3">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="p-0">
            <AddToAlbumDialog
              image={image}
              onModalClose={() => setOpen(false)}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
