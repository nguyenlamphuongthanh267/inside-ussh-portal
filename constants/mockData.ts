// 1. Dữ liệu các bài tin tức
import { NewsArticle } from '@/types/news';
import { PersonProfile } from '@/types/people';
import { GalleryMoment } from '@/types/gallery';
import { MinigameData, HumorStory, PollData } from '@/types/entertainment';
import { AnnouncementItem } from '@/types/announcements';

export const MOCK_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news_70_nam',
    title: 'PHÁT ĐỘNG CHUỖI SỰ KIỆN KỶ NIỆM 70 NĂM HÌNH THÀNH VÀ PHÁT TRIỂN NHÀ TRƯỜNG',
    slug: 'phat-dong-chuoi-su-kien-ky-niem-70-nam-hinh-thanh-va-phat-trien-nha-truong',
    summary: 'Sáng 19/9, trong khuôn khổ Lễ khai giảng năm học 2026 - 2027, Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM ra mắt chuyên trang 70 năm truyền thống và phát động chuỗi hoạt động hướng đến kỷ niệm 70 năm hình thành và phát triển của Nhà trường.',
    category: 'su-kien',
    categoryName: 'Sự kiện 70 năm',
    imageUrl: '/images/docx/image12.jpg',
    imageCaption: 'Logo chuyên trang 70 năm truyền thống Trường ĐH KHXH&NV, ĐHQG-HCM',
    secondaryImage: {
      url: '/images/docx/image4.jpg',
      caption: 'Phần khởi động chuyên trang 70 năm truyền thống Trường ĐH KHXH&NV, ĐHQG-HCM có sự tham gia của các thế hệ giảng viên, cán bộ và sinh viên Nhà trường - Ảnh: Phương Thảo',
    },
    publishDate: '2026-09-19',
    readingTime: '4 phút đọc',
    author: {
      id: 'auth_phuongthao',
      name: 'PHƯƠNG THẢO',
      avatar: '',
      role: 'Phóng viên',
      department: '',
    },
    isFeatured: true,
    isTrending: true,
    tags: ['Kỷ niệm 70 năm', 'Truyền thống Nhân Văn', 'Khai giảng 2026-2027', 'Triển lãm di sản'],
    contentParagraphs: [
      'Sáng 19/9, trong khuôn khổ Lễ khai giảng năm học 2026 - 2027, Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM ra mắt chuyên trang 70 năm truyền thống và phát động chuỗi hoạt động hướng đến kỷ niệm 70 năm hình thành và phát triển của Nhà trường.',
      'Phát biểu tại chương trình, TS. Phan Thanh Định, Phó Hiệu trưởng Nhà trường, tuyên bố: “Thay mặt Ban Giám hiệu Nhà trường, tôi kêu gọi toàn thể quý thầy, cô giáo, viên chức, người lao động, người học và toàn thể các bạn sinh viên hãy chung tay tham gia hoạt động kỷ niệm 70 năm với tinh thần chủ động, sáng tạo và trách nhiệm”.',
      'Dấu mốc 70 năm là cơ hội để Trường nhìn lại hành trình xây dựng và phát triển qua nhiều thế hệ giảng viên, viên chức, người lao động và người học. “Mỗi hoạt động là một dịp kết nối, mỗi sáng kiến là một đóng góp, mỗi công trình là một dấu ấn, mỗi hành động hôm nay là viên gạch đặt nền móng cho tương lai”, TS. Phan Thanh Định chia sẻ.',
      'Hướng tới kỷ niệm 70 năm truyền thống, Nhà trường tổ chức triển lãm chuyên đề “USSH 70 năm - Di sản tri thức, ký ức và khát vọng”. Sau gần 3 tuần phát động hoạt động hiến tặng, cho mượn hiện vật, giảng viên, cán bộ, viên chức và người lao động Nhà trường tích cực đóng góp. Tư liệu thường gắn với quá trình học tập trước đây của giảng viên như thẻ sinh viên, sổ điểm và bằng tốt nghiệp. Bên cạnh đó, giảng viên còn đóng góp tài liệu liên quan đến quá trình công tác như quyết định, giấy khen, thẻ cán bộ, danh thiếp… hoặc các tài liệu liên quan đến hoạt động của Nhà trường.',
      'Ngoài ra, những hiện vật đời thường cũng được hiến tặng, cho mượn. Theo chia sẻ từ Ban Tổ chức, đó là thư mời, phiếu thu tiền xe và những quyển vở ghi chép… Cô Huỳnh Mai Thái Mỹ (Chuyên viên Trung tâm Thông tin, Thư viện và Bảo tàng), phụ trách thu thập tư liệu, hiện vật, tâm sự: “Ban đầu, mình chưa nghĩ ngay đến những hiện vật đó. Thế nhưng, khi đặt trong bối cảnh cụ thể và gắn với người đã từng sử dụng, chúng lại giúp bổ sung thêm những thông tin về đời sống, công việc và những hoạt động diễn ra trong từng giai đoạn của Nhà trường”.',
      'Nhóm tư liệu của PGS.TS Nguyễn Quang Điển, Hiệu trưởng đầu tiên của Trường ĐH KHXH&NV, ĐHQG-HCM (1996 - 1999) được lưu giữ khá đa dạng. Nhóm này gồm bằng tốt nghiệp, sổ điểm, thẻ sinh viên của thời gian còn học tại Trường Đại học Tổng hợp TP.HCM đến giấy tờ, thẻ cán bộ, danh thiếp, hình ảnh và những tài liệu gắn với thời gian Thầy công tác tại Trường. “Khi nhìn các tư liệu này, mình thấy được một chặng đường dài, từ thời điểm thầy còn là sinh viên đến khi trở thành giảng viên, sau đó đảm nhiệm vị trí Hiệu trưởng của Nhà trường”, cô Thái Mỹ bộc bạch.',
    ],
    infoBox: {
      title: 'THÔNG TIN TIẾP NHẬN HIỆN VẬT, TƯ LIỆU',
      description: 'Nhà trường trân trọng kính mời quý thầy cô, cán bộ và cựu sinh viên tham gia đóng góp hiện vật, tư liệu cho triển lãm chuyên đề "USSH 70 năm - Di sản tri thức, ký ức và khát vọng".',
      items: [
        'Hình thức đóng góp: Hiến tặng, cho mượn để trưng bày, cung cấp bản sao/bản số hoặc chia sẻ thông tin, câu chuyện liên quan.',
        'Đối với hiện vật cho mượn: Nhà trường ghi nhận tình trạng, thời gian mượn - trả và hoàn trả theo thỏa thuận. Người đóng góp không bắt buộc chuyển quyền sở hữu hiện vật, tư liệu cho Nhà trường.',
        'Trường hợp không thuận tiện chuyển giao trực tiếp, Nhà trường bố trí phương thức tiếp nhận phù hợp.',
      ],
      details: [
        { label: 'Thời gian tiếp nhận', value: '07/09 - 30/09/2026' },
        { label: 'Địa điểm tiếp nhận', value: 'Phòng 5.12, tầng 5, Nhà Nhân văn A1, cơ sở Linh Xuân' },
      ],
      contact: {
        name: 'Cô Huỳnh Mai Thái Mỹ',
        title: 'Chuyên viên Trung tâm Thông tin, Thư viện và Bảo tàng',
        phone: '0886977954',
        email: 'huynhmaithaimy@hcmussh.edu.vn',
      },
    },
  },
  {
    id: 'news_huong_xoi',
    title: '“HƯƠNG XÔI NHÂN VĂN”: TRAO ẤM ÁP, NHẬN NIỀM VUI',
    slug: 'huong-xoi-nhan-van-trao-am-ap-nhan-niem-vui',
    summary: 'Nhằm nâng cao đời sống tinh thần giảng viên qua các hoạt động tập thể và tạo không khí ấm áp chào đón tân sinh viên, Chi hội Nữ trí thức tiếp tục duy trì chương trình thường niên “Hương xôi Nhân văn” - nét đẹp văn hóa gắn kết đồng nghiệp đầy tự hào.',
    category: 'cong-doan',
    categoryName: 'Chi hội Nữ trí thức',
    imageUrl: '/images/docx/image19.jpg',
    imageCaption: 'Cán bộ Chi hội Nữ trí thức Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM cùng nhau chuẩn bị các phần xôi, cốm và nước sâm. Ảnh: Như Quỳnh',
    secondaryImage: {
      url: '/images/docx/image9.jpg',
      caption: 'Cô Nguyễn Thu Cúc và cô Ngô Thanh An trong Chi hội Nữ trí thức trao tận tay từng hộp xôi Nhân văn đến các bạn sinh viên tại gian hàng. Ảnh: Như Quỳnh',
    },
    publishDate: '2026-09-19',
    readingTime: '3 phút đọc',
    author: {
      id: 'auth_nhuquynh',
      name: 'NHƯ QUỲNH',
      avatar: '',
      role: 'Phóng viên',
      department: '',
    },
    isFeatured: true,
    tags: ['Hương xôi Nhân văn', 'Chi hội Nữ trí thức', 'Gắn kết nội bộ', 'Lan tỏa yêu thương'],
    contentParagraphs: [
      'Nhằm nâng cao đời sống tinh thần giảng viên qua các hoạt động tập thể và tạo không khí ấm áp chào đón tân sinh viên, Chi hội Nữ trí thức Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM tiếp tục duy trì chương trình thường niên “Hương xôi Nhân văn”. Không chỉ dừng lại ở hàng ngàn phần quà nghĩa tình gửi đến người học, hoạt động này còn là dịp để đội ngũ cán bộ, giảng viên có thêm những khoảnh khắc gắn kết và niềm vui giản dị ngoài giờ đứng lớp.',
      'Trải qua 4 mùa tựu trường, “Hương xôi Nhân văn” do GS.TS. Ngô Thị Phương Lan (Hiệu trưởng, Chi hội trưởng Chi hội Nữ trí thức) khởi xướng đã trở thành một điểm hẹn quen thuộc của các thành viên Chi hội. Không chỉ gói trọn tình cảm dành cho người học, hoạt động này nay đã trở thành một nét văn hóa gắn kết đồng nghiệp đầy tự hào, tạo nên thương hiệu: “Nhắc đến hộp xôi là nhắc đến Nhân văn”.',
      'Để có được những hộp xôi dẻo thơm trao tận tay sinh viên và các cán bộ, nhân viên, công tác chuẩn bị đã được khởi động từ ngày hôm trước. ThS. Phạm Thị Thùy Trang, Giảng viên khoa Xã hội học, Chi hội phó Chi hội Nữ trí thức Nhân văn, chia sẻ: “Chúng tôi vận động các thầy cô, các mạnh thường quân để có được những phần xôi này. Khâu chuẩn bị đã bắt đầu từ chiều ngày hôm qua với việc mua thùng, hộp xôi rồi dán từng chiếc sticker. Các thầy cô đến hỗ trợ chia quà với một tâm thế rất vui vẻ, hào hứng.”. Hơn 500kg gạo nếp được nấu xuyên đêm với sự hỗ trợ trực tiếp từ chính các thầy cô trong trường, sau đó được cấp tốc chuyển xuống trường lúc 5 giờ sáng khi vẫn còn nóng hổi.',
      'PGS.TS. Lê Thị Ngọc Điệp, Trưởng khoa Việt Nam học, Chi hội phó Chi hội Nữ trí thức Nhân văn bộc bạch: “Mình cảm nhận xôi rất là dẻo, những cái vị dẻo của nếp, rồi cái hương của xôi và thêm nữa cái ý nghĩa của cái việc làm này... Tất cả mọi người từ sáng đến giờ đều nói là xôi ngon, xôi dẻo nhưng mà quan trọng ngon dẻo ở đây nó là một cái ý nghĩa hiển ngôn, nhưng mà cái ẩn ngôn trong đó chính là những giá trị nhân văn mà tập thể sư phạm Nhà trường muốn gửi gắm”.',
      'Sự phối hợp trong các hoạt động xã hội thường niên, tương tự như chương trình “Phiên chợ 0 đồng” đã và đang tạo tiền đề thuận lợi cho các đơn vị nội bộ thiết lập cơ chế trao đổi, hỗ trợ lẫn nhau trong công tác quản lý và giảng dạy. Nói về giá trị kết nối của mô hình này, PGS.TS. Lê Thị Ngọc Điệp khẳng định: “Tính gắn kết, đoàn kết là một trong những giá trị cốt lõi trước giờ của Trường Đại học Khoa học Xã hội và Nhân văn. Qua hoạt động này, tính gắn kết ấy càng thêm thắt chặt để cùng hướng đến mục tiêu chung tay phục vụ cộng đồng.”. ',
      'Thưởng thức phần xôi dẻo thơm và cùng nhau lan tỏa niềm vui đến tân sinh viên mang lại nguồn năng lượng làm việc tích cực cho cán bộ, công nhân viên trong ngày hội lớn. “Hương xôi Nhân văn” vì thế không chỉ dừng lại ở một món quà ăn sáng, mà đã trở thành biểu tượng cho tinh thần đoàn kết, nhân ái và nét đẹp văn hóa dưới mái trường Nhân văn.',
    ],
  },
  {
    id: 'news_hoi_thao_van_hoc',
    title: 'ĐĂNG KÝ THAM DỰ HỘI THẢO KHOA HỌC QUỐC TẾ “VĂN HỌC – NGHỆ THUẬT CHÂU Á TRONG BỐI CẢNH SỐ HÓA”',
    slug: 'dang-ky-tham-du-hoi-thao-khoa-hoc-quoc-te-van-hoc-nghe-thuat-chau-a-trong-boi-canh-so-hoa',
    summary: 'Khoa Văn học và Ngôn ngữ học trân trọng thông báo và kính mời toàn thể giảng viên, cán bộ, viên chức đăng ký tham dự Hội thảo khoa học quốc tế diễn ra vào ngày 30/9/2026 tại cơ sở Đinh Tiên Hoàng.',
    category: 'dao-tao',
    categoryName: 'Hội thảo quốc tế',
    imageUrl: '/images/docx/image3.png',
    imageCaption: 'Thư mời và Chương trình Hội thảo Khoa học Quốc tế “Văn học - Nghệ thuật Châu Á trong bối cảnh số hóa”',
    publishDate: '2026-09-18',
    readingTime: '3 phút đọc',
    author: {
      id: 'auth_khoavan',
      name: 'KHOA VĂN HỌC VÀ NGÔN NGỮ HỌC',
      avatar: '',
      role: 'Ban Tổ chức',
      department: '',
    },
    isFeatured: true,
    tags: ['Hội thảo quốc tế', 'Văn học - Nghệ thuật', 'Bối cảnh số hóa', 'AI và Nhân văn số'],
    contentParagraphs: [
      'Nhằm thiết lập một diễn đàn trao đổi chuyên sâu về những chuyển biến mang tính thời sự này, Khoa Văn học và Ngôn ngữ học trân trọng thông báo đến toàn thể giảng viên, cán bộ, viên chức Nhà trường về việc tổ chức Hội thảo khoa học quốc tế với chủ đề: “Văn học - nghệ thuật châu Á trong bối cảnh số hóa”.',
      'Hội thảo được tổ chức với mục tiêu tạo ra một không gian học thuật đa chiều, liên ngành và giàu tính đối thoại. Các báo cáo và tham luận tại chương trình sẽ tập trung phân tích nhiều vấn đề đương đại thiết thực, bao gồm: sự tương tác giữa AI và văn học, sự hình thành của nghệ thuật số và văn học trong môi trường mạng. Bên cạnh đó, các chuyên gia cũng sẽ thảo luận những chủ đề mang tính ứng dụng cao như nhân văn số, dịch thuật số, công tác lưu trữ, bản đồ hóa, cải biên văn học – điện ảnh, cũng như sự kiến tạo căn tính và ký ức trong không gian số.',
      'Sự kiện lần này không chỉ là dịp để cập nhật các xu hướng nghiên cứu mới nhất, mà còn mở ra cơ hội để đội ngũ giảng viên, cán bộ của Nhà trường giao lưu, trao đổi học thuật và mở rộng mạng lưới hợp tác chuyên môn.',
      'Để công tác tổ chức, đón tiếp và phục vụ Hội thảo được diễn ra chu đáo nhất, Ban tổ chức kính gửi thông tin chi tiết và kính mời toàn thể giảng viên, cán bộ, viên chức quan tâm tiến hành đăng ký tham dự:',
      '• Thời gian: 08:00 - 16:00, ngày 30/9/2026 (Thứ Tư).\n• Địa điểm: Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM (Số 10–12 Đinh Tiên Hoàng, phường Sài Gòn, TP. Hồ Chí Minh).\n• Thời hạn đăng ký: Trước ngày 28/9/2026.\n• Link đăng ký tham dự: https://forms.gle/UgZXFndefxroRbky7',
      'Khoa Văn học và Ngôn ngữ học trân trọng thông báo và kính mời toàn thể giảng viên, cán bộ, viên chức sắp xếp thời gian tham dự, góp phần tạo nên thành công chung cho diễn đàn học thuật ý nghĩa này.',
    ],
    infoBox: {
      title: 'THÔNG TIN ĐĂNG KÝ THAM DỰ HỘI THẢO',
      description: 'Khoa Văn học và Ngôn ngữ học trân trọng thông báo và kính mời toàn thể giảng viên, cán bộ, viên chức sắp xếp thời gian tham dự, góp phần tạo nên thành công chung cho diễn đàn học thuật ý nghĩa này.',
      details: [
        { label: 'Thời gian', value: '08:00 - 16:00, ngày 30/9/2026 (Thứ Tư)' },
        { label: 'Địa điểm', value: 'Trường ĐH KHXH&NV, ĐHQG-HCM (Số 10–12 Đinh Tiên Hoàng, P. Sài Gòn, TP. Hồ Chí Minh)' },
        { label: 'Thời hạn đăng ký', value: 'Trước ngày 28/9/2026' },
        { label: 'Liên hệ', value: 'ThS. Phạm Thị Thái Hà - SĐT: 0933.098.218 - Email: hoithaovhnnh@hcmussh.edu.vn' },
      ],
      link: 'https://forms.gle/UgZXFndefxroRbky7',
      linkText: 'Đăng Ký Tham Dự Hội Thảo (Google Form)',
    },
  },
];

