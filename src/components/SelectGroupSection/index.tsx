import * as React from "react";

import GroupDropdown from "../GroupDropdown";

export interface SelectGroupSectionProp {
	gotoId?: string;
	id?: string;
}

export default function SelectGroupSection({
	gotoId = "",
	id = "",
}: SelectGroupSectionProp) {
	const handleScroll = () => {
		const gotoEle = document.getElementById(gotoId);

		gotoEle &&
			gotoEle.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
	};

	return (
		<section className="bg-mygreen text-black" id={id}>
			<div className="container mx-auto flex flex-col items-center py-[6rem]">
				<h2 className="font-bold text-h">Chọn nhóm</h2>
				<h2 className="text-center text-[#3f5e17] mb-2">
					Những sự kiện ở phần lịch bên dưới{" "}
					<strong onClick={handleScroll} className="cursor-pointer">
						bên dưới
					</strong>{" "}
					là những sự kiện của nhóm bạn chọn.
					<br />
					Hãy chọn một nhóm mà bạn muốn!
				</h2>
				<GroupDropdown />
			</div>
		</section>
	);
}
