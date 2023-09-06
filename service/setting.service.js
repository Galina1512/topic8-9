import { readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const filePath = path.join(os.homedir(), 'setting.genpass.json');
console.log('filePath: ', filePath);

// console.log(path.sep);
// console.log(path.basename(filePath));
// console.log(path.dirname(filePath));
// console.log(path.extname(filePath));

// console.log(os.arch());
// console.log(os.machine());
// console.log(os.platform());
// console.log(os.type());
// console.log(os.version());
// console.log(os.release());
// console.log();
// console.log(os.totalmem());
// console.log(os.freemem());
// console.log(os.uptime());
// console.log();
// console.log(os.hostname());
// console.log(os.userInfo());
// console.log(os.tmpdir());
// console.log(os.homedir());

export const saveSetting = async option => {
  await writeFile(filePath, JSON.stringify(option), 'utf-8');
};

export const getSetting = async () => {
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    process.stdout.write(`
      Отсутствует или недоступен файл настроек.
      Для сохранения настроек используйте команду setting.\n
    `);
  }
};
