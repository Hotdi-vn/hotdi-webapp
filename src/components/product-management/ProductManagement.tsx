import { Tab, Tabs } from "@/components/common/antd_mobile_client_wrapper";
import ProductInventory from "./product-inventory/ProductInventory";
import { InventoryStatus, InventoryStatusDisplayValue, PublishStatus, PublishStatusDisplayValue } from "@/model/market-data-model";
import { getMyProducts } from "@/server-actions/product-operation-actions";

function TabTitle({ title, total }: { title: string, total: number }) {
    return (
        <div className="flex flex-col items-center">
            <div className="text-sm text-black">{title}</div>
            <div className="text-xs">{total}</div>
        </div>
    );
}

export default async function ProductManagement() {
    const itemsPerLoading = 20;

    const inStockProductQuery = { inventoryStatus: InventoryStatus.InStock, publishStatus: PublishStatus.Published, skip: 0, limit: itemsPerLoading };
    const inStockProductResponse = await getMyProducts(inStockProductQuery);
    const inStockProductList = inStockProductResponse.data;

    const outOfStockProductQuery = { inventoryStatus: InventoryStatus.OutOfStock, publishStatus: PublishStatus.Published, skip: 0, limit: itemsPerLoading };
    const outOfStockProductResponse = await getMyProducts(outOfStockProductQuery);
    const outOfStockProductList = outOfStockProductResponse.data;

    const hiddenProductQuery = { publishStatus: PublishStatus.Draft, skip: 0, limit: itemsPerLoading };
    const hiddenProductResponse = await getMyProducts(hiddenProductQuery);
    const hiddenProductList = hiddenProductResponse.data;

    const tabs = [
        {
            title: TabTitle({ title: InventoryStatusDisplayValue[InventoryStatus.InStock], total: inStockProductResponse.total }),
            content: <ProductInventory initialProductList={inStockProductList} query={inStockProductQuery} />
        },
        {
            title: TabTitle({ title: InventoryStatusDisplayValue[InventoryStatus.OutOfStock], total: outOfStockProductResponse.total }),
            content: <ProductInventory initialProductList={outOfStockProductList} query={outOfStockProductQuery} />
        },
        {
            title: TabTitle({ title: PublishStatusDisplayValue[PublishStatus.Hidden], total: hiddenProductResponse.total }),
            content: <ProductInventory initialProductList={hiddenProductList} query={hiddenProductQuery} />
        },
    ];
    return (
        <Tabs activeLineMode='full' stretch={false}>
            {
                tabs.map((tab, index) =>
                    <Tab key={index} title={tab.title} className="bg-white">
                        {tab.content}
                    </Tab>
                )
            }
        </Tabs>
    );
}