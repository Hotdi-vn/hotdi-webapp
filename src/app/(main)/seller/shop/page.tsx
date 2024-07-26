import { redirect } from "next/navigation";
import { getSession } from "@/server-actions/authentication-actions";
import { LOGIN_REDIRECT_URL_FIELD_NAME } from "@/constants/common-contants";
import { List, ListItem, NavBar } from "@/components/common/antd_mobile_client_wrapper";
import Icon from '@/components/common/icon_component';
import Link from "next/link";
import ShopInfoCard from "@/components/shop-management/ShopInfoCard";
import { getMyShopProfile } from "@/server-actions/shop-operation-actions";

export default async function SellerShop() {
    const session = await getSession();
    if (!session.isLoggedIn) {
        redirect(`/seller/login?${LOGIN_REDIRECT_URL_FIELD_NAME}=/seller/shop`);
    }

    const icons = <div className="flex flex-row gap-3.5">
        <div><Icon name='setting' /></div>
        <div><Icon name='notification' /></div>
        <div><Icon name='message' /></div>
    </div>;

    const navBar =
        <NavBar back={null} right={icons}>
            <div className="text-xl text-left font-normal">Shop Của Tôi</div>
        </NavBar>;

    const shopProfile = await getMyShopProfile({ populate: 'avatarImageId' });

    const menuList =
        <List>
            <ListItem arrow={<Icon name='navigateRight' />}>
                <Link href='/seller/shop/product'>
                    <div className="text-base font-semibold text-black">Quản Lý Sản Phẩm</div>
                </Link>
            </ListItem>
        </List>;
    return (
        <div className="flex flex-col gap-2">
            <div className='top'>{navBar}</div>
            <div>
                <ShopInfoCard profile={shopProfile?.data} />
            </div>
            <div>
                {menuList}
            </div>
        </div>
    )
}