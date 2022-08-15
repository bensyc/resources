import fs from 'fs';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
let range = [0, 99];

for (var subdomain = range[0]; subdomain < range[1] + 1; subdomain++) {
  let command = `bash ./src/generator.sh ${subdomain}`;
  try {
    const {stdout, stderr} = await execPromise(command);
    console.log(`Subdomain ${subdomain}.bensyc.eth : ` + stdout);
    const content = {
      "name": `${subdomain}.BoredENSYachtClub.eth`,
      "description": `Bored ENS Yacht Club member`,
      "external_url": `https://${subdomain}.boredensyachtclub.eth.limo`,
      "image": `https://ipfs.io/ipfs/${stdout.split(' ')[0]}`,
      "attributes": [
        {
          "value": `${stdout.split(' ')[1]}`
        },
      ]
    };
    fs.writeFile(`./dist/json/${subdomain}.json`, JSON.stringify(content, null, 4), err => {
      if (err) {
        console.error(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
