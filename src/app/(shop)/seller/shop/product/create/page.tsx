import { redirect } from "next/navigation";
import { getSession } from "@/server-actions/authentication-actions";
import { LOGIN_REDIRECT_URL_FIELD_NAME } from "@/constants/common-contants";
import { NavBar } from "@/components/common/antd_mobile_client_wrapper";
import { BackButton } from "@/components/button/BackButton";
import ProductCreation from "@/components/product-creation/ProductCreation";
import { Suspense } from "react";

export default async function SellerShopProductCreate() {
    const session = await getSession();
    if (!session.isLoggedIn) {
        redirect(`/seller/login?${LOGIN_REDIRECT_URL_FIELD_NAME}=/seller/shop`);
    }

    const navBar =
        <NavBar backArrow={<BackButton redirectPath="/seller/shop/product" isConfirmedPrompt />} >
            <div className="text-xl text-left font-normal">Thêm sản phẩm</div>
        </NavBar>;

    return (
        <>
            <div className='top'>{navBar}</div>
            <Suspense>
                <ProductCreation />
            </Suspense>

        </>
    )
}