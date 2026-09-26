import { NavItem, UserProfile } from '@/types/navigation';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Trang chủ', href: '#home' },
  { label: 'Tin tức - Sự kiện', href: '#news' },
  {
    label: 'Ký Nhân văn',
    href: '#people',
  },
  {
    label: 'Phút thư giãn',
    href: '#entertainment',
    hasDropdown: true,
    dropdownItems: [
      {
        label: 'Minigame hằng tháng',
        href: '/phut-thu-gian/minigame',
        description: 'Khoanh chữ - Tìm dấu ấn Nhân Văn',
      },
      {
        label: 'Bài Funny',
        href: '/phut-thu-gian/chuyen-vui',
        description: 'Sáng Quận 1, chiều Thủ Đức: Khi công chức Nhân Văn hoá phượt thủ',
      },
    ],
  },
  {
    label: 'Khoảnh khắc Nhân Văn',
    href: '#gallery',
  },
];

export const CURRENT_USER: UserProfile = {
  id: 'usr_ussh_001',
  name: 'Nguyễn Lâm Phương Thanh',
  title: 'Cô',
  department: 'Khoa Báo chí và Truyền thông',
  role: 'Quản trị viên',
  avatarUrl: '/images/avatar-female.svg',
  unreadNotifications: 3,
};

export const FOOTER_LINKS = {
  sitemap: [
    { label: 'Trang chủ', href: '#home' },
    { label: 'Tin tức - Sự kiện', href: '#news' },
    { label: 'Ký Nhân văn', href: '#people' },
    { label: 'Phút thư giãn', href: '#entertainment' },
    { label: 'Khoảnh khắc Nhân Văn', href: '#gallery' },
  ],
  internalPortals: [
    { label: 'Cổng thông tin Đào tạo', href: 'https://hcmussh.edu.vn', external: true },
    { label: 'Hệ thống Email Công vụ VNU-HCM', href: 'https://mail.vnuhcm.edu.vn', external: true },
    { label: 'Thư viện Trung tâm ĐHQG-HCM', href: 'https://vnulib.edu.vn', external: true },
    { label: 'Cổng Quản lý Khoa học & Công nghệ', href: 'https://hcmussh.edu.vn', external: true },
    { label: 'Công đoàn & Đoàn thể Nhà trường', href: 'https://hcmussh.edu.vn', external: true },
  ],
  contacts: {
    campus1: '10-12 Đinh Tiên Hoàng, P. Bến Nghé, Quận 1, TP.HCM',
    campus2: 'Khu đô thị ĐHQG-HCM, TP. Thủ Đức, TP.HCM',
    phone: '(028) 3829 3828',
    email: 'insideussh@gmail.com',
    website: 'https://hcmussh.edu.vn',
  },
  socials: [
    { name: 'Facebook', href: 'https://www.facebook.com/ussh.vnuhcm', icon: 'Facebook' },
    { name: 'YouTube', href: 'https://www.youtube.com/@HCMUSSHChannel', icon: 'Youtube' },
    { name: 'Zalo', href: 'https://zalo.me/usshvnuhcm', icon: 'MessageCircle' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/school/ussh-vnuhcm', icon: 'Linkedin' },
  ],
};
