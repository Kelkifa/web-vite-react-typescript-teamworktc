import {AiOutlineMenu} from "react-icons/ai";
import HeaderRight from "./HeaderRight";
import {Link} from "react-router-dom";
import clsx from "clsx";
import {useState} from "react";

export interface NavInfo {
	path: string;
	text: string;
}

interface MainHeaderProp {
	navList: NavInfo[];
}

const mobileNavItemClass =
	"w-full flex items-center justify-center cursor-pointer hover:bg-black/30";

export function MainHeader({navList}: MainHeaderProp) {
	const [isShowMobileNavbar, setIsShowMobileNavbar] = useState<boolean>(false);

	return (
		<div className="container mx-auto flex justify-between h-14 font-header">
			{/* Left */}
			<ul className="hidden md:flex">
				{navList.map((nav, index) => (
					<Link
						to={nav.path}
						key={index}
						className={clsx(
							"flex shrink-0 items-center cursor-pointer px-3 font-medium justify-center hover:bg-black/30",
							index === 0 && "pl-0"
						)}
					>
						<li className="shrink-0">{nav.text}</li>
					</Link>
				))}
			</ul>

			{/* Menu Icon */}
			<div className="flex items-center md:hidden text-3xl px-4">
				{!isShowMobileNavbar && (
					<AiOutlineMenu
						className="cursor-pointer"
						onClick={() => {
							setIsShowMobileNavbar(!isShowMobileNavbar);
						}}
					/>
				)}
			</div>

			{/* Mobile Navbar */}
			{isShowMobileNavbar && (
				<ul className="fixed inset-0 bg-slate-800/90 h-full z-10 md:hidden">
					{navList.map((nav, index) => {
						return (
							<Link
								to={nav.path}
								className={mobileNavItemClass}
								key={index}
								style={{height: `${100 / (navList.length + 1)}%`}}
								onClick={() => {
									setIsShowMobileNavbar(false);
								}}
							>
								<li>{nav.text}</li>
							</Link>
						);
					})}
					<li
						className={mobileNavItemClass}
						style={{height: `${100 / (navList.length + 1)}%`}}
						onClick={() => {
							setIsShowMobileNavbar(false);
						}}
					>
						x
					</li>
				</ul>
			)}

			<HeaderRight />
		</div>
	);
}
