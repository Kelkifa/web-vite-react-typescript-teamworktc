import {FieldInputProps, FormikProps} from "formik";

interface AuthInputFieldProp {
	form: any;
	field: any;
	onBlur?: (fieldName: string, value: string) => void;
	isAutoComplete?: boolean;

	type: string;
	label?: string;
	placeHolder?: string;
}

export default function AuthInputField({
	form,
	field,
	onBlur,
	isAutoComplete = true,
	label,
	type = "text",
	placeHolder,
}: AuthInputFieldProp) {
	return (
		<div>
			<label className="block text-gray-300">{label}</label>
			<input
				className="px-2 text-white outline-none w-full rounded-2xl h-9 bg-bgColor/50"
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
				<div className="text-red-500">{form.errors[field.name]}</div>
			)}
		</div>
	);
}
