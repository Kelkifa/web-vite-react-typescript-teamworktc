import {useEffect, useRef, useState} from "react";

import EventEmitter from "events";
import clsx from "clsx";

export const Emitter = new EventEmitter();

const styles = {
	btn: "w-[50%] p-2 hover:bg-black/20",
};
export default function ConfirmAlert() {
	const [isShow, setIsShow] = useState<boolean>(false);
	const [action, setAction] = useState<{
		message: string;
		callback?: () => void;
	}>({
		message: "",
	});
	useEffect(() => {
		const callback = (data: {message: string; callback?: () => void}) => {
			setIsShow(true);
			setAction({message: data.message, callback: data.callback});
		};
		Emitter.on("confirm", callback);

		return () => {
			Emitter.removeListener("confirm", callback);
		};
	}, []);

	const handleCancerClick = () => {
		setIsShow(false);
		setAction({message: ""});
	};

	const handleConfirmClick = () => {
		setIsShow(false);
		setAction({message: ""});

		if (action.callback !== undefined) {
			action.callback();
		}
	};

	if (!isShow) return null;
	return (
		<div className="relative">
			<div className="fixed top-0 bottom-0 right-0 left-0 bg-bgColor z-20 flex items-center justify-center text-black">
				<div className="bg-baseText rounded-md max-w-[19.65rem]">
					<h1 className="text-baseRed text-center font-bold p-2">Thông báo</h1>
					<div className="p-2">{action.message}</div>
					<div className="min-w-[14rem]">
						<button
							className={clsx(styles.btn, "text-baseRed")}
							onClick={handleCancerClick}
						>
							Hủy
						</button>
						<button
							className={clsx(styles.btn, "text-green-700")}
							onClick={handleConfirmClick}
						>
							Xác nhận
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export const useCallConfirmAlert = () => {
	const callConfirmAlert = (message: string, callback?: () => void) => {
		Emitter.emit("confirm", {message, callback});
	};

	return {callConfirmAlert};
};

export const callConfirmAlert = (message: string, callback?: () => void) => {
	Emitter.emit("confirm", {message, callback});
};
