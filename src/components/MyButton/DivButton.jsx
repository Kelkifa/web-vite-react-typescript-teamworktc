import "./divButton.scss";

import LoadIcon from "components/LoadIcon";
import PropTypes from "prop-types";
import React from "react";
import {useState} from "react";

DivButton.propTypes = {
	text: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
};

DivButton.defaultProps = {
	text: "",
	disabled: false,
	onClick: null,
};

function DivButton({text, onClick, disabled}) {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = async () => {
		if (!onClick) return;
		setIsClicked(true);

		onClick();
	};
	// Render
	return (
		<div
			className={`div-button${
				disabled || isClicked ? " div-button--disabled" : ""
			}`}
			onClick={handleClick}
		>
			{text} {disabled || (isClicked && <LoadIcon />)}
		</div>
	);
}

export default DivButton;
