import PropTypes from "prop-types";
import React from "react";
import TextEditor from "components/TextEditor/TextEditor";

PageTexteditorField.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,

	label: PropTypes.string,
};

function PageTexteditorField({form, field, label}) {
	return (
		<div className="mform__field">
			{label && <label className="mform__field__label">{label}</label>}

			<TextEditor
				name={field.name}
				setContents={field.value}
				onChange={field.onChange}
				onBlur={field.onBlur}
			/>

			{form.errors[field.name] && form.touched[field.name] && (
				<div className="mform__field__error">{form.errors[field.name]}</div>
			)}
		</div>
	);
}

export default PageTexteditorField;
