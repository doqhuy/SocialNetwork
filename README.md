# Instaface - Social Network
Instaface using Spring Boot, React, MySQL, Cloudinary
Project Java

#Tính năng:

Xác thực người dùng: Đăng ký/Đăng nhập/Đăng xuất.
Tạo và xóa người dùng.
Chỉnh sửa tài khoản người dùng.
Chỉnh sửa hồ sơ người dùng.
Tìm kiếm bạn bè bằng tên hoặc email.
Gửi, xóa, hủy và chấp nhận yêu cầu kết bạn.
Xóa bạn bè khỏi danh sách bạn bè.
Thêm và xóa hình ảnh (Kho ảnh lưu trữ trên cloud).
Tạo và xóa bài viết (text).
Thích bài viết.
Tạo và xóa bình luận (text).
Chức năng trò chuyện: viết và nhận tin nhắn (text, hình ảnh, video) từ bạn bè.
Tạo nhóm trò chuyện với nhiều người.
Nhật ký lịch sử (ROOT).


Ứng dụng chạy trên Java 11

#Cài đặt:

Bước 1: Bắt đầu với client chạy bằng React

Chạy dự án bằng VS Code
Tạo thư mục với tên project và thực hiện lệnh sau

Xóa dòng react-autosize-textarea trong file package.json
npm i

npm i react-autosize-textarea --legacy-peer-deps

npm start

Ứng dụng client chạy trên port 3000

Bước 2: Bắt đầu với back-end chạy bằng Spring
Chạy dự án bằng Intellij IDEA
Tạo thư mục PictureSave để lưu ảnh trên local (dành cho chat) bằng cách thêm đường dẫn thư mục vào dòng 14
(src/main/java/instaface.backend/Chat/Controllers/Imageconfig)

Vào MySQL Workbench hoặc XAMPP tạo database social_network
Thêm tên localhost database.pass và database.user của MySQL
Vào Cloudinary điền các thông tin cần điển trong application.properties

Để có thể lưu Ảnh, bạn cần đăng ký Cloudinary và nhập thông tin đăng nhập của bạn vào tệp application.properties của ứng dụng Spring Boot 
Hoặc bạn có thể dùng tài khoản trong source
(SocialNetwork\Server\src\main\resources\application.properties)

Chạy lệnh ở terminal: ./mvnw spring-boot:run

Ứng dụng sever chạy trên port 8000




