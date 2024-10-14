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
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export function AddToAlbumDialog({
  image,
  onModalClose,
}: {
  image: SearchResult;
  onModalClose: () => void;
}) {
  const [albumName, setAlbumName] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpenState) => {
        setOpen(newOpenState);

        if (!newOpenState) {
          onModalClose();
        }
      }}
    >
      <DialogTrigger asChild>
        <button className="flex flex-row">
          <FolderPlus />
          <span>Add To Album</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to album</DialogTitle>
          <DialogDescription>Add image to a specific album</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="album-name" className="text-right">
              Album name
            </Label>
            <Input
              id="album-name"
              defaultValue={albumName}
              onChange={(e) => setAlbumName(e.currentTarget.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              setOpen(false);
              onModalClose();
              console.log(image);
              await AddImageToAlbum(image, albumName);
            }}
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
