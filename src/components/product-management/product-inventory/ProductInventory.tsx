'use client'

import { ProductInfo } from "@/model/market-data-model";
import Product from "../product/Product";
import { useEffect, useState } from "react";
import { InfiniteScroll } from "antd-mobile";
import { ProductQuery } from "@/api-services/market-service";
import InfiniteScrollContent from "@/components/common/InfiniteScrollContent";
import { getMyProducts } from "@/server-actions/product-operation-actions";

export default function ProductInventory(
    { initialProductList = [], query }:
        {
            initialProductList?: ProductInfo[], query: ProductQuery
        }
) {
    const [productList, setProductList] = useState<ProductInfo[]>(initialProductList);
    const [hasMore, setHasMore] = useState(true);

    async function loadMoreProducts() {
        query.skip = productList.length;
        const responseData = await getMyProducts(query);
        setProductList(pre => [...pre, ...responseData.data]);
        setHasMore(productList.length < (responseData.total));
    }

    useEffect(() => {
        setProductList(initialProductList);
    }, [initialProductList]);

    return (
        <div className="flex flex-col gap-2">
            {

                productList.map(product =>
                    <Product key={product._id} productInfo={product} />
                )
            }
            <InfiniteScroll loadMore={loadMoreProducts} hasMore={hasMore} threshold={20}>
                <InfiniteScrollContent hasMore={hasMore} loadingMessage="Đang tải sản phẩm" noMoreDataMessage="Đã hết sản phẩm" />
            </InfiniteScroll>
        </div>
    );
}
