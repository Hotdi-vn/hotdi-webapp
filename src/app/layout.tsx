import type { Metadata } from 'next'
import './globals.css'
import { NavBar, TabBar, TabBarItem, SearchBar } from '@/components/common/antd_mobile_client_wrapper'
import Icon from '@/components/common/icon_component'
import useSession from '@/hooks/use-session'
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
