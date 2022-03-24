import {getGroup, getGroupError, getGroupLoading} from "../groupSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";

import {Group} from "../../../models/group";
import GroupNode from "../components/GroupNode";
import Searchbar from "../../../components/form/Searchbar";
import {TiGroup} from "react-icons/ti";

export default function GroupPage() {
	const groupList = useAppSelector<Group[]>(getGroup);

	const loading = useAppSelector(getGroupLoading);
	const error = useAppSelector(getGroupError);

	// if (!groupList) return null;
	return (
		<div className="container bg-bgColor p-2 pb-10">
			<h1 className="pt-6 text-xl text-baseRed flex w-full justify-center gap-x-2 items-center">
				<span>
					<TiGroup className="text-lg" />
				</span>
				<span>Danh sách các nhóm</span>{" "}
			</h1>
			<Searchbar onSearchClick={() => {}} placeholder="Tìm nhóm" />
			<ul className="flex justify-center gap-3 flex-wrap mt-5">
				<GroupNode isAdd={true} />
				{groupList.map((group, index) => (
					<GroupNode
						data={group}
						key={group._id ? group._id : index}
						disabled={group.type === "demo"}
					/>
				))}
				{loading && <div>Loading ...</div>}
				{error && <div>{error}</div>}
			</ul>
		</div>
	);
}
