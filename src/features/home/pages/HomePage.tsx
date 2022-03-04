function HomePage() {
	return (
		<div className="container bg-bgColor p-5">
			<h1 className="text-center font-bold text-2xl mb-3">Tổng Quan</h1>
			<div>
				Ứng dụng hỗ trợ tạo danh sách các công việc, các tài liệu để nhiều người
				có thể xem và thay đổi chúng
			</div>

			<h1 className="font-bold mb-2 text-xl">Hướng dẫn</h1>
			<h2 className="font-bold mb-2 text-lg">Nhóm</h2>
			<div>
				Những thành viên trong nhóm mới xem và thao tác được với các Todos và
				Docs của tài liệu trong nhóm đó. <br />
				Riêng với nhóm demo, tất cả người dùng đều thuộc vào nhóm này, họ có thể
				xem và thao tác với các Sự kiện mà không cần đăng nhập
			</div>

			<h2 className="font-bold mb-2 text-lg">Sự Kiện</h2>
			<div>
				Danh sách các sự kiện được hiển thị trong lịch dựa vào mốc thời gian của
				sự kiện đó. <br />
				Mỗi sự kiện sẽ có một danh sách các công việc có khả năng thay đổi trạng
				thái xong hoặc đã xong
			</div>
		</div>
	);
}

export default HomePage;
