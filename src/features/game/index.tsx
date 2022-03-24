import {useEffect, useRef, useState} from "react";

import LazyLoad from "react-lazyload";

// import io from "socket.io-client";

// import PuzzleGame from "./components/Puzzle";

interface TestData {
	userId: number;
	id: number;
	title: string;
	body: string;
	index?: number;
}
export default function Game() {
	const [data, setDate] = useState<TestData[]>([]);

	console.log(data);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/posts"
			).then(data => data.json());

			setDate(response);
		};

		fetchData();
	}, []);
	return (
		<div className="container bg-black flex flex-col gap-y-5">
			{data.map((value, index) => (
				<LazyLoad
					key={value.id}
					placeholder={<Loading />}
					height={100}
					offset={-200}
				>
					<Port {...value} index={index}></Port>
				</LazyLoad>
			))}
		</div>
	);
}

function Port({title, id, body, userId, index}: TestData) {
	return (
		<div className="bg-white/20 h-[100px]">
			<h1 className="text-baseRed">
				{index} .{title}
			</h1>
			<p>{body}</p>
		</div>
	);
}

function Loading() {
	return <div className="py-6 h-[100px]">Loading...</div>;
}
