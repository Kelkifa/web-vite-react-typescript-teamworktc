import * as React from "react";

import AddMemberForm from "../components/AddMemberForm";
import {useAppSelector} from "../../../app/hooks";

export default function GroupDetail() {
	const selectedGroup = useAppSelector(state => state.group.selectedGroup);

	if (!selectedGroup) return null;

	return (
		<ul className="container bg-bgColor px-3 pb-10">
			<li className="text-bold text-center py-3">{selectedGroup.name}</li>
			<li>
				<div>Thành viên</div>
				<ul className="list-disc pl-4">
					{selectedGroup.users.map(user => {
						if (user.loading) return <li key={user._id}>loading...</li>;

						return <li key={user._id}>{user.username}</li>;
					})}
				</ul>
			</li>
			<li className="mt-3">
				<div>Thêm thành viên</div>
				<AddMemberForm />
			</li>
		</ul>
	);
}
