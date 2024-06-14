'use client';

import { Tab, Tabs } from "@/components/common/antd_mobile_client_wrapper";
import { useState } from "react";
import { InventoryTabName } from "@/model/market-data-model";

export default function InventoryTabData({ tabData = {}, defaultTab = InventoryTabName.InStock }: { tabData: Record<string, TabContent>; defaultTab?: InventoryTabName; }) {
    const [activeTab, setActiveTab] = useState<string>(defaultTab);

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
                    {Object.entries(tabData ?? {}).map((tab) => <Tab key={tab[0]} title={tab[1].title} className="bg-white" />
                    )}
                </Tabs>
            </div>
            <div>
                {tabData?.[activeTab]?.content}
            </div>
        </>
    );
}

export type TabContent = {
    title: JSX.Element;
    content: JSX.Element;
};

