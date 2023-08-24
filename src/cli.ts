import figlet from "figlet";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { configureSupabase, initSupabase } from "./supabase";

export type Args = {
  [x: string]: unknown,
  _: (string | number)[],
  number: number,
  prefix: string,
  project: string,
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
      alias: 'x',
      type: 'string',
      description: 'Port Prefix',
      default: '6',
    })
    .option('project', {
      alias: 'p',
      type: 'string',
      description: 'Project Name',
      default: ''
    })
    .parseSync();

  return args;
}

export const cli = (rawArgs: string[]) => {
  console.log(figlet.textSync('Supuabase'));
  const args = parseArguments(rawArgs)

  initSupabase(args);
  configureSupabase(args);
}
