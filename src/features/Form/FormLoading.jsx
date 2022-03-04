import "assets/scss/components/form.scss";

import React from "react";

function FormLoading(props) {
	return (
		<div className="mform--loading">
			<div className="mform--loading__title mform--loading__animation"></div>
			<div className="mform--loading__field">
				<div className="mform--loading__field__label mform--loading__animation"></div>
				<div className="mform--loading__field__input--big mform--loading__animation"></div>
			</div>
			<div className="mform--loading__field">
				<div className="mform--loading__field__label mform--loading__animation"></div>
				<div className="mform--loading__field__input--big mform--loading__animation"></div>
			</div>
			<div className="mform--loading__btn-container">
				<div className="mform--loading__btn-container__btn mform--loading__animation"></div>
			</div>
		</div>
	);
}

export default FormLoading;
