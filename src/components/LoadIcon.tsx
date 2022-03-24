import "./loadIcon.scss";

import PropTypes from "prop-types";
import React from "react";
import {RiLoader4Line} from "react-icons/ri";

interface LoadIconProp {
	className?: string;
}
function LoadIcon({className}: LoadIconProp) {
	return <RiLoader4Line className={`load-icon ${className}`} />;
}

export default LoadIcon;
