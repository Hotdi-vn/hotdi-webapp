import type { Metadata } from 'next'
import './globals.css'
import { NavBar, TabBar, TabBarItem, SearchBar } from '@/components/common/antd_mobile_client_wrapper'
import Icon from '@/components/common/icon_component'

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
      <body className='app'>
        <div className='top'>
          <NavBar backArrow={false} right={<Icon name='shoppingBag' />}>
            <SearchBar placeholder='Tìm kiếm' />
          </NavBar>
        </div>
        <div className='body'>{children}</div>
        <div className='bottom'>l
          <TabBar defaultActiveKey='home'>
            <TabBarItem key='home' title='Home' icon={<Icon name='home' />} />
            <TabBarItem key='farmExplore' title='Dạo vườn' icon={<Icon name='farmExplorer' />} />
            <TabBarItem key='personalCenter' title='Tôi' icon={<Icon name='user' />} />
          </TabBar>
        </div>
      </body>

    </html>
  )
}
