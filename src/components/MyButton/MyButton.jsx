import "./myButton.scss";

import LoadIcon from "../LoadIcon";
import PropTypes from "prop-types";
import React from "react";

// import {useState} from "react";

MyButton.propTypes = {
	className: PropTypes.string,

	disabled: PropTypes.bool,
	text: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	type: PropTypes.string, // type of button {type: String, $in:["submit", "cancel"]}
	onClick: PropTypes.func,
};

MyButton.defaultProps = {
	className: "",

	disabled: false,
	text: "Submit",
	name: "submit",
	type: "submit",
	value: "",
	onClick: () => {},
};

function MyButton(props) {
	const {text, className, name, type, disabled, value, onClick} = props;

	return (
		<>
			{type === "submit" ? (
				<button
					className={`my-button ${className}${
						disabled ? " my-button--disable" : ""
					}`}
					mame={name}
					value={value}
					type={type}
					disabled={disabled}
					onClick={onClick}
				>
					<span className="my-button__text">{text}</span>
					{disabled && <LoadIcon />}
				</button>
			) : (
				<div
					className={`my-button ${className}${
						disabled ? " my-button--disable" : ""
					}`}
					onClick={onClick}
				>
					<span>{text}</span>
					{disabled && <LoadIcon />}
				</div>
			)}
		</>
	);
}

export default MyButton;
