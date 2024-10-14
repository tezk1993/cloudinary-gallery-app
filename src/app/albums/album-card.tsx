import { ForceRefresh } from "@/components/force-refresh";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
export interface AlbumCardData {
  name: string;
}
export default async function AlbumCard(albumData: AlbumCardData) {
  return (
    <Card>
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
