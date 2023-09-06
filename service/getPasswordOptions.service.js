import readline from 'node:readline/promises';
import process from 'node:process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const write = str => {
  process.stdout.write(str);
};

export const getPasswordOptions = async () => {
  const options = {};
  const length = parseInt(await rl.question('Длинна пароля: ')) || 8;
  if (isNaN(+length) || +length < 8) {
    write('Минимальная длинна пароля 8 символов\n');
    getPasswordOptions();
  } else {
    options.length = length;
  }

  write('Для включения опций нужно ответить Д(д) или Y(yes)\n');
  const uppercase =
    ((
      await rl.question('Включаем заглавные буквы? (y/n) [y]: ')
    ).toLowerCase() || 'y') === 'y';

  const number =
    ((await rl.question('Включаем цифры? (y/n) [y]: ')).toLowerCase() ||
      'y') === 'y';

  const special =
    ((await rl.question('Включаем спецсимволы? (y/n) [y]: ')).toLowerCase() ||
      'y') === 'y';

  return { length, uppercase, number, special };
};
