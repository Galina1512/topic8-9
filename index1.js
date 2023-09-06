#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
console.log('args: ', args);
console.log('Привет,', args[0]);

const filePath = path.join(os.homedir(), 'setting.genpass.json');
console.log('filePath: ', filePath);

export const saveSetting = async option => {
  await writeFile(filePath, JSON.stringify(option), 'utf-8');
};

console.log(path.sep);
console.log(path.basename(filePath));
console.log(path.dirname(filePath));
console.log(path.extname(filePath));

console.log(os.arch());
console.log(os.machine());
console.log(os.platform());
console.log(os.type());
console.log(os.version());
console.log(os.release());
console.log();
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.uptime());
console.log();
console.log(os.hostname());
console.log(os.userInfo());
console.log(os.tmpdir());
console.log(os.homedir());
