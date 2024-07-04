export default async function SellerShopProfileUpdate({
    params,
    searchParams
}: {
    params: { id: string },
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}) {
    return (
        <div>
            Shop profile page {params.id}
        </div>
    )
}