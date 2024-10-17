"use client";

import { ForceRefresh } from "@/components/force-refresh";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

export default function EditPage({
  searchParams: { publicID },
}: {
  searchParams: {
    publicID: string;
  };
}) {
  const [transformation, setTransformation] = useState<
    undefined | "generative-fill" | "blur" | "pixelate" | "grayscale"
  >();

  const [generativePrompt, setGenerativePrompt] = useState("");
  const [pendingPrompt, setPendingPrompt] = useState("");
  return (
    <section>
      <ForceRefresh />
      <div>
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">{`Edit - ${publicID}`}</h1>
        </div>
        <div className="m-2 gap-4 flex ">
          <Button onClick={() => setTransformation(undefined)}>
            Clear All
          </Button>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                setGenerativePrompt(pendingPrompt);
                setTransformation("generative-fill");
              }}
            >
              Generative Fill
            </Button>
            <Label htmlFor="prompt-input">Prompt</Label>
            <Input
              name="prompt-input"
              onChange={(e) => setPendingPrompt(e.target.value)}
              placeholder="Give a prompt"
            />
          </div>

          <Button onClick={() => setTransformation("blur")}>Blur</Button>
          <Button onClick={() => setTransformation("pixelate")}>
            pixelate
          </Button>
          <Button onClick={() => setTransformation("grayscale")}>
            grayscale
          </Button>
        </div>
        <div className="grid grid-cols-2">
          <CldImage
            src={publicID}
            width="400"
            height="300"
            sizes="100vw"
            alt="Description of my image"
          />

          {transformation === "generative-fill" && (
            <CldImage
              src={publicID}
              width="400"
              height="300"
              sizes="100vw"
              alt="Description of my image"
              crop={"pad"}
              fillBackground={{
                prompt: `${generativePrompt}`,
              }}
            />
          )}
          {transformation === "blur" && (
            <CldImage
              src={publicID}
              width="400"
              height="300"
              sizes="100vw"
              alt="Description of my image"
              blur="800"
            />
          )}
          {transformation === "grayscale" && (
            <CldImage
              src={publicID}
              width="400"
              height="300"
              sizes="100vw"
              alt="Description of my image"
              grayscale
            />
          )}
          {transformation === "pixelate" && (
            <CldImage
              src={publicID}
              width="400"
              height="300"
              sizes="100vw"
              alt="Description of my image"
              pixelate
            />
          )}
        </div>
      </div>
    </section>
  );
}
