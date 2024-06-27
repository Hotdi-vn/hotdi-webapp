import ProductOperation from "@/components/product-operation/ProductOperation";
import { getCategories } from "@/api-services/market-service";

export default async function SellerShopProductCreate() {
    const categoriesRes = await getCategories({ skip: 0, limit: 0 });

    return (
        <>
            <ProductOperation categories={categoriesRes.data} />
        </>
    )
}