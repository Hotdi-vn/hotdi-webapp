'use client'

import { useEffect, useState, useTransition } from "react";
import { ErrorBlock, NavBar, SearchBar } from "antd-mobile";
import { getMyProducts } from "@/server-actions/product-operation-actions";
import { BackButton } from "../button/BackButton";
import InventoryTabData, { TabData } from "../product-management/InventoryTabData";
import { InventoryStatus, InventoryTabName, PublishStatus } from "@/model/market-data-model";
import { SkeletonParagraph } from "antd-mobile/es/components/skeleton/skeleton";

export default function ProductSearch({
    defaultSearchValue,
    defaultTab = InventoryTabName.InStock,
}: {
    defaultSearchValue?: string,
    defaultTab?: InventoryTabName,
}) {
    const itemsPerLoading = 20;
    const [inventoryData, setInventoryData] = useState<Record<string, TabData>>();
    const [searchValue, setSearchValue] = useState<string>(defaultSearchValue ?? '');
    const [pending, startSearch] = useTransition();

    async function search(value: string) {
        startSearch(async () => {
            const inStockProductQuery = { search: value, inventoryStatus: InventoryStatus.InStock, publishStatus: PublishStatus.Published, skip: 0, limit: itemsPerLoading, populate: 'images' };
            const inStockProductResponse = await getMyProducts(inStockProductQuery);
            const inStockProductList = inStockProductResponse.data;

            const outOfStockProductQuery = { search: value, nventoryStatus: InventoryStatus.OutOfStock, publishStatus: PublishStatus.Published, skip: 0, limit: itemsPerLoading, populate: 'images' };
            const outOfStockProductResponse = await getMyProducts(outOfStockProductQuery);
            const outOfStockProductList = outOfStockProductResponse.data;

            const hiddenProductQuery = { search: value, publishStatus: PublishStatus.Draft, skip: 0, limit: itemsPerLoading, populate: 'images' };
            const hiddenProductResponse = await getMyProducts(hiddenProductQuery);
            const hiddenProductList = hiddenProductResponse.data;

            const inventoryTabData = {
                [InventoryTabName.InStock]: {
                    title: InventoryTabName.InStock,
                    total: inStockProductResponse.total,
                    initialProductList: inStockProductList,
                    query: inStockProductQuery
                },
                [InventoryTabName.OutOfStock]: {
                    title: InventoryTabName.OutOfStock,
                    total: outOfStockProductResponse.total,
                    initialProductList: outOfStockProductList,
                    query: outOfStockProductQuery
                },
                [InventoryTabName.Hidden]: {
                    title: InventoryTabName.Hidden,
                    total: hiddenProductResponse.total,
                    initialProductList: hiddenProductList,
                    query: hiddenProductQuery
                },
            }
            setInventoryData(inventoryTabData);
            setSearchValue(value);
        });
    }

    useEffect(() => {
        if (searchValue) {
            search(searchValue);
        }
    }, []);

    const navBar =
        <NavBar backArrow={<BackButton redirectPath="/seller/shop/product" />} >
            <SearchBar defaultValue={defaultSearchValue} placeholder='tìm ở đây nè...' onSearch={search} />
        </NavBar>;

    return (
        <>
            <div className='body'>
                <div className='top'>{navBar}</div>
                {
                    pending ?
                        <SkeletonParagraph animated lineCount={28} />
                        :
                        inventoryData ?
                            <div>
                                <InventoryTabData redirectPath={`/seller/shop/product/search?defaultSearchValue=${searchValue}`} tabData={inventoryData} defaultTab={defaultTab} />
                            </div>
                            :
                            <div className="flex justify-center">
                                <ErrorBlock status='empty' fullPage title={''} description={''} />
                            </div>
                }
            </div>

        </>
    );
}
