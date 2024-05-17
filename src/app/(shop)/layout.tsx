import type { Metadata } from 'next'
import '@/app/globals.css'
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
        <div className='app'>
          {children}
        </div>
      </body>
    </html >
  )
}
