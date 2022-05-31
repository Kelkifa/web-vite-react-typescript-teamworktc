import * as React from "react";

import LoadIcon from "../LoadIcon";
import {startSectionBackgroundStyle} from "../StartSection";

export function LoadComponent() {
	return (
		<div className={startSectionBackgroundStyle}>
			<div className="container mx-auto flex items-center">
				Loading <LoadIcon />
			</div>
		</div>
	);
}

export function ErrorComponent({error}: {error: string}) {
	return (
		<div className={startSectionBackgroundStyle}>
			<div className="container mx-auto flex items-center">{error}</div>
		</div>
	);
}
