import "./TimeCount.scss";

import {useEffect, useRef, useState} from "react";

import clsx from "clsx";

export default function TimeCount({
	limit = 4,
	delay = 1000,
	animationDuration = "orange",
}: {
	limit?: number;
	delay?: number;
	animationDuration?: string;
}) {
	const [countTop, setCountTop] = useState<number>(1);
	const [countBottom, setCountBottom] = useState<number>(1);

	const [isMoving, setIsMoving] = useState<boolean>(false);
	// const [isBottomMove, setIsTopMove] = useState<boolean>(false);

	const topMoveRef = useRef<HTMLDivElement | null>(null);
	const bottomMoveRef = useRef<HTMLDivElement | null>(null);

	const handleNextCount = () => {
		setIsMoving(() => true);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			// console.log(1);
			setIsMoving(preState => true);
		}, delay);

		return () => {
			clearInterval(interval);
		};
	}, []);
	useEffect(() => {
		if (!bottomMoveRef.current || !topMoveRef.current) return;

		const topCallback = (e: Event) => {
			setCountTop(preCount => {
				return preCount >= limit ? 0 : preCount + 1;
			});
		};
		topMoveRef.current.addEventListener("animationend", topCallback);

		const bottomCallback = (e: Event) => {
			setCountBottom(preCount => {
				return preCount >= limit ? 0 : preCount + 1;
			});
			setIsMoving(() => false);
		};

		bottomMoveRef.current.addEventListener("animationend", bottomCallback);

		return () => {
			topMoveRef.current &&
				topMoveRef.current.removeEventListener("animationend", topCallback);
			bottomMoveRef.current &&
				bottomMoveRef.current.removeEventListener(
					"animationend",
					bottomCallback
				);
		};
	}, [bottomMoveRef.current]);
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="time-count" data-color="orange">
				<div className="time-count-pre">
					<div className="time-count__top">
						{countTop >= limit ? 0 : countTop + 1}
					</div>
					<div className="time-count__bottom">{countBottom}</div>
				</div>
				<div className="time-count-after">
					<div
						className={clsx(
							"time-count__top",
							isMoving && "time-count__top--move"
						)}
						ref={topMoveRef}
					>
						{countTop}
					</div>
					<div
						className={clsx(
							"time-count__bottom",
							isMoving && "time-count__bottom--move"
						)}
						ref={bottomMoveRef}
					>
						{countBottom >= limit ? 0 : countBottom + 1}
					</div>
				</div>
			</div>
			<button onClick={handleNextCount} className="bg-gray-500">
				next
			</button>
		</div>
	);
}
