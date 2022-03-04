import "./loadIcon.scss";

import PropTypes from "prop-types";
import React from "react";
import {RiLoader4Line} from "react-icons/ri";

LoadIcon.propTypes = {
	className: PropTypes.string,
};

LoadIcon.defaultProps = {
	className: "",
};

function LoadIcon(props) {
	const {className} = props;

	return <RiLoader4Line className={`load-icon ${className}`} />;
}

export default LoadIcon;
