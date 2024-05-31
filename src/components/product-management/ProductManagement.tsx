'use client'

import { Tab, Tabs } from "@/components/common/antd_mobile_client_wrapper";
import ProductInventory from "./product-inventory/ProductInventory";
import { InventoryStatus, PublishStatus } from "@/model/market-data-model";
import { getMyProducts } from "@/server-actions/product-operation-actions";
import { useEffect, useState } from "react";

function TabTitle({ title, total }: { title: string, total: number }) {
    return (
        <div className="flex flex-col items-center">
            <div className="text-sm text-black">{title}</div>
            <div className="text-xs">{total}</div>
        </div>
    );
}

enum TabName {
    InStock = 'Còn hàng',
    OutOfStock = 'Hết hàng',
    Hidden = 'Đang ẩn',
}

type TabContent = {
    title: JSX.Element;
    content: JSX.Element;

}

export default function ProductManagement() {
    const [activeTab, setActiveTab] = useState<string>(TabName.InStock);
    const [tabData, setTabData] = useState<Record<string, TabContent>>({});
    const itemsPerLoading = 20;

    async function fetchTabData() {
        const inStockProductQuery = { inventoryStatus: InventoryStatus.InStock, publishStatus: PublishStatus.Published, skip: 0, limit: itemsPerLoading, populate: 'images' };
        const inStockProductResponse = await getMyProducts(inStockProductQuery);
        const inStockProductList = inStockProductResponse.data;

        const outOfStockProductQuery = { inventoryStatus: InventoryStatus.OutOfStock, publishStatus: PublishStatus.Published, skip: 0, limit: itemsPerLoading, populate: 'images' };
        const outOfStockProductResponse = await getMyProducts(outOfStockProductQuery);
        const outOfStockProductList = outOfStockProductResponse.data;

        const hiddenProductQuery = { publishStatus: PublishStatus.Draft, skip: 0, limit: itemsPerLoading, populate: 'images' };
        const hiddenProductResponse = await getMyProducts(hiddenProductQuery);
        const hiddenProductList = hiddenProductResponse.data;

        setTabData({
            [TabName.InStock]: {
                title: TabTitle({ title: TabName.InStock, total: inStockProductResponse.total }),
                content: <ProductInventory key={TabName.InStock} initialProductList={inStockProductList} query={inStockProductQuery} />
            },
            [TabName.OutOfStock]: {
                title: TabTitle({ title: TabName.OutOfStock, total: outOfStockProductResponse.total }),
                content: <ProductInventory key={TabName.OutOfStock} initialProductList={outOfStockProductList} query={outOfStockProductQuery} />
            },
            [TabName.Hidden]: {
                title: TabTitle({ title: TabName.Hidden, total: hiddenProductResponse.total }),
                content: <ProductInventory key={TabName.Hidden} initialProductList={hiddenProductList} query={hiddenProductQuery} />
            },
        });
    }

    useEffect(() => {
        fetchTabData();
    }, []);

    return (
        <div>
            <div className="sticky top-16 z-10">
                <Tabs activeLineMode='full' stretch={false}
                    defaultActiveKey={TabName.InStock}
                    activeKey={activeTab}
                    onChange={(key) => {
                        setActiveTab(key);
                    }}
                >
                    {
                        Object.entries(tabData ?? {}).map((tab) =>
                            <Tab key={tab[0]} title={tab[1].title} className="bg-white" />
                        )
                    }
                </Tabs>
            </div>
            <div>
                {
                    tabData?.[activeTab]?.content
                }
            </div>

        </div>

    );
}