import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HeartPost',
  description: 'HeartPost - Trải nghiệm thư và thiệp điện tử chân thật như cầm trên tay.',
  generator: 'HeartPost',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // Thêm suppressHydrationWarning={true} vào đây
    <html lang="en" suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  )
}