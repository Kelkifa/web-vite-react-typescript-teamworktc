import "./BackButton.scss";

import {IoChevronBack} from "react-icons/io5";
import PropTypes from "prop-types";
import React from "react";
import {useHistory} from "react-router";

BackButton.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
};

BackButton.defaultProps = {
	className: "",
	onClick: null,
};

function BackButton({className, onClick}) {
	const history = useHistory();

	const handleClick = () => {
		if (onClick) {
			onClick();
			return;
		}

		history.goBack();
	};

	return (
		<div className={`${className} back-button`}>
			<IoChevronBack className="back-button__btn" onClick={handleClick} />
		</div>
	);
}

export default BackButton;
