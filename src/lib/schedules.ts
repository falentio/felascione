import { parse } from "date-fns";

export interface Subject {
	// previous subject will used if empty
	subject?: string;
	// previous teacher will used if empty
	teacher?: string | null;
	// format HH:MM
	from: string;
	// format HH:MM
	// optional, next schedule `from` value will be assigned if empty
	to?: string;
}

export type SchedulesDefinition = {
	day: number;
	subjects: Subject[];
}[];

export function resolveSubjects(s: Subject[]): Required<Subject>[] {
	const subjects = s.map((curr, n, a) => {
		const prev = a[n - 1];
		const next = a[n + 1];
		return {
			subject: curr.subject ?? prev.subject,
			teacher: curr.teacher ?? (curr.teacher === null ? null : prev.teacher),
			to: curr.to ?? next.from,
			from: curr.from
		};
	});
	subjects.sort((a, b) => {
		const aFrom = parse(a.from, "HH:mm", new Date()).getTime();
		const bFrom = parse(b.from, "HH:mm", new Date()).getTime();
		return aFrom - bFrom;
	});
	return subjects as Required<Subject>[];
}
