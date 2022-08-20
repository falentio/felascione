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
	current?: boolean;
}

export type SchedulesDefinition = {
	day: number;
	subjects: Subject[];
}[];

export class Schedules {
	schedules: SchedulesDefinition;
	date: Date = new Date();
	constructor(schedules: SchedulesDefinition) {
		this.schedules = schedules;
	}

	setDate(date: string) {
		this.date = parse(date, "d HH:mm", new Date())
	}

	isCurrent(subject: Required<Subject>): boolean {
		const from = parse(subject.from, "HH:mm", this.date);
		const to = parse(subject.to, "HH:mm", this.date);
		return from <= this.date && this.date < to;
	}

	getSubjects(day: number = this.date.getDay()): Required<Subject>[] {
		const s = this.schedules.find((i) => day === i.day)?.subjects || [];

		const subjects = s.map((curr, n, a) => {
			const prev = a[n - 1];
			const next = a[n + 1];
			return {
				subject: curr.subject ?? prev.subject,
				teacher: curr.teacher ?? (curr.teacher === null ? null : prev.teacher),
				to: curr.to ?? next.from,
				from: curr.from,
				current: false,
			};
		});

		subjects.sort((a, b) => {
			const aFrom = parse(a.from, "HH:mm", new Date()).getTime();
			const bFrom = parse(b.from, "HH:mm", new Date()).getTime();
			return aFrom - bFrom;
		});

		for (const subject of subjects) {
			if (day !== this.date.getDay()) {
				break;
			}
			const from = parse(subject.from, "HH:mm", this.date);
			const to = parse(subject.to, "HH:mm", this.date);
			subject.current = from <= this.date && this.date < to;
		}

		return subjects as Required<Subject>[];
	}

	currentSubject(): Required<Subject> | undefined {
		return this.getSubjects()
			.find(i => i.current);
	}
}
