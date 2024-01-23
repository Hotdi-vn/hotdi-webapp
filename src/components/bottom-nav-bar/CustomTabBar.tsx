'use client'

import { TabBar } from "@/components/common/antd_mobile_client_wrapper";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement } from "react";

export class TabIcon {
    activeIcon: ReactElement
    inactiveIcon: ReactElement

    constructor({ activeIcon, inactiveIcon }: { activeIcon: ReactElement, inactiveIcon: ReactElement }) {
        this.activeIcon = activeIcon
        this.inactiveIcon = inactiveIcon
    }
}

export class Tab {
    key: string
    title: string
    icon: TabIcon

    constructor({ key, title, icon }: { key: string, title: string, icon: TabIcon }) {
        this.key = key
        this.title = title
        this.icon = icon
    }
}


export default function CustomTabBar({ tabs }: {
    tabs: Tab[]
}) {

    const router = useRouter();
    const pathname = usePathname();

    const setRouteActive = (value: string) => {
        router.push(value);
    }

    return (
        <TabBar defaultActiveKey='/' activeKey={pathname} onChange={value => setRouteActive(value)}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={(active: boolean) => (active ? item.icon.activeIcon : item.icon.inactiveIcon)} title={item.title} />
            ))}
        </TabBar>
    );
}