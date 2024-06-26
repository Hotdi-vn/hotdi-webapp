import { redirect } from "next/navigation";
import { getSession } from "@/server-actions/authentication-actions";
import { LOGIN_REDIRECT_URL_FIELD_NAME } from "@/constants/common-contants";
import { NavBar } from "@/components/common/antd_mobile_client_wrapper";
import Icon from '@/components/common/icon_component';
import ProductManagement from "@/components/product-management/ProductManagement";
import { BackButton } from "@/components/button/BackButton";
import { NavigationButton } from "@/components/button/NavigationButton";
import { Suspense } from "react";
import { SkeletonParagraph } from "antd-mobile/es/components/skeleton/skeleton";
import { InventoryTabName } from "@/model/market-data-model";
import Link from "next/link";

export default async function SellerShopProduct({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const icons = <div className="flex flex-row gap-3.5">
        <div>
            <Link href={`/seller/shop/product/search`}>
                <Icon name='search' />
            </Link>
        </div>
        <div><Icon name='message' /></div>
    </div>;

    const navBar =
        <NavBar backArrow={<BackButton redirectPath="/seller/shop" />} right={icons} >
            <div className="text-xl text-left font-normal">Quản Lý Sản Phẩm</div>
        </NavBar>;

    return (
        <>
            <div className='body'>
                <div className='top'>
                    {navBar}
                </div>
                <div>
                    <Suspense fallback={<SkeletonParagraph animated lineCount={26} />}>
                        <ProductManagement defaultTab={searchParams['defaultTab'] as InventoryTabName} />
                    </Suspense>
                </div>
            </div>
            <div className='bottom p-2'>
                <NavigationButton path="/seller/shop/product/create" block={true} color='primary'>Thêm sản phẩm mới</NavigationButton>
            </div>
        </>
    )
}