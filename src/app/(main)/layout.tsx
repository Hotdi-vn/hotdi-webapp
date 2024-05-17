import type { Metadata } from 'next'
import '@/app/globals.css'
import Application from '@/components/Application'
import { beVietnamPro } from '@/fonts/fonts'

export const metadata: Metadata = {
  title: 'Hotdi',
  description: 'Hotdi.vn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={`${beVietnamPro.variable}`}>
      <body>
        <Application>
          {children}
        </Application>
      </body>
    </html >
  )
}
