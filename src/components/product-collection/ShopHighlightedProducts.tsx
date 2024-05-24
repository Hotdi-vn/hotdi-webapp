import React from 'react';
import ProductList from "./ProductList";
import { ProductInfo } from '@/model/market-data-model';
import { getNoCache } from '@/utils/server-side-fetching';

export default async function ShopHighlightedProducts({ shopId }: { shopId: string }) {
    const response = await getNoCache<ProductInfo[]>(`/market/v1/sellers/${shopId}/products`);

    if (response.error) {
        return <div>{`Server error! Code: ${response.error.code}`}</div>
    }

    const title = <div className='text-base font-medium'>Sản Phẩm Nổi Bật</div>;

    return (
        <div className=''>
            <ProductList products={response.data} title={title} readMoreLink={`/shop/${shopId}/products`} showLocation={false} />
        </div>
    )
}