import React, {useEffect} from "react";

import ReactTooltip from "react-tooltip";
import {SelDates} from "../NoteCalendar";
import clsx from "clsx";

interface NoteInputFieldProp {
	label?: string;
	placeHolder?: string;
	className?: string;
	isShowError?: boolean;

	lighterChooseBtn?: boolean;
	setSelDates: React.Dispatch<React.SetStateAction<SelDates>>;
	type?: string;

	onChange?: (value: string | undefined) => string;
	form: any;
	field: any;
}

export default function NoteInputField({
	form,
	field,
	label,
	lighterChooseBtn,
	setSelDates,
	isShowError = true,
	className,
	placeHolder,
	type = "text",
	onChange,
}: NoteInputFieldProp) {
	const handleChange = (e: any) => {
		if (!onChange) {
			field.onChange(e);
			return;
		}
		field.onChange({
			target: {name: field.name, value: onChange(e.target.value)},
		});
	};

	const handleChooseClick = () => {
		setSelDates(preState => {
			let sel: undefined | 0 | 1 = undefined;
			if (field.name === "from") {
				sel = preState.sel === 0 ? undefined : 0;
			} else {
				sel = preState.sel === 1 ? undefined : 1;
			}
			return {...preState, sel};
		});
	};

	return (
		<div className={className}>
			{label && (
				<label className="text-sm text-slate-200/90" htmlFor={field.name}>
					{label}
				</label>
			)}
			<div className="relative">
				<input
					className="block bg-tim/60 text-slate-300 text-sm w-full rounded py-1 pr-[2.8rem]"
					type={type}
					name={field.name}
					value={field.value}
					placeholder={placeHolder}
					onChange={handleChange}
					onBlur={field.onBlur}
					id={field.name}
				/>
				<div className="absolute top-0 bottom-0 right-0 flex items-center pr-[0.3rem]">
					<div
						className={clsx(
							"text-[0.7rem] bg-[#ff36003f] px-[0.3rem] rounded cursor-pointer",
							lighterChooseBtn && "text-yellow-200"
						)}
						data-tip="Nhấn vào đây và chọn một ngày trên lịch"
						onClick={handleChooseClick}
					>
						<ReactTooltip
							type="light"
							place="bottom"
							backgroundColor="rgba(241, 238, 179, 0.836)"
						/>
						Chọn
					</div>
				</div>
			</div>
			{isShowError && form.errors[field.name] && form.touched[field.name] && (
				<div className="text-red-500 text-xs">{form.errors[field.name]}</div>
			)}
		</div>
	);
}
