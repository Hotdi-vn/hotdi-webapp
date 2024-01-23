import { redirect } from "next/navigation";
import { getSession } from "@/server-actions/authentication-actions";
import { LOGIN_REDIRECT_URL_FIELD_NAME } from "@/constants/common-contants";
import { List, ListItem, NavBar, TabBar } from "@/components/common/antd_mobile_client_wrapper";
import Icon from '@/components/common/icon_component';

export default async function SellerShopProduct() {
    const session = await getSession();
    if (!session.isLoggedIn) {
        redirect(`/seller/login?${LOGIN_REDIRECT_URL_FIELD_NAME}=/seller/shop`);
    }

    const icons = <div className="flex flex-row gap-3.5">
        <div><Icon name='search' /></div>
        <div><Icon name='message' /></div>
    </div>;

    const navBar =
        <NavBar backArrow={<Icon name='arrowLeft' />} right={icons}>
            <div className="text-xl text-left font-normal">Quản Lý Sản Phẩm</div>
        </NavBar>;
    return (
        <>
            <div className='top'>{navBar}</div>
            <div>
                {/* {menuList} */}
            </div>
        </>
    )
}