import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

export default async function password() {
  const rl = readline.createInterface({ input, output });

  let chances = 3;
  while (chances > 0) {
    const entered = await rl.question("Enter password : ");

    const now = new Date();
    const currentTime1 = `${now.getHours() < 10 ? "0" : ""}${now.getHours()}${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;
    const currentTime2 = `${now.getHours()}${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;

    if (entered === currentTime1 || entered === currentTime2) {
      rl.close();
      return true;
    }

    chances--;
    console.log(`❌ Wrong password. Chances left: ${chances}\n`);
  }

  rl.close();
  process.exit(1); // Exit if all attempts fail
}
