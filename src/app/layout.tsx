import type { Metadata } from 'next'
import './globals.css'
import { NavBar, TabBar, TabBarItem, SearchBar } from '@/components/common/antd_mobile_client_wrapper'
import Icon from '@/components/common/icon_component'
import useSession from '@/hooks/use-session'
import Application from '@/components/Application'
import { Be_Vietnam_Pro } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const bevietnam = Be_Vietnam_Pro({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

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
    <html lang="en" className={bevietnam.className}>
      <body>
        <Application>
          {children}
        </Application>
      </body>
    </html >
  )
}
