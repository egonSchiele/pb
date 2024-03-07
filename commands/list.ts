import { getPasteRepository } from "@/lib/db";
import { exit } from "process";

export default async function list() {
  const repo = await getPasteRepository();
  const allPastes = await repo
    .createQueryBuilder("paste")
    .select(["id", "title"])
    .orderBy("id", "DESC")
    .getRawMany();
  allPastes.forEach((paste) => {
    console.log(`${paste.id} | ${paste.title}`);
  });
  exit(0);
}
