import React from 'react';
import type { Metadata } from 'next';
import { FunnyStoryPageView } from '@/components/entertainment/FunnyStoryPageView';

export const metadata: Metadata = {
  title: 'Chuyện Vui Nhân Văn: Sáng Quận 1, Chiều Thủ Đức | Inside USSH',
  description:
    'Góc Funny: Khi công chức Nhân Văn hóa phượt thủ thành phố trên tuyến đường kết nối hai cơ sở Đinh Tiên Hoàng và Linh Xuân.',
  openGraph: {
    title: 'Chuyện Vui Nhân Văn: Sáng Quận 1, Chiều Thủ Đức | Inside USSH',
    description:
      'Góc Funny: Khi công chức Nhân Văn hóa phượt thủ thành phố trên hành trình xuyên thành phố nối liền hai cơ sở.',
    url: 'https://inside-ussh-portal.vercel.app/phut-thu-gian/chuyen-vui',
    type: 'article',
    images: [
      {
        url: 'https://inside-ussh-portal.vercel.app/images/docx/image2.png',
        width: 1200,
        height: 630,
        alt: 'Chuyện Vui Nhân Văn Inside USSH',
      },
    ],
  },
};

export default function FunnyStoryPage() {
  return <FunnyStoryPageView />;
}
