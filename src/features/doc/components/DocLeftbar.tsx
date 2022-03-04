import {Doc} from "../../../models/doc";
import {Link} from "react-router-dom";
import {MdKeyboardArrowDown} from "react-icons/md";
import clsx from "clsx";
import {useParams} from "react-router-dom";
import {useState} from "react";

interface DocLeftBarProp {
	docList?: Doc[];
}

export default function DocLeftbar({docList}: DocLeftBarProp) {
	if (!docList) return null;

	return (
		<div className="w-56 bg-black/50">
			<div>Search</div>
			{docList.map(doc => (
				<DocLeftBarDropdown data={doc} key={doc._id} />
			))}
		</div>
	);
}

interface DocLeftBarDropdownProp {
	data: Doc;
}
function DocLeftBarDropdown({data}: DocLeftBarDropdownProp) {
	const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);

	const {docId, contentId} = useParams();
	// RENDER
	return (
		<div className="cursor-pointer font-fontBase pl-1">
			<div
				className="flex justify-between text-slate-200 font-semibold text-lg mb-3 mt-8"
				onClick={() => {
					setIsShowDropdown(!isShowDropdown);
				}}
			>
				<span>{data.name}</span>
				{!isShowDropdown && (
					<span className="flex items-center w-[18px] text-slate-400">
						<MdKeyboardArrowDown />
					</span>
				)}
			</div>
			{isShowDropdown && (
				<ul className="text-sm">
					{data.contentList.map(content => (
						<Link to={`/doc/${data._id}/${content._id}`} key={content._id}>
							<li
								className={clsx(
									"w-full text-base pl-4 border-l-2 hover:text-slate-300 hover:border-slate-300",
									{
										"text-slate-300 border-slate-300":
											docId === data._id && contentId === content._id,
									},
									{
										"border-slate-700":
											docId !== data._id || contentId !== content._id,
									}
								)}
							>
								{content.title}
							</li>
						</Link>
					))}
				</ul>
			)}
		</div>
	);
}
