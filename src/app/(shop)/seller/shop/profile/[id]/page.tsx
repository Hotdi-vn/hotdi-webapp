import ShopProfileOperation from "@/components/shop-management/ShopProfileOperation"
import { SellerProfile, SellerProfileStatus } from "@/model/market-data-model";

export default async function SellerShopProfileUpdate({
    params,
    searchParams
}: {
    params: { id: string },
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}) {

    const sellerProfile: SellerProfile = {
        _id: '1',
        name: 'Sample Shop',
        description: 'Shop description',
        status: SellerProfileStatus.New,
        avatarUrl: '',
        coverImageUrl: '',
        createdAt: 0,
        createdBy: '',
        updatedAt: 0,
        updatedBy: '',
        addresses: [
            {
                province: '',
                city: 'TP Hồ Chí Minh',
                district: 'TP Thủ Đức',
                ward: 'Bình Trưng Tây',
                address: '370 Nguyễn Duy Trinh',
            },
        ],
    };

    return (
        <>
            <ShopProfileOperation profile={sellerProfile} />
        </>
    )
}