export const MOCK_FEATURED_SLIDER: NewsArticle[] = MOCK_NEWS_ARTICLES;
export const MOCK_HERO_ARTICLE: NewsArticle = MOCK_NEWS_ARTICLES[0];

// 2. Ký Nhân văn (chỉ giữ duy nhất GS.TS.NGND Ngô Văn Lệ theo yêu cầu)
export const MOCK_PEOPLE: PersonProfile[] = [
  {
    id: 'ppl_ngo_van_le',
    name: 'Ngô Văn Lệ',
    academicTitle: 'GS.TS.NGND',
    position: 'Nguyên Hiệu trưởng Nhà trường (1999 - 2007)',
    facultyDepartment: 'Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM',
    avatarUrl: '/images/docx/image18.jpg',
    secondaryImage: {
      url: '/images/docx/image7.jpg',
      caption: 'GS.TS.NGND Ngô Văn Lệ (hàng đầu, thứ hai từ trái sang) chụp ảnh cùng các thế hệ cán bộ Trường Đại học Khoa học Xã hội và Nhân văn trong buổi khai giảng trường sáng ngày 19.9 (ĐHQG-HCM). Ảnh: Phương Thảo',
    },
    quote: 'Nghề giáo là nghề cao quý, nếu muốn giàu sang thì không ai chọn nghề này. Trước hết, khi đã chọn thì phải yêu công việc, bình tĩnh tự nâng cao năng lực bản thân.',
    bio: 'Nguyên Hiệu trưởng Trường ĐH KHXH&NV, ĐHQG-HCM (1999 - 2007). Thương binh 4/4 từ chiến trường Nam Lào năm 1971, nhà giáo nhân dân với cốt cách của một nhà khoa học mẫu mực.',
    storyTitle: 'GS. TS. NGND. NGÔ VĂN LỆ: GIỮ LỬA NHÂN VĂN TỪ NHỮNG NGÀY GIAN KHÓ',
    author: 'THẢO QUYÊN',
    isFeaturedLeader: true,
    sapo: 'Tháng 9/2026, giữa không khí rộn rã đón tân sinh viên của Trường Đại học Khoa học Xã hội và Nhân văn (ĐHQG-HCM), người ta vẫn thấy thầy Ngô Văn Lệ trở về trường, vui vẻ gặp gỡ đồng nghiệp và tham gia các hoạt động chung. Ở tuổi 78, thầy vẫn giữ dáng vẻ nhanh nhẹn, nụ cười hiền từ cùng sự hồ hởi mỗi khi nhắc đến công việc.',
    storyParagraphs: [
      'GS.TS.NGND Ngô Văn Lệ là Hiệu trưởng Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM nhiệm kỳ 1999 - 2007. Ít ai biết, trước khi trở về với bục giảng và công tác quản lý, thầy từng là thương binh 4/4 đi ra từ chiến trường Nam Lào năm 1971. Trải qua nhiều cương vị từ giảng viên đến Hiệu trưởng, hình ảnh người lãnh đạo ở thầy luôn song hành cùng cốt cách của một nhà khoa học. Dù bộn bề công tác hành chính, thầy vẫn miệt mài tự viết sách và trực tiếp hướng dẫn học trò.',
      '## Tự mình đi qua gian khó',
      'Khi thầy Lệ nhận nhiệm vụ Hiệu trưởng, Nhà trường đang đứng trước một chặng đường đầy thách thức. Sự thiếu thốn thể hiện rõ từ cơ sở vật chất: ngân sách toàn trường vỏn vẹn 7 tỷ đồng, tài sản chung chỉ có duy nhất một chiếc xe bốn chỗ, 4-5 giảng viên phải cùng làm việc trong một căn phòng chật hẹp và những khoảng sân lầy lội, ngập nước mỗi khi mưa về. Đội ngũ cán bộ lúc ấy vô cùng mỏng với khoảng 200 người, phần lớn chưa có điều kiện tiếp cận các chương trình đào tạo bậc sau đại học.',
      'Trong bối cảnh thiếu thốn cả về vật chất lẫn nhân lực, áp lực lớn nhất đặt lên vai người đứng đầu là phải giữ được sự bình tĩnh để cùng lúc giải quyết bài toán kinh phí, nâng cao chất lượng đội ngũ và tháo gỡ những vướng mắc nội bộ. Hơn hết, dấu ấn của GS. Ngô Văn Lệ không chỉ nằm ở những quyết sách quản lý, mà ở chính tác phong làm việc của thầy. Có thời điểm Ban giám hiệu chỉ còn hai thành viên gánh vác khối lượng công việc khổng lồ của cả ban, thầy vẫn kiên quyết không dùng trợ lý. Mọi việc đều do thầy tự tay sắp xếp. Ngay cả giữa những lịch trình quản lý dày đặc nhất, bục giảng và công tác nghiên cứu vẫn chưa bao giờ bị gác lại.',
      'Sự miệt mài ấy không đơn thuần là thói quen, mà xuất phát từ trách nhiệm với thế hệ sau. Trong suốt thời gian làm Hiệu trưởng, thầy vẫn trực tiếp làm giảng viên hướng dẫn cho nhiều sinh viên, nghiên cứu sinh. Điều này xuất phát từ một trăn trở rất thực tế của thầy. Thầy tâm tình: “Nhiều đồng nghiệp trong nước bấy giờ chưa có phương pháp nghiên cứu bài bản. Mình muốn dùng những kiến thức được đào tạo chuyên sâu ở nước ngoài của mình để trực tiếp hỗ trợ, giúp học trò xử lý tài liệu và vơi bớt sự chật vật trên con đường học thuật. Mình có sẵn công cụ thì mình phải giúp thôi.”',
      '## Giữ người bằng cách nhìn người',
      'Phía sau một người quản lý quyết đoán là một người thầy dành nhiều sự quan tâm cho những đồng nghiệp cùng làm việc với mình. Thầy kể về một người lái xe đã làm việc 10 năm cho trường. Thay vì chỉ coi anh là một nhân viên, thầy động viên và tạo điều kiện để anh học tập. Nhờ đó, người thanh niên ấy học lên đại học rồi tiếp tục lấy bằng thạc sĩ. Thầy coi anh như người trong gia đình và vui khi nhìn thấy sự trưởng thành ấy.',
      'Thầy cũng nhớ những bữa cơm thời còn làm Hiệu trưởng, khi mọi người có bao nhiêu tiền thì cùng chia nhau trả, không phân biệt vị trí. Những chuyến đi thực tế với sinh viên năm 1980 về Hậu Giang, Cần Thơ, Sóc Trăng cũng trở thành ký ức không thể quên. Thầy trò cùng đi vào những vùng còn thiếu thốn, cùng chịu cảnh khó khăn nhưng nhờ vậy lại hiểu và gắn bó với nhau hơn. Có lẽ từ những trải nghiệm ấy, thầy luôn nhắc đến một điều khi nói về công tác quản lý: “Mỗi người có một hoàn cảnh, một cá tính khác nhau. Muốn xây dựng một tập thể, trước hết phải hiểu những con người đang ở trong tập thể đó.”',
      'Ở tuổi 78, thầy vẫn trở về trường, gặp lại những đồng nghiệp từng cùng mình đi qua những năm tháng khó khăn. Khi được hỏi điều gì khiến thầy vẫn gắn bó với Nhân Văn, thầy không nói về những danh hiệu đã có. Thầy chỉ cười và bảo, sợi dây níu giữ lớn nhất chính là tình người, là sự chan hòa và gắn bó với anh em đồng nghiệp xung quanh. Có lẽ, đó cũng là điều giản dị nhất mà thầy muốn gửi lại cho những người đang tiếp tục công việc ở mái trường này.',
      'Giữa những thay đổi của giáo dục đại học, người làm nghề vẫn cần một điểm tựa: yêu công việc, tự nâng cao năng lực và biết trân trọng người đồng hành. Như lời thầy nhắn nhủ: “Nghề giáo là nghề cao quý, nếu muốn giàu sang thì không ai chọn nghề này. Trước hết, khi đã chọn thì phải yêu công việc, bình tĩnh tự nâng cao năng lực bản thân”.',
    ],
  },
];

