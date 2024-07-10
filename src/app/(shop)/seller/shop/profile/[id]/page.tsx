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
                province: {
                    code: '01',
                    name: '',
                    parent: '0'
                },
                city: {
                    code: '01',
                    name: 'TP Hồ Chí Minh',
                    parent: '0'
                },

                district: {
                    code: '01',
                    name: 'TP Thủ Đức',
                    parent: '0'
                },
                ward: {
                    code: '01',
                    name: 'Bình Trưng Tây',
                    parent: '0'
                },
                street: '370 Nguyễn Duy Trinh',
            }
        ],
    };

    return (
        <>
            <ShopProfileOperation profile={sellerProfile} />
        </>
    )
}