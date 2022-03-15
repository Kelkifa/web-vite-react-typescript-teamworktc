interface MyTableProp {
	headerList: (JSX.Element | string)[];
	children?: JSX.Element;
}

import "./index.scss";

export default function MyTable({headerList, children}: MyTableProp) {
	return (
		<div>
			<table className="mytable">
				<thead>
					<tr>
						{headerList.map((header, index) => (
							<th key={index} className="mytable__head">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</table>
		</div>
	);
}
