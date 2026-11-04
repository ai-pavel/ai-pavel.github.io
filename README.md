# ai-pavel.github.io

Personal GitHub Pages site: https://ai-pavel.github.io/

## Toolboxes

<!-- toolboxes:start -->
| Toolbox | What's inside | Tools | Folder |
|---|---|---|---|
| [🧰 Toolbox](https://ai-pavel.github.io/toolbox/) | Everyday utilities: time, text, files and media | 23 | [`toolbox/`](toolbox/) |
| [🛠️ Dev Toolbox](https://ai-pavel.github.io/dev/) | Developer utilities: JSON, encoding, tokens, regex, diffs, bits and bytes | 0 of 23 ready | [`dev/`](dev/) |
| [🪙 Bitcoin Toolbox](https://ai-pavel.github.io/bitcoin/) | Bitcoin: blocks, transactions, keys, addresses, HD wallets and signatures | 0 of 32 ready | [`bitcoin/`](bitcoin/) |
| [⛓️ EVM Toolbox](https://ai-pavel.github.io/evm/) | Ethereum and EVM: units, addresses, ABI, transactions and signatures | 0 of 15 ready | [`evm/`](evm/) |
| [☀️ Solana Toolbox](https://ai-pavel.github.io/solana/) | Solana: keys, addresses, PDAs, token accounts, transactions and signatures | 0 of 12 ready | [`solana/`](solana/) |
| [💎 TON Toolbox](https://ai-pavel.github.io/ton/) | TON: addresses, wallets, cells, messages and signatures | 0 of 10 ready | [`ton/`](ton/) |
<!-- toolboxes:end -->

Everything runs client-side in the browser: files and keys never leave the device.

## Structure

- Each tool is a self-contained page at `<toolbox>/<tool>/index.html`.
- All pages share `assets/style.css`.
- The list of toolboxes and tools lives in `assets/tools.json`. After changing it (or finishing a tool page), run `python3 scripts/generate.py` to rebuild the home page, toolbox pages, search index and the table above. New tools get a placeholder page.
- There is no build step on deploy: push to `master` and GitHub Pages serves the files as-is.
