import PropTypes from "prop-types";
import React from "react";

PageInputField.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,

	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool,
};

PageInputField.defaultProps = {
	label: "",
	placeholder: "",
	type: "text",
	disabled: false,
};

function PageInputField({form, field, type, label, placeholder, disabled}) {
	return (
		<div className="mform__field page-input-field">
			{label && <label className="mform__field__label">{label}</label>}
			<input
				className="mform__field__input"
				name={field.name}
				value={field.value}
				type={type}
				placeholder={placeholder}
				onChange={field.onChange}
				onBlur={field.onBlur}
			/>
			{form.errors[field.name] && form.touched[field.name] && (
				<div className="mform__field__error">{form.errors[field.name]}</div>
			)}
		</div>
	);
}

export default PageInputField;
