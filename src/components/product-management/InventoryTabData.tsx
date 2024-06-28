'use client';

import { Tab, Tabs } from "@/components/common/antd_mobile_client_wrapper";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { InventoryTabName, ProductInfo } from "@/model/market-data-model";
import ProductInventory from "./product-inventory/ProductInventory";
import { ProductQuery } from "@/api-services/market-service";

export const InventoryDataContext = createContext<{
    activeTab: string,
    inventoryData: Record<string, TabData>,
    setInventoryData: Dispatch<SetStateAction<Record<string, TabData>>>,
    redirectPath?: string,
} | null>(null);

export default function InventoryTabData({
    tabData = {},
    defaultTab = InventoryTabName.InStock,
    redirectPath = '/seller/shop/product',
}: {
    tabData?: Record<string, TabData>,
    defaultTab?: InventoryTabName,
    redirectPath?: string,
}) {
    const [activeTab, setActiveTab] = useState<string>(defaultTab);
    const [inventoryData, setInventoryData] = useState<Record<string, TabData>>(tabData);
    const activeTabData = inventoryData?.[activeTab];
    redirectPath = redirectPath.concat(redirectPath.includes('?') ? '&' : '?', 'defaultTab=', activeTab);

    useEffect(() => {
        setActiveTab(defaultTab);
        setInventoryData(tabData);
    }, [defaultTab, tabData]);

    return (
        <>

            <div className="sticky top-16 z-10">
                <Tabs activeLineMode='full' stretch={false}
                    defaultActiveKey={InventoryTabName.InStock}
                    activeKey={activeTab}
                    onChange={(key) => {
                        setActiveTab(key);
                    }}
                >
                    {
                        Object.entries(inventoryData ?? {}).map(
                            (tab) =>
                                <Tab key={tab[0]} title={<TabTitle title={tab[1].title} total={tab[1].total} />} className="bg-white" />
                        )
                    }
                </Tabs>
            </div>
            <div>
                <InventoryDataContext.Provider value={{ redirectPath, activeTab, inventoryData, setInventoryData }}>
                    <ProductInventory key={activeTabData?.title}
                        initialProductList={activeTabData?.initialProductList}
                        query={activeTabData?.query} />
                </InventoryDataContext.Provider>
            </div>

        </>
    );
};

export type TabData = {
    title: InventoryTabName,
    total: number,
    initialProductList: ProductInfo[],
    query: ProductQuery
};

function TabTitle({ title, total }: { title: string; total: number; }) {
    return (
        <div className="flex flex-col items-center">
            <div className="text-sm text-black">{title}</div>
            <div className="text-xs">{total}</div>
        </div>
    );
};

