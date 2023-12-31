import { execSync } from "child_process";
import { Args } from "./cli";
import { readFileSync, writeFileSync } from "fs-extra";

export const initSupabase = (args: Args) => {
  console.log('Cloning repository...');

  execSync('git clone --depth 1 https://github.com/supabase/supabase');
  execSync('cd supabase/docker');
  execSync('cp supabase/docker/.env.example supabase/docker/.env');

  console.log('Cloning repository... done');
}

export const configureSupabase = (args: Args) => {
  console.log('Updateing config files...');

  const composer = readFileSync('supabase/docker/docker-compose.yml')
    .toString()
    .replace(new RegExp('container_name: ', 'g'), `container_name: ${args.project}-`)
    .replace(/(\d{4,})/g, match => (Number(args.prefix + match) + args.number * 10).toString());
  writeFileSync('supabase/docker/docker-compose.yml', composer);

  const env = readFileSync('supabase/docker/.env')
    .toString()
    .replace(/(\d{4,})/g, match => (Number(args.prefix + match) + args.number * 10).toString());
  writeFileSync('supabase/docker/.env', env);

  const vector = readFileSync('supabase/docker/volumes/logs/vector.yml')
    .toString()
    .replace(/(\d{4,})/g, match => (Number(args.prefix + match) + args.number * 10).toString());
  writeFileSync('supabase/docker/volumes/logs/vector.yml', vector);

  console.log('Updateing config files... done');
}

export const fixSupabase = (args: Args) => {
  console.log('Fixing Docker compose...');

  const composer = readFileSync('supabase/docker/docker-compose.yml')
    .toString()
    .replace(new RegExp(': true', 'g'), ': 1');
  writeFileSync('supabase/docker/docker-compose.yml', composer);

  console.log('Fixing Docker compose... done');
}
