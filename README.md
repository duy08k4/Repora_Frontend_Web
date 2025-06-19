# PHÁT TRIỂN PHẦN MỀM GIS MÃ NGUỒN MỞ
## **ĐỀ TÀI: REPORA - HỆ THỐNG BÁO CÁO SỰ CỐ**

**_Repora (Report data):_** là một hệ thống báo cáo và tiếp nhận các báo cáo sự cố theo thời gian thực, hệ thống được phát triển để tiếp nhận thông báo về các sự cố với tọa độ cụ thể để điều phối nhân lực khắc phục sự cố một cách nhanh chóng

### Repora giải quyết điều gì?
- Cung cấp một kênh tiếp nhận các báo cáo sự cố của mọi người.
- Tiếp nhận các sự cố vừa xảy ra một cách nhanh nhất.

### Lợi ích chính của Repora
- Tiếp nhận nhanh chóng các báo cáo sự cố gần thời gian thực.
- Có thể triển khai công tác khắc phục sự cố dựa trên tọa độ và hình ảnh mà mọi người cung cấp.

### Ý tưởng ban đầu của Repora
**Admin - Quản trị viên** 
- Thông qua báo cáo sự cố được gửi đến, Admin có thể biết được các thông tin sau:
    - Loại sự cố.
    - Mức độ nghiêm trọng.
    - Hình ảnh sự cố.
    - Vị trí sự cố.
    - ...
- Dựa vào những thông tin trong báo cáo, Admin có thể điều phối nguồn nhân lực theo mức độ nghiêm trọng, khoảng cách của nơi xảy ra sự cố.
- Với giao diện bản đồ, Admin có thể quan sát được vị trí của các nhân viên cũng như vị trí của các sự cố.

**Staff - Nhân viên khắc phục sự cố** 
- Staff hay Nhân viên khắc phục sự cố sẽ là người đảm nhận công việc khắc phục sự cố.
- Staff sẽ nhận sự điều phối của Admin.
- Staff có thể nhìn thấy được vị trí của các sự cố trên bản đồ.
- Với chức năng nhận nhiệm vụ, Staff có thể chủ động hơn trong nhiều trường hợp:
    - Nhận nhiệm vụ mà Admin đã phân công.
    - Có thể từ chối sự phân công của Admin để chủ động thực hiện các sự cố bất ngờ mà chưa kịp report.
    - ...

**User - Người báo cáo sự cố** 
- User hay Người báo cáo sự cố là mỗi cá thể trong xã hội. Mỗi người đều có thể gửi report để báo cáo về một sự cố.
- User sẽ là người tạo các báo cáo và vị trí của các báo cáo sẽ được lấy thông qua vị trí của User.
- User cũng có thể xem vị trí của các sự cố để có thể có lộ trình di chuyển tránh nơi đang xảy ra sự cố.

## Hình ảnh
![DemoAdmin](/src/assets/Repora_admin_img_Demo.png)
![DemoStaff](/src/assets/Repora_Staff_Demo.png)
![DemoUser](/src/assets/Repora_Reporter_img.png)

## Tính năng chính
- **Admin**
    - Đăng nhập (Người đăng nhập đầu tiên sẽ có quyền admin).
    - Thêm Staff (Thêm Staff vào danh sách chờ kích hoạt) và Xóa Staff.
    - Xem chi tiết các report.
    - Xem vị trí của các Staff.
    - Điều phối nhân viên khắc phục sự cố.

- **Staff**
    - Đăng nhập (Staff cần kích hoạt tài khoản bằng cách nhập gmail và password).
    - Không có chức năng đăng ký.
    - Xem vị trí các staff khác.
    - Xem vị trí các sự cố.
    - Nhận nhiệm vụ từ admin.
    - Phản hồi kết quả khắc phục sự cố.

- **User**
    - Đăng ký.
    - Đăng nhập.
    - Xem vị trí các sự cố.
    - Báo cáo sự cố.

## Công nghệ và công cụ sử dụng
**Công nghệ:**
- **Máy khách (Client)**
    - React Typescript
    - Ionic framework

- **Máy chủ (Server)**
    - Express (NodeJS)

- **Dịch vụ đám mây**
    - Google Cloud Platform - Firestore.
    - Cloudinary.

- **Hosting**
    - Vercel (Frontend).
    - Render (Backend).

**Công cụ**
- **Thiết kế giao diện**
    - Figma.

- **Kiểm thử API**
    - Postman.

- **Viết mã**
    - Visual Studio Code.

- **Quản lý mã nguồn**
    - Git & Github

## Thông tin nhóm báo cáo
- **Lớp**: DH22HM.
- **Trường**: Trường Đại Học Nông Lâm Thành Phố Hồ Chí Minh.
- **Môn học**: Phát Triển Phần Mềm GIS Mã Nguồn Mở.
- **Nhóm báo cáo**: 03.
- **Số lượng**: 04.
- **Thành viên**: 
    - Trần Bá Tường Duy   - Trưởng nhóm.
    - Đỗ Phú Trọng        - Thành viên.
    - Nguyễn Thị Mỹ Uyên  - Thành viên.
    - Nguyễn Anh Tuấn     - Thành viên.


## Các đường dẫn
**Mã nguồn**
- Mobile app [Repora Mobile App](https://github.com/duy08k4/Repora_Frontend_mobile.git)

- [API](https://github.com/duy08k4/Repora_Backend.git)

**Sản phẩm**
- Thiết kế của ứng dụng [Repora Figma](https://www.figma.com/design/DuN4yL4mAT7j5GPA16Dxso/H%E1%BB%87-Th%E1%BB%91ng-B%C3%A1o-C%C3%A1o-S%E1%BB%B1-C%E1%BB%91?node-id=0-1&t=w2rFtuXYHf6KveKE-1)

- Sản phẩm [Repora](https://repora-frontend-web.vercel.app/)