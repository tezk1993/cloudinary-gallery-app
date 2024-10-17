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
import { CheckIcon, FolderPlus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AddImageToAlbum } from "./actions";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";

export function AddToAlbumDialog({
  image,
  onModalClose,
  albums,
}: {
  image: SearchResult;
  onModalClose: () => void;
  albums: { name: string; path: string }[];
}) {
  const [albumName, setAlbumName] = useState("");
  const [selection, setSelection] = useState("");

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
        <button className="flex flex-row group border-b border-solid hover:border-white border-transparent pb-1">
          <FolderPlus className="group-hover:text-yellow-400" />
          <span className="ml-1 text-md mt-auto leading-none">
            Add To Album
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to album</DialogTitle>
          <DialogDescription>Add image to a specific album</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <ComboboxDemo albums={albums} SetAlbumChoice={setSelection} />
            {selection === "New Album" ? (
              <div>
                <Label htmlFor="album-name" className="text-right">
                  Album name
                </Label>
                <Input
                  id="album-name"
                  defaultValue={albumName}
                  onChange={(e) => setAlbumName(e.currentTarget.value)}
                  className="col-span-3"
                  placeholder="Album name"
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={async () => {
              setOpen(false);
              onModalClose();
              if (selection !== "New Album") {
                setAlbumName(selection);
              }
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

function ComboboxDemo({
  albums,
  SetAlbumChoice,
}: {
  albums: { name: string; path: string }[];
  SetAlbumChoice: Dispatch<SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : "Select Album..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search albums..." className="h-9" />
          <CommandList>
            <CommandEmpty>No album</CommandEmpty>
            <CommandGroup>
              {albums.map((album) => (
                <CommandItem
                  key={album.path}
                  value={album.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    SetAlbumChoice(album.name);
                    setOpen(false);
                  }}
                >
                  {album.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === album.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
              <CommandItem
                key="New Album"
                value="New Album"
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  SetAlbumChoice("New Album");
                  setOpen(false);
                }}
              >
                New Album
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === "New Album" ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