// 2.2. Khoảnh khắc Nhân Văn (10 Moments strictly with photographer: Phương Thảo)
export const MOCK_GALLERY: GalleryMoment[] = [
  {
    id: 'gal_01',
    title: 'Gặp gỡ “Sóc Nhân văn” - Trợ lý mới của Người Nhân văn',
    caption: 'Giảng viên, cán bộ, người lao động Nhà trường tham gia buổi Gặp gỡ “Sóc Nhân văn” - Trợ lý mới của Người Nhân văn',
    category: 'community',
    categoryName: 'Gắn kết nội bộ',
    imageUrl: '/images/docx/image14.jpg',
    aspectRatio: 'landscape',
    date: '2026-09-19',
    photographer: 'Phương Thảo',
  },
  {
    id: 'gal_02',
    title: 'Hội ngộ các thế hệ cán bộ Nhà trường',
    caption: 'Các thế hệ cán bộ Nhà trường hội ngộ tại Ngày hội Chào đón Tân sinh viên Khóa 2026',
    category: 'community',
    categoryName: 'Truyền thống',
    imageUrl: '/images/docx/image7.jpg',
    aspectRatio: 'landscape',
    date: '2026-09-19',
    photographer: 'Phương Thảo',
  },
  {
    id: 'gal_03',
    title: 'Điều phối sự kiện Khai giảng ở hậu đài',
    caption: 'ThS. Hoàng Thị Hiền Thương, Phó Trưởng phòng Truyền thông và Quan hệ doanh nghiệp, điều phối sự kiện Lễ Khai giảng năm học 2026 - 2027 ở hậu đài',
    category: 'academic',
    categoryName: 'Hậu đài sự kiện',
    imageUrl: '/images/docx/image16.jpg',
    aspectRatio: 'portrait',
    date: '2026-09-19',
    photographer: 'Phương Thảo',
  },
  {
    id: 'gal_04',
    title: 'Tham quan khuôn viên Trường bằng xe điện',
    caption: 'TS. Phan Thanh Định, Phó Hiệu trưởng Nhà trường, điều khiển xe điện chở nguyên Ban Giám hiệu, nguyên giảng viên, giảng viên tham quan Trường',
    category: 'community',
    categoryName: 'Khuôn viên trường',
    imageUrl: '/images/docx/image11.jpg',
    aspectRatio: 'landscape',
    date: '2026-09-19',
    photographer: 'Phương Thảo',
  },
  {
    id: 'gal_05',
    title: 'Lưu lại khoảnh khắc đáng nhớ tại Lễ Khai giảng',
    caption: 'TS. Nguyễn Khắc Cảnh, Nguyên Phó Hiệu trưởng Nhà trường, lưu lại khoảnh khắc đáng nhớ tại sự kiện Lễ Khai giảng năm học 2026 - 2027',
    category: 'academic',
    categoryName: 'Ký ức Nhân Văn',
    imageUrl: '/images/docx/image15.jpg',
    aspectRatio: 'landscape',
    date: '2026-09-19',
    photographer: 'Phương Thảo',
  },
  {
    id: 'gal_06',
    title: 'Chia sẻ về vai trò của KHXH&NV trong thế giới “phẳng”',
    caption: 'GS. TS. Ngô Thị Phương Lan, Hiệu trưởng Nhà trường, chia sẻ về vai trò của khoa học xã hội và nhân văn trong thế giới “phẳng”',
    category: 'academic',
    categoryName: 'Diễn đàn học thuật',
    imageUrl: '/images/docx/image5.jpg',
    aspectRatio: 'landscape',
    date: '2026-09-19',
    photographer: 'Phương Thảo',
  },
  {
    id: 'gal_07',
    title: 'Khoảnh khắc thân tình của Ban Giám hiệu',
    caption: 'Ban Giám hiệu Nhà trường trò chuyện cùng nhau. Từ trái sang, GS. TS. Ngô Thị Phương Lan, Hiệu trưởng Nhà trường; PGS. TS. Lưu Văn Quyết, Phó Hiệu trưởng Nhà trường; TS. Lê Hoàng Dũng, Phó Hiệu trưởng Nhà trường.',
    category: 'academic',
    categoryName: 'Ban Giám hiệu',
    imageUrl: '/images/docx/image10.jpg',
    aspectRatio: 'landscape',
    date: '2026-09-19',
    photographer: 'Phương Thảo',
  },
  {
    id: 'gal_08',
    title: 'Thưởng thức tiết mục văn nghệ Lễ Khai giảng',
    caption: 'Quý giảng viên, cán bộ, người lao động Nhà trường thích thú trước tiết mục văn nghệ tại sự kiện Lễ Khai giảng năm học 2026 - 2027',
    category: 'culture',
    categoryName: 'Văn hóa & Nghệ thuật',
    imageUrl: '/images/docx/image13.jpg',
    aspectRatio: 'landscape',
    date: '2026-09-19',
    photographer: 'Phương Thảo',
  },
  {
    id: 'gal_09',
    title: 'Hai vị nguyên Hiệu trưởng Nhà trường chung một khung hình',
    caption: 'Hai vị nguyên Hiệu trưởng Nhà trường chung một khung hình',
    category: 'academic',
    categoryName: 'Thế hệ lãnh đạo',
    imageUrl: '/images/docx/image6.jpg',
    aspectRatio: 'landscape',
    date: '2026-09-19',
    photographer: 'Phương Thảo',
  },
  {
    id: 'gal_10',
    title: 'Vũ điệu sôi động cùng linh vật “Sóc Nhân văn”',
    caption: 'Nguyễn Huỳnh Minh Phúc, Bí thư Đoàn trường, nhảy cùng linh vật “Sóc Nhân văn” ở hậu đài',
    category: 'culture',
    categoryName: 'Đoàn - Hội sinh viên',
    imageUrl: '/images/docx/image17.jpg',
    aspectRatio: 'landscape',
    date: '2026-09-19',
    photographer: 'Phương Thảo',
  },
];

