"use client";

import { Button } from "@/components/ui/button";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

export default function Gallery() {
  const [currentImageID, setCurrentImageID] = useState("aqxrepikyjlt6hvrqqpc");

  return (
    <section>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <Button asChild>
          <CldUploadButton
            className="font-bold flex gap-2 group"
            onSuccess={(result: CloudinaryUploadWidgetResults) => {
              if (result.info && typeof result.info !== "string") {
                console.log(result.info.public_id);
                setCurrentImageID(result.info.public_id);
              }
            }}
            uploadPreset="yzohvumf"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 group-hover:stroke-blue-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
              />
            </svg>
            Upload
          </CldUploadButton>
        </Button>
      </div>

      {currentImageID && (
        <CldImage
          width="960"
          height="600"
          src={currentImageID}
          sizes="100vw"
          alt="Description of my image"
        />
      )}
    </section>
  );
}
