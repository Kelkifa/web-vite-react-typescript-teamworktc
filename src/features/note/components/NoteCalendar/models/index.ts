export interface CalendarNote {
	title: string;
	from: Date;
	to: Date;
	layer?: number;
	[key: string]: any;
}

export type CalendarMode = 0 | 1 | 2; // 0 default, 1: choose month and show year at header, 2: choose year and show year from to (10)
export interface MonthAndYear {
	year: number;
	month: number; // month can pass 11
}

export interface SelDates {
	date0?: Date | undefined;
	date1?: Date | undefined;
	sel?: 0 | 1;
}
