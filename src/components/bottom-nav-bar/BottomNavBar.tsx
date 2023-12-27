'use client'

import { TabBar } from "@/components/common/antd_mobile_client_wrapper";
import Icon from '@/components/common/icon_component'
import { usePathname, useRouter } from "next/navigation";

export default function BottomNavBar() {

    const router = useRouter();
    const pathname = usePathname();

    const setRouteActive = (value: string) => {
        router.push(value);
    }

    const tabs = [
        {
            key: '/',
            title: 'Home',
            icon: (active: boolean) => active ? <Icon name='homeActive' /> : <Icon name='home' />,
        },
        {
            key: '/farm-explorer',
            title: 'Dạo vườn',
            icon: (active: boolean) => active ? <Icon name='farmExplorerActive' /> : <Icon name='farmExplorer' />,
        },
        {
            key: '/me',
            title: 'Tôi',
            icon: (active: boolean) => active ? <Icon name='userActive' /> : <Icon name='user' />,
        },
    ]

    return (
        <TabBar defaultActiveKey='/' activeKey={pathname} onChange={value => setRouteActive(value)}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    );
}