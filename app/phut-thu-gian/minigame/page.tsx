import React from 'react';
import type { Metadata } from 'next';
import { MinigamePageView } from '@/components/entertainment/MinigamePageView';

export const metadata: Metadata = {
  title: 'Minigame Hằng Tháng: Khoanh Chữ - Tìm Dấu Ấn Nhân Văn | Inside USSH',
  description:
    'Thể lệ Minigame hằng tháng dành cho cán bộ, giảng viên Trường ĐH KHXH&NV, ĐHQG-HCM. Tổng giải thưởng 5.000.000 đồng.',
  openGraph: {
    title: 'Minigame Hằng Tháng: Khoanh Chữ - Tìm Dấu Ấn Nhân Văn | Inside USSH',
    description:
      'Tìm 3 từ khóa trong rừng chữ, chọn số may mắn và nhận giải thưởng lên đến 1.000.000 đồng!',
    url: 'https://inside-ussh-portal.vercel.app/phut-thu-gian/minigame',
    type: 'website',
    images: [
      {
        url: 'https://inside-ussh-portal.vercel.app/images/docx/image20.png',
        width: 1200,
        height: 630,
        alt: 'Minigame Hằng Tháng Inside USSH',
      },
    ],
  },
};

export default function MinigamePage() {
  return <MinigamePageView />;
}
