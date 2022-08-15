import fs from 'fs';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
let range = [0, 3];

for (var subdomain = range[0]; subdomain < range[1] + 1; subdomain++) {
  let command = `bash ./src/generator.sh ${subdomain}`;
  try {
    const {stdout, stderr} = await execPromise(command);
    console.log(`CID ${subdomain}.bensyc.eth avatar (${subdomain}.png): ` + stdout);
    const content = {
      "name": `${subdomain}.BoredENSYachtClub.eth`,
      "description": `Bored ENS Yacht Club member`,
      "external_url": `https://${subdomain}.boredensyachtclub.eth.limo`,
      "image": `ipfs://${stdout.split(' ')[0]}`,
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


console.log('Pinning to IPFS ...');
let command = `ipfs add -r ./dist/json`;
const {stdout, stderr} = await execPromise(command);
let repo = stdout.split('\n')[stdout.split('\n').length - 2].split(' ')[1]
console.log('JSON Repo CID: ' + repo);
