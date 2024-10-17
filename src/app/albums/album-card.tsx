import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
export interface AlbumCardData {
  name: string;
}
export default async function AlbumCard(albumData: AlbumCardData) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{albumData.name}</CardTitle>
        <CardDescription>Photo Count</CardDescription>
        <CardDescription>Photo Tags </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href={`/albums/${albumData.name}`}>View Album</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
