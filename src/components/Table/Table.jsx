import "./table.scss";

import PropTypes from "prop-types";

Table.propTypes = {
	headerList: PropTypes.array,
	// children: PropTypes.element,
	rowHighlight: PropTypes.string,
	rowHover: PropTypes.string,
	maxHeight: PropTypes.string,
};

Table.defaultProps = {
	headerList: [],
	children: null,
	rowHighlight: "#f2f2f2",
	rowHover: "rgba(175, 205, 236, 0.603)",
	maxHeight: undefined,
};

export default function Table(props) {
	// PROPS
	const {headerList, children, rowHighlight, rowHover, maxHeight} = props;

	// RENDER
	return (
		<div className="custom-scroll" style={maxHeight ? {maxHeight} : {}}>
			<table
				className="component-table"
				style={{
					"--rowHighlight": rowHighlight,
					"--rowHover": rowHover,
				}}
			>
				<thead>
					<tr>
						{headerList.map(header => (
							<th key={header}>{header}</th>
						))}
					</tr>
				</thead>

				<tbody>{children}</tbody>
			</table>
		</div>
	);
}
