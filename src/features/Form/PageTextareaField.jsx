import PropTypes from "prop-types";
import React from "react";

PageTextareaField.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,

	rows: PropTypes.number,

	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool,
};

PageTextareaField.defaultProps = {
	rows: 10,
	label: "",
	placeholder: "",
	type: "text",
	disabled: false,
};

function PageTextareaField({
	form,
	field,
	rows,
	type,
	label,
	placeholder,
	disabled,
}) {
	return (
		<div className="mform__field page-input-field">
			{label && <label className="mform__field__label">{label}</label>}
			<textarea
				className="mform__field__input"
				name={field.name}
				value={field.value}
				type={type}
				placeholder={placeholder}
				onChange={field.onChange}
				onBlur={field.onBlur}
				rows={rows}
				disabled={disabled}
			/>
			{form.errors[field.name] && form.touched[field.name] && (
				<div className="mform__field__error">{form.errors[field.name]}</div>
			)}
		</div>
	);
}

export default PageTextareaField;
