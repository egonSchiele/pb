import { getPasteRepository } from "@/lib/db";
import { exit } from "process";

export default async function show(ids: string) {
  const repo = await getPasteRepository();
  const paste = await repo.findOneBy({
    id: parseInt(ids),
  });
  if (!paste) {
    console.log("No paste found");
    exit(1);
  }
  console.log(paste.title);
  console.log(paste.text);
  exit(0);
}
