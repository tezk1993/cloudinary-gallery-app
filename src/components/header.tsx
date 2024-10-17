import logo from "../assets/SnapStash_logo.png";
import Image from "next/image";
import UploadButton from "@/app/gallery/upload-button";

export default function Header() {
  return (
    <div className="flex h-16 items-center px-12 py-12  mx-auto">
      <Image src={logo} alt="Logo" className="size-10" />

      <h1 className="text-4xl font-bold "> SnapStash</h1>

      <div className="ml-auto flex items-center space-x-4">
        <UploadButton />

        {/* <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>{" "} */}
      </div>
    </div>
  );
}
