import {
	getGroupData,
	getGroupLoading,
	getGroupSelected,
	groupActions,
} from "../../features/group/groupSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect, useRef, useState} from "react";

import {Group} from "../../models/group";
import LoadIcon from "../LoadIcon";
import clsx from "clsx";

export default function GroupDropdown() {
	const dispatch = useAppDispatch();

	// Group
	const groupLoading = useAppSelector(getGroupLoading);
	const groupData = useAppSelector(getGroupData);

	const selectedGroup = useAppSelector(getGroupSelected);

	// State
	const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);

	// ref

	// handle functions
	const handleDropdownItemClick = (group: Group) => {
		setIsShowDropdown(false);
		dispatch(groupActions.setSeletedGroup(group));
	};

	return (
		<div>
			<div
				className={clsx(
					"relative bg-black text-white w-[13.75rem] h-[2.8125rem] rounded-md",
					isShowDropdown && "rounded-b-none"
				)}
			>
				<div
					className={clsx(
						"w-full h-full leading-[2.8125rem] px-[1.5rem] font-bold whitespace-nowrap overflow-hidden relative",
						!groupLoading && "cursor-pointer"
					)}
					onClick={() => {
						setIsShowDropdown(preState => !preState);
					}}
				>
					{groupLoading ? (
						<span className="text-mygray flex items-center gap-1">
							Loading <LoadIcon />{" "}
						</span>
					) : (
						selectedGroup?.name
					)}
					<div
						className="absolute top-0 bottom-0 right-0 w-[2rem] rounded-r-md"
						style={{
							backgroundImage: "linear-gradient(to right, transparent, black)",
						}}
					></div>
				</div>

				{isShowDropdown && !groupLoading && (
					<ul className="absolute bg-black left-0 right-0 rounded-b-md z-9 max-h-[6.89rem] overflow-auto custom-scroll">
						{groupData.map((group, index) => {
							if (group._id === selectedGroup?._id) return null;
							return (
								<li
									key={group._id ? group._id : index}
									className="px-[1.5rem] py-[0.4rem] hover:bg-mygray cursor-pointer"
									onClick={() => {
										handleDropdownItemClick(group);
									}}
								>
									{group.name}
								</li>
							);
						})}
					</ul>
				)}
			</div>

			<div className="text-sm">Số Lượng Nhóm: {groupData.length}</div>
		</div>
	);
}
// GROUP DROP DOWN
// const groupDropDownStyles = {
// 	container:
// 		"relative h-[35px] w-44 bg-black/70 mr-3 text-orange-400 font-semibold",
// };

// export default function GroupDropdown() {
// 	const dispatch = useAppDispatch();
// 	const groupLoading = useAppSelector(getGroupLoading);
// 	const groupData = useAppSelector(getGroupData);
// 	const selectedGroup = useAppSelector(getGroupSelected);

// 	const dropdownRef = useRef<HTMLUListElement>(null);
// 	const [isDropdownOverflow, setIsDropdownOverflow] = useState<boolean>(false);

// 	const [isShowDropdown, setIsShowDropdown] = useState(false);

// 	// Handle Functions
// 	const handleDropdowOverFolow = (dropdownElement: HTMLUListElement) => {
// 		if (
// 			dropdownElement.offsetHeight + dropdownElement.scrollTop <
// 			dropdownElement.scrollHeight
// 		)
// 			return setIsDropdownOverflow(true);
// 		return setIsDropdownOverflow(false);
// 	};

// 	const handleItemClick = (group: Group) => {
// 		setIsShowDropdown(false);
// 		dispatch(groupActions.setSeletedGroup(group));
// 	};

// 	const handleScroll = (e: any) => {
// 		const dropdownElement = e.target;
// 		handleDropdowOverFolow(dropdownElement);
// 	};

// 	useEffect(() => {
// 		if (dropdownRef.current === null) return;
// 		const dropdownElement = dropdownRef.current;
// 		handleDropdowOverFolow(dropdownElement);
// 	}, [dropdownRef.current, isShowDropdown]);

// 	if (groupLoading) {
// 		return (
// 			<div className={groupDropDownStyles.container}>
// 				<div className="w-full h-full flex justify-center items-center">
// 					<LoadIcon className="text-lg" />
// 				</div>
// 			</div>
// 		);
// 	}
// 	return (
// 		<div className={groupDropDownStyles.container}>
// 			<div
// 				className="h-full flex items-center w-full px-2 truncate cursor-pointer"
// 				onClick={() => {
// 					setIsShowDropdown(!isShowDropdown);
// 				}}
// 			>
// 				{selectedGroup?.name}
// 			</div>

// 			<ul
// 				className={clsx(
// 					"absolute top-full w-full bg-bgColor max-h-[128px] overflow-auto scrollbar-hide rounded-b-md",
// 					{
// 						hidden: !isShowDropdown,
// 					}
// 				)}
// 				ref={dropdownRef}
// 				onScroll={handleScroll}
// 			>
// 				{groupData.map((group, index) => {
// 					if (group._id === selectedGroup?._id) return null;
// 					return (
// 						<li
// 							key={group._id ? group._id : index}
// 							className={clsx(
// 								"h-7 px-2 w-full bg-red  truncate",
// 								group.loading === true
// 									? "opacity-60"
// 									: "hover:bg-black/30 cursor-pointer"
// 							)}
// 							onClick={() => {
// 								if (group.loading === true) return;
// 								handleItemClick(group);
// 							}}
// 						>
// 							<span>{group.name}</span>
// 							{group.loading && (
// 								<span>
// 									<LoadIcon />
// 								</span>
// 							)}
// 						</li>
// 					);
// 				})}
// 			</ul>

// 			{/* EFFECT SCROLL */}
// 			{isShowDropdown && (
// 				<div
// 					className={clsx(
// 						"absolute top-[138px] h-[22px] w-full bg-gradient-to-t from-[#05171fdc]",
// 						{hidden: !isDropdownOverflow}
// 					)}
// 				></div>
// 			)}
// 		</div>
// 	);
// }
