import {CalendarNote} from ".";
import randomColor from "randomcolor";

export const roundedDown = (year: number): number => {
	const subNumber = year % 10 === 0 ? 10 : year % 10;
	return year - subNumber;
};

export const getLastDate = (date: Date): Date => {
	const year = date.getFullYear();
	const month = date.getMonth();

	return new Date(year, month + 1, 0);
};

export const getDateList = (date: Date) => {
	const lastDate = getLastDate(date);
	const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);

	const beforeDateList: Date[] = [];
	const afterDateList: Date[] = [];

	let getDate: number = firstDate.getDate();
	let getMonth: number = firstDate.getMonth();
	let getYear: number = firstDate.getFullYear();

	const firstDay = firstDate.getDay();
	for (let i = 0; i < firstDay; i++) {
		beforeDateList.push(new Date(getYear, getMonth, getDate - firstDay + i));
	}

	getDate = lastDate.getDate();
	getMonth = lastDate.getMonth();
	getYear = lastDate.getFullYear();

	const lastDay = lastDate.getDay();
	for (let i = 0; i < 6 - lastDay; i++) {
		afterDateList.push(new Date(getYear, getMonth, getDate + i + 1));
	}

	// GET DateList in month
	const dateInMonthList: Date[] = [];
	getMonth = date.getMonth();
	getYear = date.getFullYear();

	for (let i = 0; i < getDate; i++) {
		dateInMonthList.push(new Date(getYear, getMonth, i + 1));
	}

	return beforeDateList.concat(dateInMonthList, afterDateList);
};

export const createLayerNoteList = (
	noteList: CalendarNote[]
): CalendarNote[] => {
	noteList.sort((a, b) => a.from.getTime() - b.from.getTime());

	const layerTimeList: Date[] = [];

	const noteLayerList = noteList.map((note, index) => {
		const geaterNoteIndex = layerTimeList.findIndex(
			layerTime => note.from > layerTime
		);

		if (geaterNoteIndex === -1) {
			layerTimeList.push(note.to);

			return {...note, layer: layerTimeList.length - 1};
		}

		layerTimeList[geaterNoteIndex] = note.to;
		return {...note, layer: geaterNoteIndex};
	});

	return noteLayerList;
};

export const createLayerNoteList2 = (
	noteList: CalendarNote[]
): CalendarNote[] => {
	noteList.sort((a, b) => a.from.getTime() - b.from.getTime());

	const toList: Date[] = [];
	const result = noteList.map((note, index) => {
		let [i, n] = [0, toList.length];

		while (i < n) {
			if (toList[i] < note.from) {
				toList[i] = note.to;
				break;
			}
			i++;
		}
		if (i === n) {
			toList.push(note.to);
		}
		return {...note, layer: i};
	});
	return result;
};
/**
 * 0  nhan
 *
 */

export function getLastDateFormDate(date: Date): number {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export const randomNoteColor = (
	nonRepeatArr: string[] = [],
	luminosity?: "bright" | "light" | "dark" | "random" | undefined,
	opacity: number | undefined = 0.5
): string => {
	const luminosityOptions = ["bright", "light", "dark", "random", undefined];
	const selectedLuminosity: any = luminosity
		? luminosity
		: luminosityOptions[Math.floor(Math.random() * luminosityOptions.length)];

	let newColor = randomColor({
		luminosity: selectedLuminosity,
		format: "rgba",
		alpha: opacity, // e.g. 'rgba(9, 1, 107, 0.5)',
	});
	do {
		newColor = randomColor({
			luminosity: selectedLuminosity,
			format: "rgba",
			alpha: opacity, // e.g. 'rgba(9, 1, 107, 0.5)',
		});
	} while (nonRepeatArr.includes(newColor));
	return newColor;
};
