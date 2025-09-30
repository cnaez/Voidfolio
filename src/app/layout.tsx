import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from './components/CustomCursor'

export const metadata: Metadata = {
  title: {
    default: 'Voidfolio',
    template: '%s | Void Studio',
  },
  description: 'Where Ideas Take Shape',
  applicationName: 'Voidfolio',
  themeColor: '#000000',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' }, // fallback .ico
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000', // Safari pinned tabs
      },
    ],
  },
  // openGraph: {
  //   type: 'website',
  //   locale: 'en_US',
  //   url: 'https://void.studio/',
  //   siteName: 'Void Studio',
  //   title: 'Void Studio',
  //   description:
  //     'Design + Development + Strategy. World-class digital experiences in one place.',
  //   images: [
  //     {
  //       url: 'https://void.studio/og-image.jpg',
  //       width: 1200,
  //       height: 630,
  //       alt: 'Void Studio – Digital Experiences',
  //     },
  //   ],
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@voidstudio',
  //   creator: '@voidstudio',
  //   images: ['https://void.studio/og-image.jpg'],
  // },
  alternates: {
    canonical: 'https://void.studio/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
