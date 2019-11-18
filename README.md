# monod-cli

A simple CLI to backup your [monod](https://github.com/TailorDev/monod)
documents.

## Usage

:warning: You need Node 10+ and `npm` 5.2+ but you do not necessarily need to
clone or install this project. Instead you can use `npx`, which is bundled with
`npm`.

Run the following command with one or more "monod URLs" you want to backup:

```
npx https://github.com/TailorDev/monod-cli <your monod url(s) here>
```

### Options

- `--stdout`: output the content of the monod document(s) to `stdout`

### Examples

Backup one document:

```
npx https://github.com/TailorDev/monod-cli <url>
npx https://github.com/TailorDev/monod-cli --stdout <url>
```

Backup multiple documents:

```
npx https://github.com/TailorDev/monod-cli --stdout <url 1> <url 2>
```

Backup a list of documents stored in a file (one URL per line):

```
cat list-of-urls.txt | xargs npx https://github.com/TailorDev/monod-cli
cat list-of-urls.txt | xargs npx https://github.com/TailorDev/monod-cli --stdout
```

Automatically backup all the monod documents you visited in Firefox by reading
[`places.sqlite`](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/Places/Database),
which you can find in your profile folder (see `about:profiles` to know where
your profile folder is located):

```
sqlite3 places.sqlite "select distinct url from moz_places where url LIKE 'https://monod.lelab.tailordev.fr/%#%'" | xargs npx https://github.com/TailorDev/monod-cli
```

## License

monod-cli is released under the MIT License. See the bundled
[LICENSE](LICENSE.md) file for details.
