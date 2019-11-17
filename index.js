const fs = require('fs');

const fetch = require('node-fetch');
const sjcl = require('sjcl');
const yargs = require('yargs');

const MONOD_URL = 'https://monod.lelab.tailordev.fr';

const decrypt = (content, secret) => {
  let decryptedContent;

  try {
    decryptedContent = sjcl.decrypt(secret, content);
  } catch (e) {
    return null;
  }

  return decryptedContent;
}

const main = () => {
  const argv = yargs.options({
    'stdout': {
      description: 'output document(s) to the standard output',
      type: 'boolean'
    }
  }).argv;

  const stdout = !!argv.stdout;
  const urls = argv._.filter((url) => url.startsWith(MONOD_URL));

  if (urls.length === 0) {
    console.error('monod-cli: no urls to backup, exiting...');
    process.exit(1);
  }

  urls.forEach(async (url) => {
    const [uuid, secret] = url.replace(`${MONOD_URL}/`, '').split('#');

    try {
      const response = await fetch(`${MONOD_URL}/documents/${uuid}`);
      const document = await response.json();

      const content = decrypt(document.content, secret);

      if (stdout) {
        console.log(content);
      } else {
        const filename = `monod-${uuid}.md`;

        await fs.promises.writeFile(filename, content);

        console.log(`[+] ${filename}`);
      }
    } catch (e) {
      console.error(`monod-cli: could not backup document at "${url}".`);
      console.error(`monod-cli: ${e.message}`);
    }
  });
};

module.exports = { main };
