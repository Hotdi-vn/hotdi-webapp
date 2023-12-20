import type { Metadata } from 'next'
import './globals.css'
import Application from '@/components/Application'

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
    <html lang="en">
      <body>
        <Application>
          {children}
        </Application>
      </body>
    </html >
  )
}
