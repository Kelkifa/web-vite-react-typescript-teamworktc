import * as React from "react";

import {FiExternalLink} from "react-icons/fi";
import {MdOutlineContentCopy} from "react-icons/md";
import clsx from "clsx";

export interface RectagleProp {
	children: JSX.Element | string;
	className?: string;
	to?: string;
	copyClipBoard?: string;
}

export default function Rectagle({
	className = "",
	to,
	copyClipBoard,
	children,
}: RectagleProp) {
	const [isCopped, setIsCopped] = React.useState<boolean>(false);
	return (
		<div
			className={clsx(
				className,
				"pl-[2.7rem] bg-[#181818] rounded-sm whitespace-nowrap text-[1.3rem] font-small"
			)}
			style={{boxShadow: "10px 5px 18px 10px black"}}
		>
			<div className="relative">
				{/* <div className="relative"> */}
				<div className="py-[1.7rem] flex items-center gap-x-3 overflow-hidden">
					{children}
				</div>
				<div
					className="absolute right-0 top-0 h-full w-[4.6rem] flex items-center justify-center"
					style={{
						backgroundImage:
							"linear-gradient(to right, transparent, #181818, #181818, #181818)",
					}}
				>
					{copyClipBoard && (
						<div className={clsx(isCopped && "text-white/50")}>
							<MdOutlineContentCopy
								className="cursor-pointer"
								onClick={() => {
									console.log(1);
									if (!copyClipBoard) return;
									navigator.clipboard.writeText(copyClipBoard);
									setIsCopped(pre => !pre);
								}}
							/>
						</div>
					)}
					{to && (
						<a href={to} target="_blank">
							<FiExternalLink className="cursor-pointer" />
						</a>
					)}
				</div>
				{/* </div> */}
			</div>
		</div>
	); //
}
