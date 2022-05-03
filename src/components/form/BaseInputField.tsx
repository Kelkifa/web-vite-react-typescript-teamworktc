interface BaseInputFieldProp {
	label?: string;
	placeHolder?: string;
	className?: string;
	isShowError?: boolean;

	type?: string;

	onChange?: (value: string | undefined) => string;
	form: any;
	field: any;
}

export default function BaseInputField({
	form,
	field,
	label,
	isShowError = true,
	className,
	placeHolder,
	type = "text",
	onChange,
}: BaseInputFieldProp) {
	const handleChange = (e: any) => {
		if (!onChange) {
			field.onChange(e);
			return;
		}
		field.onChange({
			target: {name: field.name, value: onChange(e.target.value)},
		});
	};
	return (
		<div className={className}>
			{label && (
				<label className="text-sm text-slate-200/90" htmlFor={field.name}>
					{label}
				</label>
			)}

			<input
				className="block bg-tim/60 text-slate-300 text-sm w-full rounded py-1 h-full"
				type={type}
				name={field.name}
				value={field.value}
				placeholder={placeHolder}
				onChange={handleChange}
				onBlur={field.onBlur}
				id={field.name}
			/>
			{isShowError && form.errors[field.name] && form.touched[field.name] && (
				<div className="text-red-500 text-xs">{form.errors[field.name]}</div>
			)}
		</div>
	);
}
