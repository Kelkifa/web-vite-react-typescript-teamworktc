import * as React from "react";

import ConfirmAlert from "../../notifices/ConfirmAlert";
import Footer from "../../footer";
import {MainHeader} from "../../../features/header";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
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
				// "relative",
			])}
		>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				draggable
				// pauseOnHover
			/>
			<ConfirmAlert />

			<div className="min-h-screen">
				<MainHeader
					navList={[
						{path: "home", text: "Trang Chủ"},
						{path: "/group", text: "Nhóm"},
						{path: "/note", text: "Sự kiện của bạn"},
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
