export abstract class Rng {
	constructor(seed: string)
	setSeed(seed: string)
	next(): number
}

export class XorshiftRng {
	static uint16 = 2 ** 16
	static xorshift(n: number) {
		n ^= n << 13;
		n ^= n >>> 17;
		n ^= n << 5;
		return n
	}

	state: number
	constructor(seed: string) {
		this.setSeed(seed)
	}

	setSeed(seed: string) {
		this.state = seed.length ** 4
		for (const s of seed) {
			const c = s.charCodeAt(0)
			this.state += c ** 4
			this.next()
		}
	}

	next() {
		const n = this.state = XorshiftRng.xorshift(this.state)
		return (n >>> 0) / (-1 >>> 0)
	}
}

export interface FoolItem<T> {
	data: T
	chain: null | string
}

export class FoolRandomizer<T> {
	private counter = 1
	items: FoolItem<T>[]
	rng: Rng
	constructor(rng: Rng) {
		this.items = []
		this.rng = rng
	}

	getItems() {
		return this.items.map(i => i.data)
	}

	addItem(data: T) {
		this.items.push({
			data,
			chain: null,
			conflict: null,
		})
	}

	createChain(picker: (d: T) => boolean): string {
		const id = ++this.counter
		for (const item of this.items) {
			if (!picker(item.data)) {
				continue
			}
			item.chain = id
		}
		return id
	}

	clearChain() {
		for (const item of this.items) {
			item.chain = null
		}
	}

	createConflict(picker: (d: T) => boolean): string {
		const id = ++this.counter
		for (const item of this.items) {
			if (!picker(item.data)) {
				continue
			}
			item.conflict = id
		}
		return id
	}

	clearConflict() {
		for (const item of this.items) {
			item.conflict = null
		}
	}

	split(
		n: number, 
	): T[][] {
		const result = [] as T[]
		let items = this.items.slice()
		const len = items.length

		let mostLongChain = 0
		for (const item of items) {
			if (!item.chain) {
				continue
			}
			const len = items.filter(i => i.chain === item.chain).length
			if (mostLongChain < len) {
				mostLongChain = len
			}
		}
		for (let i = 0; i < n; i++) {
			const current = []
			const targetLength = spreads(len, n, i)
			if (mostLongChain > targetLength) {
				throw new Error("chain too long")
			}
			let tryCount = 0
			while (current.length < targetLength) {
				if (tryCount++ > len) {
					return this.split(n)
				}
				if (!items.length) {
					throw new Error("invalid")
				}
				items.sort(() => this.rng.next() - 0.5)
				const gender = current.filter(i => i.data.gender === "male").length >= spreads(10, n, i) ? "female" : "male"
				const item = items.find(i => i.data.gender === gender) || items[0]
				const conflict = new Set()
				const candidates = items.filter(i => {
					if (i.conflict) {
						if (i.conflict === item.conflict && i !== item) {
							return false
						}
						for (const { conflict } of current) {
							if (conflict && conflict === i.conflict) {
								return false
							}
						}
					}
					if (item === i) {
						return true
					}
					if (item.chain) {
						return item.chain === i.chain
					}
					return false
				})
				if (candidates.length + current.length > targetLength) {
					continue
				}
				items = items.filter(i => !candidates.includes(i))
				current.push(...candidates)
			}
			result.push(current.map(i => i.data))
		}
		return result
	}
}

const spreads = (total: number, to: number, i: number) => {
	let targetLength = total / to | 0
	if (i < (total % to)) {
		targetLength++
	}
	return targetLength
}
