import { redirect } from "next/navigation";
import { getSession } from "@/server-actions/authentication-actions";
import { LOGIN_REDIRECT_URL_FIELD_NAME } from "@/constants/common-contants";
import { List, ListItem, NavBar } from "@/components/common/antd_mobile_client_wrapper";
import Icon from '@/components/common/icon_component';
import Link from "next/link";
import ShopInfoCard from "@/components/shop-management/ShopInfoCard";
import { getMyShopProfile } from "@/server-actions/shop-operation-actions";
import { ShopProfileStatus } from "@/model/market-data-model";
import ShopMenu from "@/components/shop-management/ShopMenu";
import ShopOnboardGuidance from "@/components/shop-management/ShopOnboardGuidance";
import { getMyProducts } from "@/server-actions/product-operation-actions";

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

    const shopProfileRes = await getMyShopProfile({ populate: 'avatarImageId' });
    const shopProfile = shopProfileRes?.data;
    const sessionData = await getSession();
    const productRes = await getMyProducts();
    const hasProductCreated = productRes.total > 0;
    const isShowOnboardGuidance = hasProductCreated && shopProfile?.status === ShopProfileStatus.Approved;

    return (
        <div className="flex flex-col gap-2">
            <div className='top'>{navBar}</div>
            <div hidden={!isShowOnboardGuidance}>
                <ShopInfoCard profile={shopProfile} />
            </div>
            <div hidden={isShowOnboardGuidance}>
                <ShopOnboardGuidance shopProfile={shopProfile} userProfile={sessionData.userProfile} hasProductCreated={hasProductCreated} />
            </div>
            <div>
                <ShopMenu profile={shopProfile} />
            </div>
        </div>
    )
}