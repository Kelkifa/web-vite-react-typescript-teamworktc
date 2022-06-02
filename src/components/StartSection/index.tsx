import * as React from "react";

import {AiOutlineGithub} from "react-icons/ai";
import Rectagle from "../Rectangle";

export interface StartSectionProp {
	title?: string | HTMLElement;
	description?: string | HTMLElement;
	gotoId?: string;
}

export const startSectionBackgroundStyle =
	"bg-black pt-ptheader pb-[5rem] bg-home min-h-screen";

export default function StartSection({
	gotoId,
	title = "Minimize your tabs. Find the trends!",
	description = "Don’t let your computer memories consumes all of those browser tabs. Findtrend let you gathers all of your favorite website into one place.",
}: StartSectionProp) {
	const handleStartClick = () => {
		if (!gotoId) return;
		const gotoEle = document.getElementById(gotoId);
		gotoEle &&
			gotoEle.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
	};
	return (
		<section className={startSectionBackgroundStyle}>
			<div className="container mx-auto">
				<div className="max-w-[39rem] mx-auto text-center">
					<h1 className="font-bold text-[3.5rem] leading-[4.7rem]">{title}</h1>
					<div className="text-mygray mt-[1.3rem]">{description}</div>

					<div className="mt-[2.2rem] py-[0.6rem]">
						<button
							className="btn px-[2rem] bg-mygreen text-black"
							onClick={handleStartClick}
						>
							Bắt Đầu🔥
						</button>
					</div>
				</div>

				<div className="mt-[10rem] sm:mt-[4rem] mx-auto flex flex-col max-w-[90%] sm:relative sm:block sm:max-w-[58rem] sm:h-[12.78rem]">
					<Rectagle
						className="rotate-[-2deg] sm:rotate-[-4deg] z-[3] top-[5%] sm:w-[19.3rem] sm:absolute"
						to="https://github.com/Kelkifa"
					>
						<>
							<AiOutlineGithub className="text-3xl" />{" "}
							<span>Github - contact</span>
						</>
					</Rectagle>
					<Rectagle
						className="rotate-[2deg] sm:rotate-[4deg] z-[2] bottom-[5%] left-[18%] sm:w-[19.3rem] mt-[1.5rem] sm:mt-0 sm:absolute"
						to="https://www.facebook.com/kelkfia"
					>
						<>
							<img src="/images/fb.svg" className="w-[2.12rem] h-[2.12rem]" />{" "}
							Facebook - contact
						</>
					</Rectagle>
					<Rectagle
						className="z-[1] top-[30%] right-[5%] sm:w-[19.3rem] sm:absolute mt-[1.2rem] sm:mt-0"
						copyClipBoard="plhuan455@gmail.com"
					>
						<>
							<img
								src="/images/gmail.svg"
								className="w-[2.12rem] h-[2.12rem]"
							/>{" "}
							plhuan455@gmail.com - Gmail contact
						</>
					</Rectagle>
				</div>
			</div>
		</section>
	);
}
