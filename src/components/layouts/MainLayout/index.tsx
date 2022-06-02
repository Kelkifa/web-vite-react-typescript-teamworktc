import ConfirmAlert from "../../notifices/ConfirmAlert";
import Footer from "../../footer";
import {MainHeader} from "../../../features/header";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";

export default function MainLayout() {
	return (
		<div className="relative w-screen h-screen overflow-auto scrollbar-hide bg-black">
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
			<MainHeader
				// className="absolute z-10 top-0 left-0 right-0"
				// className="z-10 relative"
				navList={[
					{path: "/group", text: "Nhóm"},
					{path: "/note", text: "Sự kiện"},
					{path: "/invite", text: "Lời Mời", isAuth: true},
				]}
			/>
			<div className="min-h-screen">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
