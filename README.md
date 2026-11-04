# [ai-pavel.github.io](https://ai-pavel.github.io/)

Local-first browser tools — everyday, dev & crypto. Nothing leaves your device.

## Toolboxes

<!-- toolboxes:start -->
| Toolbox | What's inside | Tools | Folder |
|---|---|---|---|
| [🪄 Utilities](https://ai-pavel.github.io/utilities/) | Everyday utilities: time, text, files and media | 20 | [`utilities/`](utilities/) |
| [🧑‍💻 Developer](https://ai-pavel.github.io/dev/) | Developer utilities: JSON, encoding, tokens, regex, diffs, bits and bytes | 0 of 25 ready | [`dev/`](dev/) |
| [🪙 Bitcoin](https://ai-pavel.github.io/bitcoin/) | Bitcoin: blocks, transactions, keys, addresses, HD wallets and signatures | 0 of 32 ready | [`bitcoin/`](bitcoin/) |
| [💠 EVM](https://ai-pavel.github.io/evm/) | Ethereum and EVM: units, addresses, ABI, transactions and signatures | 15 | [`evm/`](evm/) |
| [🌞 Solana](https://ai-pavel.github.io/solana/) | Solana: keys, addresses, PDAs, token accounts, transactions and signatures | 12 | [`solana/`](solana/) |
| [💎 TON](https://ai-pavel.github.io/ton/) | TON: addresses, wallets, cells, messages and signatures | 10 | [`ton/`](ton/) |
| [🔵 Cardano](https://ai-pavel.github.io/cardano/) | Cardano: addresses, stake keys, native assets, CBOR transactions and signatures | 0 of 10 ready | [`cardano/`](cardano/) |
| [💧 Sui](https://ai-pavel.github.io/sui/) | Sui: addresses, keys, BCS, transactions, object IDs and signatures | 0 of 10 ready | [`sui/`](sui/) |
| [⚛️ Cosmos](https://ai-pavel.github.io/cosmos/) | Cosmos SDK chains: addresses across chains, IBC, keys, transactions and signatures | 0 of 11 ready | [`cosmos/`](cosmos/) |
| [🟣 Polkadot](https://ai-pavel.github.io/polkadot/) | Polkadot and Substrate chains: SS58 addresses, SCALE, storage keys, keys and signatures | 0 of 12 ready | [`polkadot/`](polkadot/) |
<!-- toolboxes:end -->

Everything runs client-side in the browser: files and keys never leave the device.
The site is an installable app (PWA) and works offline once it has been opened.

## Structure

- Each tool is a self-contained page at `<toolbox>/<tool>/index.html`.
- All pages share `assets/style.css`.
- The list of toolboxes and tools lives in `assets/tools.json`. After changing it (or finishing a tool page), run `python3 scripts/generate.py` to rebuild the home page, toolbox pages, search index and the table above. New tools get a placeholder page.
- Third-party libraries are vendored in `assets/vendor/` (see `assets/vendor/VENDOR.md`). To add or upgrade one, edit the list in `scripts/vendor.py` and run `python3 scripts/vendor.py`; it downloads the files and points pages at the local copies.
- `sw.js` is the service worker. It is generated from `scripts/sw.template.js` by `generate.py`, which precaches every site file and bumps the cache version whenever a file changes. Heavy assets loaded on demand (the ffmpeg core, the OCR engine and its language data) are cached on first use.
- There is no build step on deploy: push to `master` and GitHub Pages serves the files as-is.
