import Note from "../../note";
import NotePage from "../../note/pages/NotePage";
import SelectGroupSection from "../../../components/SelectGroupSection";
import StartSection from "../../../components/StartSection";

function HomePage() {
	const selectGroupSectionId = "groupSection";
	const calendarSectionId = "calendarSection";
	return (
		<div>
			<StartSection gotoId={selectGroupSectionId} />

			<SelectGroupSection
				gotoId={calendarSectionId}
				id={selectGroupSectionId}
			/>
			<section
				className="bg-no-repeat bg-cover bg-top bg-main"
				id={calendarSectionId}
			>
				<div className="container mx-auto py-[5rem] ">
					<NotePage />
				</div>
			</section>
		</div>
	);
}

export default HomePage;
