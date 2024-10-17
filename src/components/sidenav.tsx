import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Album, ArchiveIcon, GalleryVertical, HeartIcon } from "lucide-react";

export default async function Sidenav() {
  return (
    <div className="pb-12 w-1/5">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Manage
          </h2>
          <div className="space-y-1">
            <Button
              variant="secondary"
              className="w-full justify-start flex gap-2"
              asChild
            >
              <Link href="/gallery">
                <GalleryVertical />
                Gallery
              </Link>
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start flex gap-2"
              asChild
            >
              <Link href="/albums">
                <Album />
                Albums
              </Link>
            </Button>

            <Button
              variant="secondary"
              className="w-full justify-start flex gap-2"
              asChild
            >
              <Link href="/favorites">
                <HeartIcon />
                Favorites
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
