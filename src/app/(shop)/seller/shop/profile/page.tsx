import ShopProfileOperation from "@/components/shop-management/ShopProfileOperation"
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

    const shopProfile = await getMyShopProfile({ populate: 'avatarImageId' });

    return (
        <>
            <ShopProfileOperation profile={shopProfile?.data} />
        </>
    )
}