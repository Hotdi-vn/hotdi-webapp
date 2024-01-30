import type { Metadata } from 'next'
import '@/app/globals.css'

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
        <div className='app'>
          {children}
        </div>
      </body>
    </html >
  )
}
