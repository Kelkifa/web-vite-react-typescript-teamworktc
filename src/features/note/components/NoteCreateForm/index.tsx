import * as yup from "yup";

import {FastField, Field, Formik} from "formik";
import React, {memo} from "react";
import {getLastDateFormDate, randomNoteColor} from "../NoteCalendar/core";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";

import BaseInputField from "../../../../components/form/BaseInputField";
import {Note} from "../../../../models/Note";
import NoteInputField from "./NoteInputField";
import {SelDates} from "../NoteCalendar";
import clsx from "clsx";
import {noteActions} from "../../noteSlice";

const styles = {
	dateFieldContainer: "flex gap-x-2",
	dateField: "grow",
	timeField: "max-w-[6.5rem]",
};

interface NoteFormValue {
	title: string;
	from: string;
	fromTime: string;
	to: string;
	toTime: string;
	color: string;
}

const schema = yup.object().shape({
	title: yup.string().required("Bạn chưa nhập trường này"),
	from: yup.string().required("Bạn chưa nhập trường này"),
	fromTime: yup.string().required("Bạn chưa nhập trường này"),
	to: yup.string().required("Bạn chưa nhập trường này"),
	toTime: yup.string().required("Bạn chưa nhập trường này"),
	color: yup.string().required("Bạn chưa nhập trường này"),
});

