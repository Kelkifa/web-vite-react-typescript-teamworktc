import {Link} from "react-router-dom";
import clsx from "clsx";
import {useNavigate} from "react-router";

interface LinkButtonProp {
	path: string;
	className?: string;
	children: JSX.Element | string;
	onClick?: () => void;
}

export default function LinkButton({
	path,
	className = "",
	children,
	onClick,
}: LinkButtonProp) {
	return (
		<Link
			onClick={() => {
				onClick && onClick();
			}}
			to={path}
			className={clsx(className, "cursor-pointer whitespace-nowrap")}
		>
			{children}
		</Link>
	);
}
