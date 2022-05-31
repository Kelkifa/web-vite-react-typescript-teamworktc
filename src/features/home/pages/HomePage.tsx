import Note from "../../note";
import NotePage from "../../note/pages/NotePage";
import SelectGroupSection from "../../../components/SelectGroupSection";
import StartSection from "../../../components/StartSection";

function HomePage() {
	const selectGroupSectionId = "groupSection";
	const calendarSectionId = "calendarSection";
	return (
		<div>
			<StartSection
				gotoId={selectGroupSectionId}
				title="Hãy cùng bạn bè, người thân tạo ra các sự kiện."
				description="Đừng để việc lập lịch, lên kế hoạch với những người khác trở thành ác mộng. Hãy mời họ vào nhóm và bắt đầu xây dựng lên các sự kiện trên lịch và tạo ra danh sách công việc của sự kiện đó"
			/>

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
