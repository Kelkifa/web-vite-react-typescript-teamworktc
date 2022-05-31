interface BaseInputFieldProp {
	className?: string;
	inputClassName?: string;
	label?: string;
	placeHolder?: string;
	isShowError?: boolean;

	type?: string;

	onChange?: (value: string | undefined) => string;
	form: any;
	field: any;
}

export default function BaseInputField({
	className = "",
	inputClassName = "",
	form,
	field,
	label,
	isShowError = true,
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
				<label className="block" htmlFor={field.name}>
					{label}
				</label>
			)}

			<input
				className={inputClassName}
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
