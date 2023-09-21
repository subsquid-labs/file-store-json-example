import * as erc20abi from './abi/erc20'
import {Database, LocalDest} from '@subsquid/file-store'
import {Table} from '@subsquid/file-store-json'

import {processor, USDC_CONTRACT} from './processor'

const dbOptions = {
	tables: {
		TransfersTable: new Table<{
			from: string,
			to: string,
			value: bigint
		}>('transfers.jsonl', { lines: true })
	},
	dest: new LocalDest('./data'),
	chunkSizeMb: 10,
	// Explicitly keeping the default value of syncIntervalBlocks (infinity).
	// Make sure to use a finite value here if your output data rate is low!
	// More details here:
	// https://docs.subsquid.io/store/file-store/overview/#filesystem-syncs-and-dataset-partitioning
	syncIntervalBlocks: undefined
}

processor.run(new Database(dbOptions), async (ctx) => {
	for (let block of ctx.blocks) {
		for (let log of block.logs) {
			if (log.address===USDC_CONTRACT && log.topics[0]===erc20abi.events.Transfer.topic) {
				let { from, to, value } = erc20abi.events.Transfer.decode(log)
				ctx.store.TransfersTable.write({ from, to, value })
			}
		}
	}
})
