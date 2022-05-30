import * as React from "react";

import {AiOutlineGithub} from "react-icons/ai";
import Rectagle from "../Rectangle";

export interface StartSectionProp {
	gotoId?: string;
}

export const startSectionBackgroundStyle =
	"bg-black pt-ptheader pb-[5rem] bg-home min-h-screen";

export default function StartSection({gotoId}: StartSectionProp) {
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
					<h1 className="font-bold text-[3.5rem] leading-[4.7rem]">
						Minimize your tabs. Find the trends!
					</h1>
					<div className="text-mygray mt-[1.3rem]">
						Don’t let your computer memories consumes all of those browser tabs.
						Findtrend let you gathers all of your favorite website into one
						place.
					</div>

					<div className="mt-[2.2rem] py-[0.6rem]">
						<button
							className="bg-mygreen text-black py-[0.6rem] px-[2rem] rounded-[40px] font-bold leading-[1.4rem] font-icon"
							onClick={handleStartClick}
						>
							Bắt Đầu🔥
						</button>
					</div>
				</div>

				<div className="sm:h-[12.78rem] mt-[2.4rem] mx-auto  flex flex-col max-w-[37.5rem] sm:relative sm:block sm:max-w-[58rem]">
					<Rectagle
						className="rotate-[-2deg] sm:rotate-[-4deg] z-[3] top-[5%] sm:w-[19.3rem] sm:absolute"
						to="https://github.com/Kelkifa"
					>
						<>
							<AiOutlineGithub className="" /> <span>Github - contact</span>
						</>
					</Rectagle>
					<Rectagle
						className="rotate-[2deg] sm:rotate-[4deg] z-[2] bottom-[5%] left-[18%] sm:w-[19.3rem] mt-[1.5rem] sm:mt-0 sm:absolute"
						to="https://www.facebook.com/kelkfia"
					>
						<>
							<img
								src="/public/images/fb.svg"
								className="w-[2.12rem] h-[2.12rem]"
							/>{" "}
							Facebook - contact
						</>
					</Rectagle>
					<Rectagle
						className="z-[1] top-[30%] right-[5%] sm:w-[19.3rem] sm:absolute mt-[1.2rem] sm:mt-0"
						copyClipBoard="plhuan455@gmail.com"
					>
						<>
							<img
								src="/public/images/gmail.svg"
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
