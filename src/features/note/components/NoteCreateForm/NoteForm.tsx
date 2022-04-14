import * as yup from "yup";

import {FastField, Field, Formik} from "formik";
import {Note, NoteFormValue} from "../../../../models/Note";
import React, {memo, useEffect} from "react";
import {getLastDateFormDate, randomNoteColor} from "../NoteCalendar/core";
import {
	getNoteCreateStatusLoading,
	getNoteUpdateStatusLoading,
	noteActions,
} from "../../noteSlice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";

import BaseButton from "../../../../components/form/BaseButton";
import BaseInputField from "../../../../components/form/BaseInputField";
import NoteInputField from "./NoteInputField";
import {SelDates} from "../NoteCalendar";
import clsx from "clsx";

const styles = {
	dateFieldContainer: "flex gap-x-2",
	dateField: "grow",
	timeField: "max-w-[6.5rem]",
};

const schema = yup.object().shape({
	name: yup.string().required("Bạn chưa nhập trường này"),
	from: yup.string().required("Bạn chưa nhập trường này"),
	to: yup.string().required("Bạn chưa nhập trường này"),
	color: yup.string().required("Bạn chưa nhập trường này"),
});

export interface NoteFormProp {
	className?: string;

	selDates: SelDates;
	initialData?: NoteFormValue; // Nếu có thì form này dùng để cập nhật
	isLoading: boolean;
	setSelDates: React.Dispatch<React.SetStateAction<SelDates>>;
}
const NoteCreateForm = ({
	className,
	selDates,
	initialData,
	isLoading,
	setSelDates,
}: NoteFormProp) => {
	const currColorList = useAppSelector(state =>
		state.note.data?.map(value => value.color)
	);

	const dispatch = useAppDispatch();

	const createLoading = useAppSelector(getNoteCreateStatusLoading);
	const updateLoading = useAppSelector(getNoteUpdateStatusLoading);

	let initialValues: NoteFormValue = initialData
		? initialData
		: {
				name: "",
				from: "",
				to: "",
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
			dateInt > getLastDateFormDate(new Date(yearInt, monthInt, 0)) ||
			monthInt > 12 ||
			monthInt < 1 ||
			dateInt < 1
		) {
			return errStr;
		}

		return null;
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

	const handleSubmit = (
		values: NoteFormValue,
		{resetForm}: {resetForm: () => void}
	) => {
		// Start
		const [startDate, startMonth, startYear] = values.from
			.split("/")
			.map(value => parseInt(value));

		// End
		const [toDate, toMonth, toYear] = values.to
			.split("/")
			.map(value => parseInt(value));

		const dateFrom = new Date(startYear, startMonth - 1, startDate);
		const dateTo = new Date(toYear, toMonth - 1, toDate); //toHour, toMinute);

		if (dateFrom > dateTo) {
			alert("Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc");
			return;
		}
		const data: Note = {
			from: dateFrom.toISOString(),
			to: dateTo.toISOString(),
			name: values.name,
			color:
				values.color === "transparent"
					? randomNoteColor(currColorList)
					: values.color,
		};
		resetForm();

		if (initialData?._id) {
			dispatch(
				noteActions.update({
					noteId: initialData._id,
					data,
				})
			);
			return;
		}
		dispatch(noteActions.createNote(data));
	};

	return (
		<div className={clsx("text-sm", className)}>
			<h1 className="text-center text-base text-red-500 font-semibold">
				{initialData ? "Cập nhật sự kiện" : "Tạo sự kiện"}
			</h1>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={schema}
			>
				{formikProps => {
					const {handleSubmit, values, handleChange, setFieldValue} =
						formikProps;

					const handleChangeColor = () => {
						handleChange({
							target: {name: "color", value: randomNoteColor(currColorList)},
						});
					};

					useEffect(() => {
						if (initialData) {
							setFieldValue("name", initialData.name);
							setFieldValue("to", initialData.to);
							setFieldValue("from", initialData.from);
							setFieldValue("color", initialData.color);
						}
					}, [initialData]);
					return (
						<form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
							<FastField
								name="name"
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
							<BaseButton
								type="submit"
								loading={
									createLoading ||
									(updateLoading && Boolean(initialData)) ||
									isLoading
								}
								className="bg-tim/80 hover:bg-tim px-3 py-1 text-slate-300 rounded-lg mt-2 w-full"
							>
								{initialData ? "Cập nhật" : "Tạo"}
							</BaseButton>
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default memo(NoteCreateForm);
