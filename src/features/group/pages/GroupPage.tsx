import {useAppDispatch, useAppSelector} from "../../../app/hooks";

import {Group} from "../../../models/group";
import GroupNode from "../components/GroupNode";
import Searchbar from "../../../components/form/Searchbar";
import {TiGroup} from "react-icons/ti";

export default function GroupPage() {
	const dispatch = useAppDispatch();

	const groupList = useAppSelector<Group[] | undefined>(
		state => state.group.groupList
	);

	if (!groupList) return null;
	return (
		<div className="container bg-bgColor p-2 pb-10">
			<h1 className="pt-6 text-xl text-baseRed flex w-full justify-center gap-x-2 items-center">
				<span>
					<TiGroup className="text-lg" />
				</span>
				<span>Danh sách các nhóm</span>{" "}
			</h1>
			<Searchbar onSearchClick={() => {}} placeholder="Tìm nhóm" />
			<ul className="flex gap-3 flex-wrap mt-5">
				{groupList.map(group => (
					<GroupNode data={group} key={group._id} />
				))}
			</ul>
		</div>
	);
}
