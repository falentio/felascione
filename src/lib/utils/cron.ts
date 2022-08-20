import { readable, derived } from "svelte/store";

export const now = readable(new Date(), (set) => {
	const id = setInterval(() => set(new Date()), 1000);
	return () => clearInterval(id);
});

export const seconds = derived(
	now,
	($now, set) => {
		set($now.getSeconds());
	},
	0
);

export const minutes = derived(
	now,
	($now, set) => {
		set($now.getMinutes());
	},
	0
);

export const hours = derived(
	now,
	($now, set) => {
		set($now.getHours());
	},
	0
);

export const days = derived(
	now,
	($now, set) => {
		set($now.getDate());
	},
	0
);
