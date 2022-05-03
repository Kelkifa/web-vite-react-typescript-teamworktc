import * as React from "react";

import LoadIcon from "../LoadIcon.jsx";
import clsx from "clsx";

interface BaseButtonProp {
	className?: string;
	loading?: boolean;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	children?: JSX.Element | string;
	onClick?: () => void;
}

export default function BaseButton({
	className,
	loading,
	disabled,
	type,
	children,
	onClick = () => {},
}: BaseButtonProp) {
	return (
		<button
			type={type}
			className={clsx(
				className,
				(disabled || loading) && "opacity-70 brightness-75 cursor-default"
			)}
			disabled={disabled}
			onClick={onClick}
		>
			{loading ? <LoadIcon /> : children}
		</button>
	);
}
