import {useEffect, useState} from "react";

interface SearchbarProp {
	onSearchClick: (data: string) => void;
	placeholder?: string;
}
export default function Searchbar({
	onSearchClick,
	placeholder = "",
}: SearchbarProp) {
	const [search, setSearch] = useState<string>("");
	useEffect(() => {
		setSearch("");
	}, []);
	const handleSearchClick = () => {
		onSearchClick(search);
	};
	return (
		<div className="flex gap-x-1 md:w-[30rem] w-full mx-auto sm:mt-10 mt-7">
			<input
				className="bg-tim/60 md text-baseText flex-grow"
				name="search"
				value={search}
				placeholder={placeholder}
				onChange={e => {
					setSearch(e.target.value);
				}}
			/>
			<button className="bg-tim px-4 rounded-r-xl" onClick={handleSearchClick}>
				Tìm
			</button>
		</div>
	);
}
