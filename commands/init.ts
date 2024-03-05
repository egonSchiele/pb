import { Config } from "@/lib/types";
import { setConfig } from "@/lib/utils";
import { prompt } from "enquirer";
export default async function init() {
  const responses: Config = await prompt([
    {
      type: "input",
      name: "host",
      message: "Database host?",
    },
    {
      type: "input",
      name: "port",
      message: "Database port?",
    },
    {
      type: "input",
      name: "username",
      message: "Database username?",
    },
    {
      type: "password",
      name: "password",
      message: "Database password?",
    },
  ]);

  setConfig(responses);
}
