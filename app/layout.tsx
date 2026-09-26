import type { Metadata, Viewport } from 'next';

import './globals.css';
import { TopAnnouncementBar } from '@/components/layout/TopAnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar';
import { generateOrganizationJsonLd } from '@/lib/seo';
import { ProjectIntroModal } from '@/components/intro/ProjectIntroModal';


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDFCF9' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1120' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://inside-ussh-portal.vercel.app'),
  title: {
    default: 'Inside USSH - Bản Tin Nội Bộ Trường ĐH KHXH&NV, ĐHQG-HCM',
    template: '%s | Inside USSH',
  },
  description:
    'Cổng thông tin nội bộ dành riêng cho cán bộ, giảng viên và người lao động Trường Đại học Khoa học Xã hội và Nhân văn, Đại học Quốc gia TP.HCM.',
  keywords: [
    'Inside USSH',
    'USSH VNUHCM',
    'Bản tin nội bộ',
    'Đại học Khoa học Xã hội và Nhân văn',
    'Giảng viên USSH',
    'Thông báo nội bộ',
  ],
  authors: [{ name: 'Ban Biên Tập Inside USSH', url: 'https://inside-ussh-portal.vercel.app' }],
  creator: 'Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM',
  publisher: 'Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Inside USSH - Bản Tin Nội Bộ Trường ĐH KHXH&NV, ĐHQG-HCM',
    description:
      'Không gian kết nối, chia sẻ và lan tỏa giá trị nhân văn của cán bộ, giảng viên USSH.',
    url: 'https://inside-ussh-portal.vercel.app',
    siteName: 'Inside USSH',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: 'https://inside-ussh-portal.vercel.app/images/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'Inside USSH - Báo cáo thực hành đề án môn Quan hệ công chúng',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inside USSH - Bản Tin Nội Bộ',
    description:
      'Cổng thông tin nội bộ dành cho giảng viên và cán bộ Trường ĐH KHXH&NV, ĐHQG-HCM.',
    images: ['https://inside-ussh-portal.vercel.app/images/og-preview.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { AutoScrollTop } from '@/components/layout/AutoScrollTop';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = generateOrganizationJsonLd();

  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FDFCF9] text-ussh-navy antialiased">
        {/* Reset scroll on page reload or fresh load */}
        <AutoScrollTop />

        {/* Skip to Main Content Link (WCAG AA Requirement) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-ussh-navy focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium text-xs"
        >
          Chuyển trực tiếp đến nội dung chính
        </a>

        {/* Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Section 1: Top Announcement Bar */}
        <TopAnnouncementBar />

        {/* Section 2: Header & Sticky Navigation */}
        <Header />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 w-full max-w-full overflow-x-hidden">
          {children}
        </main>

        {/* Section 9: Footer */}
        <Footer />

        {/* Course & Project Celebration Intro Modal */}
        <ProjectIntroModal />
      </body>
    </html>
  );
}
