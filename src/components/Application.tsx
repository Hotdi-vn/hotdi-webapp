'use client'

import { TabBar, TabBarItem } from "./common/antd_mobile_client_wrapper";
import Icon from '@/components/common/icon_component'

export default function Application({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='app'>
            <div className='body'>
                {children}
            </div>
            <div className='bottom'>
                <TabBar defaultActiveKey='home'>
                    <TabBarItem key='home' title='Home' icon={<Icon name='home' />} />
                    <TabBarItem key='farmExplore' title='Dạo vườn' icon={<Icon name='farmExplorer' />} />
                    <TabBarItem key='personalCenter' title='Tôi' icon={<Icon name='user' />} />
                </TabBar>
            </div>
        </div>
    );
}