interface NoteCreateFormProp {
	className?: string;
	selDates: SelDates;
	setSelDates: React.Dispatch<React.SetStateAction<SelDates>>;
}
const NoteCreateForm = ({
	className,
	selDates,
	setSelDates,
}: NoteCreateFormProp) => {
	const currColorList = useAppSelector(state =>
		state.note.data?.map(value => value.color)
	);

	const dispatch = useAppDispatch();

	const initialValues: NoteFormValue = {
		title: "",
		from: "",
		fromTime: "",
		to: "",
		toTime: "",
		color: "transparent",
	};

	// Validate Functions
	const validateDate = (value: string) => {
		const errStr = "Ngày không hợp lệ";
		const [date, month, year] = value.split("/");

		const dateInt = parseInt(date);
		const monthInt = parseInt(month);
		const yearInt = parseInt(year);

		if (
			isNaN(dateInt) ||
			isNaN(monthInt) ||
			isNaN(yearInt) ||
			dateInt > getLastDateFormDate(new Date(yearInt, monthInt, 1)) ||
			monthInt > 12 ||
			monthInt < 1 ||
			dateInt < 1
		) {
			return errStr;
		}

		return null;
	};
	const validateTime = (value: string) => {
		const errStr = "Thời gian không hợp lệ";

		const [hour, minute] = value.split(":");

		const [hourInt, minuteInt] = [parseInt(hour), parseInt(minute)];

		if (isNaN(hourInt) || isNaN(minuteInt) || hourInt > 23 || minuteInt > 59) {
			return errStr;
		}

		return null;
	};
	const handleTimeChange = (value: string): string => {
		let arr = value.split(":");
		if (arr[0].length > 2) {
			arr[1] = `${arr[0].substring(2, arr[0].length)}${
				arr[1] !== undefined ? arr[1] : ""
			}`;
			arr[0] = arr[0].substring(0, 2);
		}

		if (parseInt(arr[0]) > 23) {
			arr[0] = "23";
		}
		if (parseInt(arr[1]) > 59) {
			arr[1] = "59";
		}
		return `${arr[0]}${arr[1] !== undefined ? ":" + arr[1] : ""}`;
	};

	const handleDateChange = (value: string): string => {
		let arr = value.split("/");
		if (arr[0].length > 2) {
			arr[1] = `${arr[0].substring(2, arr[0].length)}${
				arr[1] !== undefined ? arr[1] : ""
			}`;
			arr[0] = arr[0].substring(0, 2);
		}
		if (arr[1] !== undefined && arr[1].length > 2) {
			arr[2] = `${arr[1].substring(2, arr[1].length)}${
				arr[2] !== undefined ? arr[2] : ""
			}`;
			arr[1] = arr[1].substring(0, 2);
		}

		if (parseInt(arr[0]) > 31) {
			arr[0] = "30";
		}
		if (parseInt(arr[1]) > 12) {
			arr[1] = "12";
		}
		return `${arr[0]}${arr[1] !== undefined ? "/" + arr[1] : ""}${
			arr[2] !== undefined ? "/" + arr[2] : ""
		}`;
	};

	const handleSubmit = (values: NoteFormValue) => {
		// console.log(values);
		// return;
		// Start
		const [startDate, startMonth, startYear] = values.from
			.split("/")
			.map(value => parseInt(value));

		const [startHour, startMinute] = values.fromTime
			.split(":")
			.map(value => parseInt(value));

		// End
		const [toDate, toMonth, toYear] = values.to
			.split("/")
			.map(value => parseInt(value));

		const [toHour, toMinute] = values.toTime
			.split(":")
			.map(value => parseInt(value));

		const dateFrom = new Date(
			startYear,
			startMonth - 1,
			startDate,
			startHour,
			startMinute
		);
		const dateTo = new Date(toYear, toMonth - 1, toDate, toHour, toMinute);

		if (dateFrom > dateTo) {
			alert("Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc");
			return;
		}
		const data: Note = {
			from: dateFrom.toISOString(),
			to: dateTo.toISOString(),
			title: values.title,
			color:
				values.color === "transparent"
					? randomNoteColor(currColorList)
					: values.color,
		};

		console.log(data);
		dispatch(noteActions.createNote(data));
	};

	return (
		<div className={clsx("p-2 pb-3 text-sm", className)}>
			<h1 className="text-center text-base text-red-500 font-semibold">
				Tạo sự kiện
			</h1>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={schema}
			>
				{formikProps => {
					const {handleSubmit, values, handleChange} = formikProps;

					const handleChangeColor = () => {
						handleChange({
							target: {name: "color", value: randomNoteColor(currColorList)},
						});
					};

					return (
						<form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
							<FastField
								name="title"
								component={BaseInputField}
								label="Tên sự kiện "
								placeHolder="Nhập tên sự kiện"
							/>
							<div className={styles.dateFieldContainer}>
								<Field
									className={styles.dateField}
									name="from"
									component={NoteInputField}
									selDates={selDates}
									setSelDates={setSelDates}
									lighterChooseBtn={selDates.sel === 0}
									onChange={handleDateChange}
									label="Ngày bắt đầu"
									validate={validateDate}
									placeHolder="dd/mm/yy"
								/>
								<FastField
									className={styles.timeField}
									name="fromTime"
									component={BaseInputField}
									onChange={handleTimeChange}
									label="Thời gian"
									validate={validateTime}
									// isShowError={false}
									placeHolder="hh:mm"
								/>
							</div>
							<div className={styles.dateFieldContainer}>
								<Field
									name="to"
									className={styles.dateField}
									component={NoteInputField}
									selDates={selDates}
									lighterChooseBtn={selDates.sel === 1}
									setSelDates={setSelDates}
									onChange={handleDateChange}
									validate={validateDate}
									label="Ngày kết thúc"
									placeHolder="dd/mm/yy"
								/>
								<FastField
									className={styles.timeField}
									name="toTime"
									component={BaseInputField}
									validate={validateTime}
									onChange={handleTimeChange}
									label="Thời gian"
									placeHolder="hh:mm"
								/>
							</div>
							<div className="flex gap-x-3 text-sm">
								<label htmlFor="color">Màu sự kiện</label>
								<div
									onClick={handleChangeColor}
									id="color"
									className="grow text-xs border border-slate-400/80 flex items-center justify-center text-slate-200/80 cursor-pointer"
									style={{backgroundColor: values.color}}
								>
									Nhấn vào đây
								</div>
							</div>
							{/* <div className="flex justify-end mt-2"> */}
							{/* </div> */}
							<button
								type="submit"
								className="bg-tim/80 hover:bg-tim px-3 py-1 text-slate-300 rounded-lg mt-2 w-full"
							>
								Tạo
							</button>
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default memo(NoteCreateForm);
