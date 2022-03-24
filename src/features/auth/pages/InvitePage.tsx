import * as React from "react";

import {useAppDispatch, useAppSelector} from "../../../app/hooks";

import BaseButton from "../../../components/form/BaseButton";
import {authActions} from "../authSlice";

export default function InvitePage() {
	const dispatch = useAppDispatch();
	const inviteData = useAppSelector(state => state.auth.invite.data);
	const loading = useAppSelector(state => state.auth.invite.loading);

	const handleAccept = (inviteId: string) => {
		if (!inviteId) return;
		dispatch(authActions.acceptInvite({inviteId}));
	};
	return (
		<div className="bg-bgColor p-3">
			<h1 className="text-baseRed mb-5">Lời mời của bạn</h1>
			<ul className="divide-y-2 divide-black/50">
				{loading && "Loading..."}
				{!loading && inviteData.length === 0 && (
					<li>Bạn không có lời mời nào</li>
				)}
				{!loading &&
					inviteData.map(invite => (
						<InviteItem key={invite._id} {...invite} onClick={handleAccept} />
					))}
			</ul>
		</div>
	);
}

function InviteItem({
	userInvite,
	groupName,
	loading,
	_id,
	onClick,
}: {
	_id: string;
	loading?: boolean;
	userInvite: string;
	groupName: string;
	onClick: (inviteId: string) => void;
}) {
	return (
		<li className="py-2">
			<b>{userInvite}</b>{" "}
			<span className="text-baseText"> mời bạn vào nhóm</span>{" "}
			<i>{groupName}</i>
			<BaseButton
				className="bg-tim ml-5 rounded-lg px-3 text-sm"
				onClick={() => {
					onClick(_id);
				}}
				loading={loading}
			>
				Chấp nhận
			</BaseButton>
		</li>
	);
}
