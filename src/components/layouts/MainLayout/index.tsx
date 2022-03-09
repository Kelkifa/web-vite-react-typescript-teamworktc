import * as React from "react";

import Footer from "../../footer";
import {MainHeader} from "../../../features/header";
import {Outlet} from "react-router-dom";
import clsx from "clsx";

export default function MainLayout() {
	return (
		<div
			className={clsx([
				"bg-no-repeat",
				"bg-cover",
				"bg-top",
				"bg-main",
				"bg-cyan-600",
				"w-screen",
				"h-screen",
				"overflow-auto",
				"text-slate-50",
				"custom-scroll",
			])}
		>
			<div className="min-h-screen">
				<MainHeader
					navList={[
						{path: "home", text: "Trang Chủ"},
						{path: "/group", text: "Nhóm"},
						{path: "/note", text: "Sự kiện của bạn"},
						{path: "/game", text: "Trò chơi"},
					]}
				/>
				<div className="container mx-auto mt-10 mb-10">
					<Outlet />
				</div>
			</div>

			<Footer />
		</div>
	);
}
