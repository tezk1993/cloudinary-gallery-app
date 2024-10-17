"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchForm({
  initialSearch,
}: {
  initialSearch: string;
}) {
  const [searchParams, setSearchParams] = useState(initialSearch ?? "");

  const router = useRouter();

  useEffect(() => {
    setSearchParams(initialSearch);
  }, [initialSearch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.replace(`/gallery?search=${encodeURIComponent(searchParams)}`);
        router.refresh();
        setSearchParams("");
      }}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-6 items-center gap-4">
          <Input
            id="album-name"
            placeholder="Search by tags"
            defaultValue={initialSearch}
            onChange={(e) => setSearchParams(e.currentTarget.value)}
            className="col-span-5"
          />
          <Button type="submit">Search</Button>
        </div>
      </div>
    </form>
  );
}
