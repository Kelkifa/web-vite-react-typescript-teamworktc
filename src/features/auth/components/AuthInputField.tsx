import {FieldInputProps, FormikProps} from "formik";

interface AuthInputFieldProp {
	className?: string;
	inputClass?: string;
	form: any;
	field: any;
	onBlur?: (fieldName: string, value: string) => void;
	isAutoComplete?: boolean;

	type: string;
	label?: string;
	placeHolder?: string;
}

export default function AuthInputField({
	className = "",
	inputClass = "",
	form,
	field,
	onBlur,
	isAutoComplete = true,
	label,
	type = "text",
	placeHolder,
}: AuthInputFieldProp) {
	return (
		<div className={className}>
			<label className="block">{label}</label>
			<input
				className={inputClass}
				name={field.name}
				type={type}
				value={field.value}
				onChange={field.onChange}
				autoComplete={isAutoComplete ? "on" : "off"}
				onBlur={e => {
					field.onBlur(e);
					onBlur && onBlur(field.name, field.value);
				}}
				placeholder={placeHolder}
			/>
			{form.errors[field.name] && form.touched[field.name] && (
				<div className="text-myorange">{form.errors[field.name]}</div>
			)}
		</div>
	);
}
