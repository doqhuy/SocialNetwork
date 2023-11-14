# Instaface
Instaface using Spring Boot, React, MySQL, Cloudinary

Tính năng:

Xác thực người dùng: Đăng ký/Đăng nhập/Đăng xuất
3 vai trò người dùng: Root, quản trị viên và người dùng
Thăng hạng/Hạ cấp người dùng xuống Quản trị viên/Người dùng
Tạo và xóa người dùng
Chỉnh sửa hồ sơ người dùng
Tìm kiếm bạn bè
Gửi, xóa và chấp nhận yêu cầu kết bạn
Xóa bạn bè khỏi danh sách bạn bè
Thêm và xóa ảnh
Tạo và xóa bài viết
Tạo và xóa bình luận
Chức năng trò chuyện: viết và nhận tin nhắn (text) từ bạn bè
Nhật ký lịch sử

Java 11

Để có thể lưu Ảnh, bạn cần đăng ký Cloudinary và nhập thông tin đăng nhập của bạn vào tệp application.properties của ứng dụng Spring Boot (SocialNetwork\Server\src\main\resources\application.properties)

Cài đặt:
Bước 1: Bắt đầu với frond-end
Tạo thư mục với tên project và thực hiện lệnh sau

npx create-react-app client
cd client
npm i net react react-autosize-textarea@7.1.0 react-dom@18.2.0 react-icons react-redux react-router react-router-dom 
react-scripts react-spinners react-toastify redux redux-logger redux-thunk sockjs-client stompjs web-vitals

Bước 2: Bắt đầu với back-end
Chạy dự án bằng Intellij IDEA

Vào MySQL Workbench hoặc XAMPP tạo database
Thêm tên local pass và tên database của MySQL

Vào Cloudinary điền các thông tin cần điển trong application.properties

Option 2 - Start the application in Docker
Start the application
Go to the project directory( SocialNetwork/ ) and run:

$ docker-compose up -d
The front-end server will start on port 9090. To open it enter in your browser:

$ http://localhost:9090
Stop the application
You can stop the containers with:

$ docker-compose down
