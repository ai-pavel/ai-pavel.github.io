# ai-pavel.github.io

Personal GitHub Pages site: https://ai-pavel.github.io/

## Toolboxes

<!-- toolboxes:start -->
| Toolbox | What's inside | Tools | Folder |
|---|---|---|---|
| [🧰 Toolbox](https://ai-pavel.github.io/toolbox/) | Everyday utilities: time, text, files and media | 23 | [`toolbox/`](toolbox/) |
| [🔑 Crypto Toolbox](https://ai-pavel.github.io/crypto/) | Bitcoin and cryptography: hashes, keys, addresses, transactions and signatures | 0 of 38 ready | [`crypto/`](crypto/) |
| [🛠️ Dev Toolbox](https://ai-pavel.github.io/dev/) | Developer utilities: JSON, encoding, tokens, regex, diffs and time | 0 of 18 ready | [`dev/`](dev/) |
| [⛓️ EVM Toolbox](https://ai-pavel.github.io/evm/) | Ethereum and EVM: units, addresses, ABI, transactions and signatures | 0 of 15 ready | [`evm/`](evm/) |
<!-- toolboxes:end -->

Everything runs client-side in the browser: files and keys never leave the device.

## Structure

- Each tool is a self-contained page at `<toolbox>/<tool>/index.html`.
- All pages share `assets/style.css`.
- The list of toolboxes and tools lives in `assets/tools.json`. After changing it (or finishing a tool page), run `python3 scripts/generate.py` to rebuild the home page, toolbox pages, search index and the table above. New tools get a placeholder page.
- There is no build step on deploy: push to `master` and GitHub Pages serves the files as-is.
