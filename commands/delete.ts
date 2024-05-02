import { getPasteRepository } from "@/lib/db";
import { Paste } from "@/lib/db/entity/Paste";
import { exit } from "process";
import c from "ansi-colors";
import { prompt } from "enquirer";
export default async function deletePaste(id: string, yes: boolean) {
  const repo = await getPasteRepository();
  let paste: Paste | null;
  paste = await repo.findOneBy({
    id: parseInt(id),
  });

  if (!paste) {
    console.log("No paste found");
    exit(1);
  }

  if (yes) {
    await repo.remove(paste as Paste);
    console.log(c.red("Paste deleted"));
    exit(0);
  } else {
    console.log(c.cyan(paste.title));
    console.log(paste.text);
    const response: { confirm: string } = await prompt({
      type: "input",
      name: "confirm",
      message: c.red("Are you sure you want to delete this paste? Y/N"),
    });

    if (response.confirm.toLocaleLowerCase().trim() === "y") {
      await repo.remove(paste as Paste);
      console.log(c.red("Paste deleted"));
    } else {
      console.log(c.green("Paste not deleted"));
    }
    exit(0);
  }
}
