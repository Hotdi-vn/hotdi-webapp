import ShopProfileOperation from "@/components/shop-management/ShopProfileOperation"
import { ShopProfile, ShopProfileStatus } from "@/model/market-data-model";
import { getMyShopProfile } from "@/server-actions/shop-operation-actions";

export default async function SellerShopProfileUpdate({
    params,
    searchParams
}: {
    params: { id: string },
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}) {

    const shopProfile = await getMyShopProfile();

    return (
        <>
            <ShopProfileOperation profile={shopProfile?.data} />
        </>
    )
}