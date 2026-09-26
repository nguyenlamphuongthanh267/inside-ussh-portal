import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { peopleService } from '@/lib/services/peopleService';
import { PersonArticleView } from '@/components/people/PersonArticleView';

export const metadata: Metadata = {
  title: 'GS. TS. NGND. Ngô Văn Lệ: Giữ Lửa Nhân Văn Từ Những Ngày Gian Khó',
  description:
    'Ký Nhân văn: Bài viết khắc họa chân dung GS.TS.NGND Ngô Văn Lệ - Nguyên Hiệu trưởng Trường ĐH KHXH&NV, ĐHQG-HCM (1999 - 2007). Tác giả: THẢO QUYÊN.',
  openGraph: {
    title: 'GS. TS. NGND. Ngô Văn Lệ: Giữ Lửa Nhân Văn Từ Những Ngày Gian Khó | Inside USSH',
    description:
      'Ký chân dung: Người thầy thương binh 4/4 từ chiến trường Nam Lào, giữ trọn cốt cách nhà khoa học mẫu mực và tình người gắn bó dưới mái trường Nhân Văn.',
    url: 'https://inside-ussh-portal.vercel.app/ky-nhan-van/ngo-van-le',
    type: 'article',
    images: [
      {
        url: 'https://inside-ussh-portal.vercel.app/images/docx/image18.jpg',
        width: 1200,
        height: 630,
        alt: 'GS.TS.NGND Ngô Văn Lệ - Nguyên Hiệu trưởng Trường ĐH KHXH&NV, ĐHQG-HCM',
      },
    ],
  },
};

export default async function MemoirArticlePage() {
  const person = await peopleService.getPersonById('ppl_ngo_van_le');

  if (!person) {
    notFound();
  }

  return <PersonArticleView person={person} />;
}
