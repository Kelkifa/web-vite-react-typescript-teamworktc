import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useEffect, useRef} from "react";

import {authActions} from "../../auth/authSlice";
import {useNavigate} from "react-router";

function HomePage() {
	// const navigation = useNavigate();

	// const dispatch = useAppDispatch();
	// const isFirstAccess = useAppSelector(state => state.auth.isFirstAccess);

	// useEffect(() => {
	// 	if (isFirstAccess) {
	// 		dispatch(authActions.setFirstAccess({isFirstAccess: false}));
	// 		navigation("/note");
	// 	}
	// }, []);
	return (
		<div className="container bg-bgColor p-5">
			<h1 className="text-center font-bold text-2xl mb-3">Tổng Quan</h1>
			<div>
				Ứng dụng web giúp bạn tạo và thao tác với các sự kiện được hiển thị trên
				lịch với nhiều màu sắc khác nhau mà bạn có thể mời những người khác cùng
				xem và thao tác với chúng.
				<br />
				<br />
				Ứng với mỗi sự kiện trên lịch sẽ có danh sách các công việc của sự kiện
				đó. Bạn có thể thay đổi trạng thay công việc để đánh dấu là đã thực hiện
				hoặc ngược lại.
				<br />
				<br />
				Ứng dụng giúp bạn quản lý các sự kiện của bản thân tốt hơn cũng như dễ
				dàng tìm lại chúng.
			</div>

			<h1 className="font-bold mb-2 text-xl mt-3">Hướng dẫn</h1>
			<h2 className="font-bold mb-2 text-lg">Nhóm</h2>
			<div>
				Nơi mà nhưng người dùng có thể chia sẻ các sự kiện với nhau và cùng thao
				tác với chúng. Bạn cần phải đăng nhập để có thể tạo, tham gia, mời, ...
				<br />
				Riêng với nhóm demo, tất cả người dùng đều thuộc vào nhóm này, họ có thể
				xem và thao tác với các Sự kiện mà không cần đăng nhập.
			</div>

			<h2 className="font-bold mb-2 text-lg mt-3">Sự Kiện</h2>
			<div>
				Danh sách các sự kiện được hiển thị trên lịch dựa vào thời gian bắt đầu
				và kết thúc của sự kiện đó. <br />
				Mỗi sự kiện sẽ có một danh sách các công việc có khả năng thay đổi trạng
				thái đánh dấu công việc đã hoàn thành hoặc chưa.
			</div>
		</div>
	);
}

export default HomePage;
