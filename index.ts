#!/usr/bin/env node
import { Command } from "commander";
import add from "./commands/add";
import list from "./commands/list";
import show from "./commands/show";
import init from "./commands/init";
import config from "./commands/config";
import { log } from "@/lib/utils";
import deletePaste from "./commands/delete";

const program = new Command();

program.name("pb").description("Global pasteboard CLI").version("0.0.1");

program
  .command("add")
  .alias("a")
  .description("Add file to pasteboard")
  .argument("<filepath>", "file to add")
  .action((filepath) => {
    add(filepath);
  });

program
  .command("list")
  .alias("l")
  .option("-a, --all", "list full content of all files")

  .description("List files in pasteboard")
  .action((options: { all?: boolean }) => {
    list(options.all || false);
  });

program
  .command("show")
  .alias("s")
  .description("Show one or more pastes")
  .argument("[id]", "paste id")
  .action((id) => {
    show(id);
  });

program
  .command("delete")
  .alias("d")
  .option("-y, --yes", "skip confirmation")
  .description("Delete a paste")
  .argument("[id]", "paste id")
  .action((id, options: { yes?: boolean }) => {
    deletePaste(id, options.yes || false);
  });

program
  .command("init")
  .description("initialize config")
  .action(() => {
    init();
  });

program
  .command("config")
  .description("configalize config (print current config)")
  .action(() => {
    config();
  });

program.parse();
