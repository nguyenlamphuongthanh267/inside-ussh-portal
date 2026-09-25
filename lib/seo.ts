export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Trường Đại học Khoa học Xã hội và Nhân văn, Đại học Quốc gia Thành phố Hồ Chí Minh',
    alternateName: ['USSH-VNUHCM', 'ĐH KHXH&NV ĐHQG-HCM', 'Inside USSH'],
    url: 'https://hcmussh.edu.vn',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&auto=format&fit=crop&q=80',
    description: 'Inside USSH - Bản tin nội bộ số dành riêng cho giảng viên, cán bộ, viên chức và người lao động Trường ĐH KHXH&NV, ĐHQG-HCM.',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '10-12 Đinh Tiên Hoàng',
        addressLocality: 'Quận 1',
        addressRegion: 'TP. Hồ Chí Minh',
        addressCountry: 'VN',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Khu Đô thị ĐHQG-HCM, Phường Linh Trung',
        addressLocality: 'TP. Thủ Đức',
        addressRegion: 'TP. Hồ Chí Minh',
        addressCountry: 'VN',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84-28-3829-3828',
      contactType: 'customer support',
      email: 'inside@hcmussh.edu.vn',
      availableLanguage: ['Vietnamese', 'English'],
    },
    sameAs: [
      'https://www.facebook.com/ussh.vnuhcm',
      'https://www.youtube.com/c/USSHVNUHCMChannel',
    ],
  };
}

export function generateNewsJsonLd(article: {
  title: string;
  summary: string;
  publishDate: string;
  imageUrl: string;
  authorName: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    image: [article.imageUrl],
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Inside USSH',
      logo: {
        '@type': 'ImageObject',
        url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&auto=format&fit=crop&q=80',
      },
    },
    mainEntityOfPage: `https://inside-ussh-portal.vercel.app/news/${article.slug}`,
  };
}
