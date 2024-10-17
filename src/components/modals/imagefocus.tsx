import { SearchResult } from "@/app/gallery/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderPlus } from "lucide-react";
import { useState } from "react";
import { AddImageToAlbum } from "./actions";
import { CloudinaryImage } from "../CloudinaryImage";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function ImageFocus(props: {
  imageData: SearchResult;
  albums: { name: string; path: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpenState) => {
        setOpen(newOpenState);
      }}
    >
      <DialogTrigger asChild>
        <button className="flex flex-row group">
          <MagnifyingGlassIcon className="size-6 text-slate-400 " />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-10">
        <CloudinaryImage
          key={props.imageData.public_id}
          imageData={props.imageData}
          width="400"
          height="300"
          sizes="100vw"
          alt="Description of my image"
          albums={props.albums}
        />
      </DialogContent>
    </Dialog>
  );
}