// 4. Phút thư giãn (Funny & Minigame from D:\Nội dung website QHCC.docx)
export const MOCK_FUNNY_STORY = {
  id: 'funny_01',
  title: 'SÁNG QUẬN 1, CHIỀU THỦ ĐỨC: KHI CÔNG CHỨC NHÂN VĂN HOÁ “PHƯỢT THỦ THÀNH PHỐ”',
  category: 'Funny',
  imageUrl: '/images/docx/image2.png',
  summary: 'Hành trình xuyên thành phố nối liền hai cơ sở Đinh Tiên Hoàng và Linh Xuân với đủ mọi sắc thái di chuyển đặc trưng của Thầy Cô nhà Nhân Văn.',
  paragraphs: [
    'Đang tưởng tượng một buổi sáng thanh lịch ngồi nhâm nhi ly cà phê gần cơ sở Đinh Tiên Hoàng, vừa mở lịch biểu ra đã thấy ca tiếp theo phải lập tức hạ cánh xuống Linh Xuân (Thủ Đức), thế là hành trình xuyên thành phố của giáo làng Nhân Văn lại chính thức bắt đầu.',
    'Trên con đường nối liền hai cơ sở, người ta dễ dàng bắt gặp đủ mọi sắc thái di chuyển đặc trưng. Đó là những “Ninja phượt thủ” lèo lái chiếc xe máy với trang bị áo chống nắng kín kẽ từ đầu đến chân, sẵn sàng nghênh chiến với nắng gió Võ Nguyên Giáp để rồi cập bến trường là tốn ngay 15 phút dặm lại phấn, chỉnh lại trang phục. Đó là những “Thiền sư” chọn xe buýt của trường, vừa bước lên cabin đã bật chế độ ngủ bù, tay ôm khư khư xấp giáo án.',
    'Còn hệ nào không ta? Còn chứ, đó là hội trải nghiệm tuyến Metro Bến Thành - Suối Tiên mát rượi ngỡ như đang ở Seoul, để rồi bước xuống ga mới giật mình bước vào thử thách “1.000 bước chân xuyên nắng” từ cổng A vào tới giảng đường B. Ngay cả hệ đi ô tô cá nhân thong dong mở nhạc Lofi du dương cũng chẳng tránh khỏi cảnh kẹt xe tắc đường.',
    'Dù chọn phương tiện nào đi nữa, chỉ cần cập bến Linh Xuân đúng giờ lên lớp đã là một chiến công hiển hách của Thầy Cô nhà Nhân Văn.',
    'Giáo làng hôm nay thuộc “hệ di chuyển” nào trên hành trình Đinh Tiên Hoàng tới Linh Xuân?',
  ],
};

