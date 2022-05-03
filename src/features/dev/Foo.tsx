import {useEffect, useReducer, useRef} from "react";

export default function Foo() {
	const [, render] = useReducer(p => !p, false);
	const ref = useRef(0);

	const onClickRender = () => {
		ref.current += 1;
		render();
	};

	const onClickNoRender = () => {
		ref.current += 1;
	};

	useEffect(() => {
		console.log("ref changed");
	}, [ref.current]);

	return (
		<>
			<button onClick={onClickRender}>Render</button>
			<button onClick={onClickNoRender}>No Render</button>
		</>
	);
}
