import fs from 'fs';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
let range = [-1, -1];

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

// Pin PNG to IPFS
console.log('Pinning PNG to IPFS ...');
let commandPng = `ipfs add -r ./dist/png`;
const {stdoutPng, stderrPng} = await execPromise(commandPng);
let repoPng = stdoutPng.split('\n')[stdoutPng.split('\n').length - 2].split(' ')[1]
console.log('PNG Repo CID: ' + repoPng);

// add contractURI
const contractURI = {
  "name": "Bored ENS Yacht Club",
  "description": "BoredENSYachtClub.eth (BENSYC.ETH) is the first ENS 10k Subdomain Collection where the subdomain NFT is your membership to the Club.",
  "image": `https://ipfs.io/ipfs/${repoPNG}/0.png`,
  "external_link": "https://BoredENSYachtClub.eth.limo",
  "seller_fee_basis_points": 500,
  "fee_recipient": "0x5b420EE224881C250C0658fD277DA1aE646a814c"
};
fs.writeFile(`./dist/json/contractURI.json`, JSON.stringify(contractURI, null, 4), err => {
  if (err) {
    console.error(err);
  }
});

// Pin JSON to IPFS
console.log('Pinning JSON to IPFS ...');
let commandJson = `ipfs add -r ./dist/json`;
const {stdoutJson, stderrJson} = await execPromise(commandJson);
let repoJson = stdoutJson.split('\n')[stdoutJson.split('\n').length - 2].split(' ')[1]
console.log('JSON Repo CID: ' + repoJson);
