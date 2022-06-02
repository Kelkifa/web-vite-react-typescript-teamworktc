import StartSection, {
	startSectionBackgroundStyle,
} from "../../../components/StartSection";
import {
	getGroup,
	getGroupError,
	getGroupFastSearch,
	getGroupLoading,
	groupActions,
} from "../groupSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useRef, useState} from "react";

import {Group} from "../../../models/group";
import GroupNode from "../components/GroupNode";
import {TiGroup} from "react-icons/ti";
import clsx from "clsx";

export default function GroupPage() {
	const dispatch = useAppDispatch();
	const groupList = useAppSelector<Group[]>(getGroup);

	const loading = useAppSelector(getGroupLoading);
	const error = useAppSelector(getGroupError);

	const searchData = useAppSelector(getGroupFastSearch);

	const groupSectionId = useRef<string>("group-list");

	const [searchInput, setSearchInput] = useState<string>("");

	const handleSearchChange = (searchStr: string) => {
		dispatch(groupActions.fastSearch({searchStr}));
		setSearchInput(searchStr);
	};

	return (
		<div>
			<StartSection
				gotoId={groupSectionId.current}
				title="Nhóm, nơi các thành viên kết nối với nhau."
				description="Nhóm giúp các thành viên thuộc nhóm đó có thể xem, thao tác với các sự kiện thuộc nhóm đó. Những người ngoài nhóm sẽ không thể thấy hoặc thao tác với các sự kiện thuộc nhóm đó. Lưu ý: Nhóm Demo là nhóm thử nghiệm"
			/>

			<section
				className="bg-mygreendark2 py-[5rem]"
				id={groupSectionId.current}
			>
				<div className="container mx-auto bg-white p-2 pb-10">
					<h1 className="py-6 text-2xl font-bold flex w-full justify-center gap-x-2 items-center text-black">
						<TiGroup />
						<span>Danh sách các nhóm</span>{" "}
					</h1>
					{/* <Searchbar onSearchClick={() => {}} placeholder="Tìm nhóm" /> */}
					<div className="flex justify-center mt-3">
						<input
							className="bg-black w-full md:w-[80%] lg:w-[40rem] rounded-md px-3 py-1"
							type="search"
							name="search"
							value={searchInput}
							onChange={e => handleSearchChange(e.target.value)}
							placeholder="Tìm kiếm..."
						/>
					</div>
					<ul className="flex justify-center gap-3 flex-wrap mt-5 text-white">
						<GroupNode
							isAdd={true}
							className="bg-black hover:bg-mygreendark1"
						/>
						{searchInput === ""
							? groupList.map((group, index) => (
									<GroupNode
										className={clsx(
											"bg-black font-bold",
											group.type !== "demo" && "hover:bg-mygreendark2"
										)}
										data={group}
										key={group._id ? group._id : index}
										disabled={group.type === "demo"}
									/>
							  ))
							: searchData.map((group, index) => (
									<GroupNode
										className="bg-black"
										data={group}
										key={group._id ? group._id : index}
										disabled={group.type === "demo"}
									/>
							  ))}
						{loading && <div>Loading ...</div>}
						{error && <div>{error}</div>}
					</ul>
				</div>
			</section>
		</div>
	);
}
