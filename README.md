# A squid that saves USDC Transfers to JSONL files

This tiny blockchain indexer scrapes `Transfer` events emitted by the [USDC contract](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48) and saves the data in a file-based dataset in a local folder `./data`. It is built with the [Subsquid framework](https://subsquid.io), hence the term "squid".

The squid uses [`@subsquid/file-store`](https://docs.subsquid.io/basics/store/file-store/) and [`@subsquid/file-store-json`](https://docs.subsquid.io/basics/store/file-store/csv-table/) packages to store the dataset. It outputs its data in the [JSONL](https://jsonlines.org) format instead of the plain JSON array used by default.

Dependencies: NodeJS, [Squid CLI](https://docs.subsquid.io/squid-cli).

To see it in action, spin up a *processor*, a process that ingests the data from the Ethereum Archive:

```bash
$ git clone https://github.com/subsquid-labs/file-store-json-example
$ cd file-store-json-example/
$ npm i
$ sqd process
```
You should see a `./data` folder populated with indexer data appear in a bit:
```bash
$ tree ./data/
./data/
├── 0000000000-0007242369
│   └── transfers.jsonl
├── 0007242370-0007638609
│   └── transfers.jsonl
...
└── status.txt
```