export const MOCK_MINIGAME_DOCX = {
  id: 'minigame_khoanh_chu',
  title: 'THỂ LỆ MINIGAME “KHOANH CHỮ - TÌM DẤU ẤN NHÂN VĂN”',
  badge: 'MINIGAME HẰNG THÁNG',
  subtitle: 'MINIGAME HẰNG THÁNG • Tổng giải thưởng: 5.000.000đ',
  totalPrizes: '5.000.000đ',
  imageUrl: '/images/docx/image20.png',
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfAsiYFKoMjdJ8b9hmUUTdr3lsx772OXoyx3E_tX9pDigbxcQ/viewform?pli=1',
  targetAudience: 'Giảng viên, cán bộ và người lao động đang công tác tại Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM.',
  description: 'Người tham gia sẽ tìm và khoanh 03 từ khóa được ẩn trong “rừng chữ”. Các từ khóa đều liên quan đến Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM. Trong đó, một từ khóa được thiết kế theo chiều ngược và người tham gia cần xoay bản tin 180° để nhận diện.',
  steps: [
    'Bước 1: Tìm 03 từ khóa trong “rừng chữ” được đăng trên bản tin.',
    'Bước 2: Chọn một số may mắn gồm 4 chữ số từ 0 - 9999.',
    'Bước 3: Điền đầy đủ thông tin và gửi đáp án thông qua biểu mẫu (Form) của Mini-game.',
  ],
  prizes: [
    { rank: 'Giải Nhất', count: '01 giải', amount: '1.000.000 đồng', note: 'Trùng cả 4 số may mắn' },
    { rank: 'Giải Nhì', count: '02 giải', amount: '600.000 đồng/giải', note: 'Trùng 3 trên 4 số may mắn' },
    { rank: 'Giải Ba', count: '05 giải', amount: '400.000 đồng/giải', note: 'Trùng 2 trên 4 số may mắn' },
    { rank: 'Giải Khuyến khích', count: '08 giải', amount: '100.000 đồng/giải', note: 'Trùng 1 trên 4 số may mắn' },
  ],
  rulesSummary: [
    'Giải thưởng được xác định dựa trên 02 tiêu chí: chính xác và thời gian gửi đáp án.',
    'Người tham gia phải tìm đúng 03 từ khóa kèm con số may mắn từ 0 đến 9999.',
    'Trong số những người có đáp án chính xác, thứ hạng giải thưởng được xác định theo thời gian gửi bài qua Form.',
    'Trường hợp hai hay nhiều cá nhân đề xuất trùng số may mắn và trúng giải, ai gửi form sớm hơn sẽ là người trúng giải.',
    'Mỗi cá nhân chỉ được tham gia một lần.',
    'Kết quả Minigame sẽ được công bố trên website Inside Nhân Văn và gửi qua email cá nhân của người trúng giải.',
  ],
};

