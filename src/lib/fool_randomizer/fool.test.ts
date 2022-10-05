import { FoolRandomizer, XorshiftRng } from "."
import { test, assert } from "vitest"

test("FoolRandomizer", () => {
	const rng = new XorshiftRng("fasjasdd")
	const fool = new FoolRandomizer<{
		presenceNumber: number
		name: string
		gender: string
	}>(rng)
	const add = (presenceNumber: number, name: string, gender: string) => fool.addItem({ presenceNumber, name, gender })
	add(1, "Abelia", "female");
	add(2, "Adinda", "female");
	add(3, "Afandi", "male");
	add(4, "Agnes", "female");
	add(5, "Alfiko", "male");
	add(6, "Alya", "female");
	add(7, "Anastasia", "female");
	add(8, "Angda", "male");
	add(9, "Angga", "male");
	add(10, "Arzydhan", "male");
	add(11, "Aulinisa", "female");
	add(12, "Ayuhana", "female");
	add(13, "Dava", "male");
	add(14, "Elang", "male");
	add(15, "Eva", "female");
	add(16, "Gilang", "male");
	add(17, "Jovita", "female");
	add(18, "Kaka", "male");
	add(19, "Karoline", "female");
	add(20, "Marisa", "female");
	add(21, "Marista", "female");
	add(22, "Mike", "female");
	add(23, "Nadia", "female");
	add(24, "Nayla", "female");
	add(25, "Ni Putu", "female");
	add(26, "Riska", "female");
	add(27, "Rivaldi", "male");
	add(28, "Sindi", "female");
	add(29, "Tjokorda", "female");
	add(30, "Wanda", "female");

	// fool.createConflict((i) => ["Abelia", "Rivaldi", "Gilang", "Alfiko"].includes(i.name))
	// fool.createChain((i) => ["Nadia", "Gilang", "Riska", "Sindi", "Dava"].includes(i.name))
	for (let i = 0; i < 1; i++) {
		for (const team of fool.split(2)) {
			console.log(team)
		}
	}
})
