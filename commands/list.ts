import { getPasteRepository } from "@/lib/db";
import { exit } from "process";

export default async function list() {
  const repo = await getPasteRepository();
  const allPastes = await repo.find();
  console.log("All pastes from the db: ", allPastes);
  exit(0);
}