// Legacy compatibility stubs
export const MOCK_MINIGAME: MinigameData = {
  id: 'game_week_38',
  title: 'KHOANH CHỮ - TÌM DẤU ẤN NHÂN VĂN',
  subtitle: 'Tìm 03 từ khóa trong rừng chữ - Nhận thưởng lên đến 1.000.000đ',
  rewardPoints: 1000000,
  weekNumber: 38,
  questions: [
    {
      id: 'q1',
      question: 'Trường ĐH KHXH&NV, ĐHQG-HCM tiền thân là trường đại học nào được thành lập năm 1957?',
      options: ['Đại học Văn Khoa Sài Gòn', 'Đại học Tổng hợp Hà Nội', 'Đại học Đông Dương', 'Đại học Cần Thơ'],
      correctIndex: 0,
      explanation: 'Trường Đại học Khoa học Xã hội và Nhân văn có tiền thân là Đại học Văn Khoa (thuộc Viện Đại học Sài Gòn), thành lập vào năm 1957.',
    },
  ],
};

export const MOCK_HUMOR_STORIES: HumorStory[] = [
  {
    id: 'humor_01',
    title: MOCK_FUNNY_STORY.title,
    content: MOCK_FUNNY_STORY.paragraphs.join('\n\n'),
    category: 'office',
    categoryLabel: 'Funny',
    likesCount: 188,
    authorAlias: 'Giáo làng Nhân Văn',
    date: '2026-09-19',
  },
];

export const MOCK_WEEKLY_POLL: PollData = {
  id: 'poll_w38_2026',
  question: 'Chủ đề sinh hoạt chuyên đề & bồi dưỡng năng lực giảng viên Quý 4/2026 Thầy/Cô quan tâm nhất?',
  description: 'Ý kiến đóng góp của Quý Thầy/Cô sẽ giúp Công đoàn và Phòng Quản trị Nhân sự thiết kế chương trình phù hợp và hiệu quả nhất.',
  totalVotes: 324,
  options: [
    { id: 'opt_1', text: 'Ứng dụng Generative AI trong soạn giáo án và kiểm tra đánh giá', votes: 142 },
    { id: 'opt_2', text: 'Kỹ năng công bố bài báo quốc tế trên tạp chí Scopus/WoS', votes: 98 },
    { id: 'opt_3', text: 'Cân bằng áp lực học thuật & Chăm sóc sức khỏe tinh thần', votes: 54 },
    { id: 'opt_4', text: 'Xây dựng thương hiệu cá nhân của nhà khoa học xã hội', votes: 30 },
  ],
  endDate: '2026-09-30',
};

export const MOCK_ANNOUNCEMENTS: AnnouncementItem[] = [];
