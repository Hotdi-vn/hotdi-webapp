import { redirect } from "next/navigation";
import { getSession } from "@/server-actions/authentication-actions";
import { LOGIN_REDIRECT_URL_FIELD_NAME } from "@/constants/common-contants";
import ProductOperation from "@/components/product-operation/ProductOperation";
import { getCategories } from "@/api-services/market-service";

export default async function SellerShopProductCreate() {
    const session = await getSession();
    if (!session.isLoggedIn) {
        redirect(`/seller/login?${LOGIN_REDIRECT_URL_FIELD_NAME}=/seller/shop`);
    }

    const categoriesRes = await getCategories({ skip: 0, limit: 0 });

    return (
        <>
            <ProductOperation categories={categoriesRes.data} />
        </>
    )
}