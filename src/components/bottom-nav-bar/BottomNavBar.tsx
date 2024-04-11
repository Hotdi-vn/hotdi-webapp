import Icon from '@/components/common/icon_component'
import { getSession } from "@/server-actions/authentication-actions";
import CustomTabBar from "./CustomTabBar";
import { Role } from '@/model/market-data-model';

export default async function BottomNavBar() {
    const session = await getSession();

    const tabs = [
        {
            key: '/',
            title: 'Home',
            icon: {
                activeIcon: <Icon name='homeActive' />,
                inactiveIcon: <Icon name='home' />
            },
        },
        {
            key: '/farm-explorer',
            title: 'Dạo vườn',
            icon: {
                activeIcon: <Icon name='farmExplorerActive' />,
                inactiveIcon: <Icon name='farmExplorer' />
            },
        },
        {
            key: '/seller/shop',
            title: 'Shop của tôi',
            icon: {
                activeIcon: <Icon name='shopActive' />,
                inactiveIcon: <Icon name='shop' />
            },
        },
        {
            key: '/me',
            title: 'Tôi',
            icon: {
                activeIcon: <Icon name='userActive' />,
                inactiveIcon: <Icon name='user' />
            },
        },
    ];

    const filteredTabs = tabs.filter(tab => {
        if ('/seller/shop' == tab.key && !session.userProfile?.roles?.some(role => role === Role.Seller)) {
            return false;
        }
        return true;
    });

    return (
        <CustomTabBar tabs={filteredTabs} />
    );
}