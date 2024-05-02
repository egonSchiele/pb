import { getPasteRepository } from "@/lib/db";
import { log } from "@/lib/utils";
import { exit } from "process";
import Table from "easy-table";
import c from "ansi-colors";
import { Paste } from "@/lib/db/entity/Paste";
export default async function list(all: boolean) {
  const repo = await getPasteRepository();

  const allPastes = await repo.find();
  if (all) {
    printLong(allPastes);
  } else {
    printShort(allPastes);
  }
  exit(0);
}

function printShort(pastes: Paste[]) {
  var t = new Table();

  pastes.forEach((paste) => {
    t.cell(c.cyan("id"), paste.id);
    t.cell(c.cyan("title"), paste.title);
    t.newRow();
  });
  console.log(t.toString());
}

function printLong(pastes: Paste[]) {
  pastes.forEach((paste) => {
    console.log(c.cyan(`${paste.id}`), c.yellow(`${paste.title}`));
    console.log(paste.text);
    console.log();
  });
}
