import { NavBar } from "@/components/common/antd_mobile_client_wrapper";
import { BackButton } from "@/components/button/BackButton";
import ProductOperation from "@/components/product-operation/ProductOperation";
import { Suspense } from "react";
import { getCategories, getProductById } from "@/api-services/market-service";
import { OperationMode } from "@/constants/common-contants";

export default async function SellerShopProductUpdate(
    {
        params
    }:
        {
            params: { id: string }
        }
) {

    const productInfoRes = await getProductById(params.id, { populate: 'images' });
    const categoriesRes = await getCategories({ skip: 0, limit: 0 });

    const navBar =
        <NavBar backArrow={<BackButton redirectPath="/seller/shop/product" isConfirmedPrompt />} >
            <div className="text-xl text-left font-normal">Chỉnh sửa sản phẩm</div>
        </NavBar>;

    return (
        <>
            <div className='top'>{navBar}</div>
            <Suspense >
                <ProductOperation categories={categoriesRes.data} productInfo={productInfoRes.data} mode={OperationMode.Edit} />
            </Suspense>

        </>
    )
}