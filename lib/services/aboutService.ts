import { AboutUniversityData } from '@/types/about';

export const MOCK_ABOUT_DATA: AboutUniversityData = {
  motto: 'Sáng tạo - Dẫn dắt - Trách nhiệm',
  slogan: 'Đánh thức bản sắc, kiến tạo giá trị nhân văn',
  englishSlogan: 'Awaken Identity — Create Humanistic Values',
  historySummary:
    'Kế thừa truyền thống gần 70 năm hình thành và phát triển từ Đại học Văn khoa Sài Gòn (thành lập năm 1957) và Đại học Tổng hợp TP.HCM, Trường Đại học Khoa học Xã hội và Nhân văn (ĐHQG-HCM) là cái nôi đào tạo, nghiên cứu khoa học xã hội và nhân văn lớn nhất khu vực phía Nam.',
  mission:
    'Đào tạo nguồn nhân lực chất lượng cao, tạo ra những công trình nghiên cứu khoa học tiêu biểu trong lĩnh vực khoa học xã hội và nhân văn; phục vụ cộng đồng và đóng góp tích cực cho sự phát triển văn hóa, kinh tế - xã hội của đất nước.',
  vision:
    'Trở thành trường đại học nghiên cứu thuộc tốp đầu trong các đại học hàng đầu châu Á về khoa học xã hội và nhân văn, nơi quy tụ các học giả uy tín và người học ưu tú.',
  educationalPhilosophy: 'Giáo dục Toàn diện - Khai phóng - Đa văn hóa',
  coreValues: ['Sáng tạo (Creativity)', 'Dẫn dắt (Leadership)', 'Trách nhiệm (Responsibility)'],
  stats: [
    {
      id: 'stat-years',
      value: '69',
      suffix: '+',
      label: 'Năm truyền thống',
      description: 'Hình thành và phát triển từ di sản Đại học Văn khoa (1957)',
      iconName: 'History',
    },
    {
      id: 'stat-majors',
      value: '49',
      suffix: '+',
      label: 'Ngành đào tạo',
      description: 'Gồm 49 ngành đại học, 34 ngành Thạc sĩ và 17 ngành Tiến sĩ',
      iconName: 'GraduationCap',
    },
    {
      id: 'stat-nations',
      value: '95',
      suffix: '+',
      label: 'Quốc gia & vùng lãnh thổ',
      description: 'Có sinh viên, học viên quốc tế đang học tập và nghiên cứu',
      iconName: 'Globe',
    },
    {
      id: 'stat-partners',
      value: '250',
      suffix: '+',
      label: 'Đối tác quốc tế',
      description: 'Mạng lưới liên kết học thuật toàn cầu tại 35 quốc gia',
      iconName: 'Handshake',
    },
    {
      id: 'stat-campuses',
      value: '2',
      suffix: '',
      label: 'Cơ sở đào tạo',
      description: 'Tọa lạc tại Quận 1 lịch sử và Khu đô thị ĐHQG TP. Thủ Đức',
      iconName: 'Building2',
    },
    {
      id: 'stat-clubs',
      value: '100',
      suffix: '+',
      label: 'CLB - Đội - Nhóm',
      description: 'Không gian trải nghiệm rực rỡ để Người Nhân Văn khẳng định bản sắc',
      iconName: 'Sparkles',
    },
  ],
  campuses: [
    {
      id: 'campus-saigon',
      name: 'Cơ sở Đinh Tiên Hoàng (Quận 1)',
      shortName: 'Cơ sở 1 • Trung tâm TP.HCM',
      address: '10 - 12 Đinh Tiên Hoàng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
      highlights: [
        'Khuôn viên di sản lịch sử giữa lòng thành phố',
        'Trung tâm đào tạo Sau đại học & Hợp tác quốc tế',
        'Thư viện Khoa học chuyên khảo và Viện nghiên cứu',
      ],
    },
    {
      id: 'campus-thuduc',
      name: 'Cơ sở Linh Trung (TP. Thủ Đức)',
      shortName: 'Cơ sở 2 • Khu Đô thị ĐHQG-HCM',
      address: 'Khu Đô thị ĐHQG-HCM, Phường Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh',
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80',
      highlights: [
        'Không gian đại học xanh, sinh thái rộng lớn',
        'Bảo tàng Lịch sử - Văn hóa và Nhà thi đấu đa năng',
        'Khu phức hợp giảng đường số và Thư viện Trung tâm',
      ],
    },
  ],
};

export const aboutService = {
  async getAboutData(): Promise<AboutUniversityData> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return MOCK_ABOUT_DATA;
  },
};
