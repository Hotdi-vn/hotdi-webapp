import type { Metadata } from 'next'
import './globals.css'
import { NavBar, TabBar, TabBarItem, SearchBar } from '@/components/common/antd_mobile_client_wrapper'
import Icon from '@/components/common/icon_component'
import useSession from '@/hooks/use-session'
import Application from '@/components/Application'
import { Be_Vietnam_Pro } from 'next/font/google'
 
const bevietnam = Be_Vietnam_Pro({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['vietnamese'],
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
        <div>Hello</div>
        <Application>
          {children}
        </Application>
      </body>
    </html >
  )
}
