import process from 'node:process';
import { argsParse } from './util/argsParse.js';
import { generatePassword } from './service/generatePassword.service.js';
import { getSetting, saveSetting } from './service/setting.service.js';
import { getPasswordOptions } from './service/getPasswordOptions.service.js';

const app = async () => {
  const args = argsParse(process.argv, ['ask', 'setting']);

  if (args.h || args.help) {
    console.log(`
    -h --help       | список команд (игнор других команд)
    -l --length     | длина пароля
    -u --uppercase  | включить заглавные буквы
    -n --number     | включить числа
    -s --special    | включить спецсимволы
    -a --ask        | провести опрос (игнор других команд)
    setting        | сохраняет настройки -l -u -n -s
    `);
    process.exit();
  }

  if (args.a || args.ask) {
    console.log('Ответьте на вопросы:');
    const option = await getPasswordOptions();
    const password = generatePassword(option);
    process.stdout.write(`Пароль: '${password}'\n`);
    process.exit();
    // return;
  }

  const option = {
    length: 8,
    uppercase: false,
    number: false,
    special: false,
  };

  if (!args.setting) {
    const setting = await getSetting();
    Object.assign(option, setting);
  }

  if (args.l || args.length) {
    // console.log(`Длина: ${args.l || args.length}`);
    option.length = args.l || args.length;
  }
  if (args.u || args.uppercase) {
    // console.log('Строчные буквы');
    option.uppercase = args.u || args.uppercase;
  }
  if (args.n || args.number) {
    // console.log('Цифры');
    option.number = args.n || args.number;
  }
  if (args.s || args.special) {
    // console.log('Спецсимволы');
    option.special = args.s || args.special;
  }
  if (args.setting) {
    await saveSetting(option);
    process.exit();
  }

  const password = generatePassword(option);
  process.stdout.write(`Пароль: '${password}'\n`);
  process.exit();
};

app();
