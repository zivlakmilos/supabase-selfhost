import figlet from "figlet";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export type Args = {
  [x: string]: unknown,
  _: string[],
  number: number,
  prefix: string,
}

const parseArguments = (rawArgs: string[]) => {
  const args = yargs(hideBin(rawArgs))
    .usage('Usage: sonata <command> [options]').alias('h', 'help')
    .version().alias('v', 'version')
    .epilog(`Copyright (c) 2023 - ${new Date().getFullYear()} Milos Zivlak`)
    .option('number', {
      alias: 'i',
      type: 'number',
      description: 'Instance number',
      default: 0,
    })
    .option('prefix', {
      alias: 'p',
      type: 'string',
      description: 'Port Prefix',
      default: "6",
    })
    .parseSync();

  return args;
}

export const cli = (rawArgs: string[]) => {
  console.log(figlet.textSync('Supuabase'));
  const args = parseArguments(rawArgs)

  console.log(args);
}
