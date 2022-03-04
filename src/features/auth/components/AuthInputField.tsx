import {FieldInputProps, FormikProps} from "formik";

interface AuthInputFieldProp {
	form: any;
	field: any;

	isPassword?: boolean;
	label?: string;
	placeHolder?: string;
}

export default function AuthInputField({
	form,
	field,
	label,
	isPassword,
	placeHolder,
}: AuthInputFieldProp) {
	return (
		<div>
			<label className="block text-gray-300">{label}</label>
			<input
				className="px-2 text-white outline-none w-full rounded-2xl h-9 bg-bgColor/50"
				name={field.name}
				type={isPassword ? "password" : "text"}
				value={field.value}
				onChange={field.onChange}
				onBlur={field.onBlur}
			/>
			{form.errors[field.name] && form.touched[field.name] && (
				<div className="text-red-500">{form.errors[field.name]}</div>
			)}
		</div>
	);
}
