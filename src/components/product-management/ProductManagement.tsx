import ProductInventory from "./product-inventory/ProductInventory";
import { InventoryStatus, PublishStatus } from "@/model/market-data-model";
import InventoryTabData from "./InventoryTabData";
import { getMyProducts } from "@/api-services/market-service";
import { InventoryTabName } from "@/model/market-data-model";

export default async function ProductManagement({ defaultTab = InventoryTabName.InStock }: { defaultTab?: InventoryTabName }) {
    const itemsPerLoading = 20;

    const inStockProductQuery = { inventoryStatus: InventoryStatus.InStock, publishStatus: PublishStatus.Published, skip: 0, limit: itemsPerLoading, populate: 'images' };
    const inStockProductResponse = await getMyProducts(inStockProductQuery);
    const inStockProductList = inStockProductResponse.data;

    const outOfStockProductQuery = { inventoryStatus: InventoryStatus.OutOfStock, publishStatus: PublishStatus.Published, skip: 0, limit: itemsPerLoading, populate: 'images' };
    const outOfStockProductResponse = await getMyProducts(outOfStockProductQuery);
    const outOfStockProductList = outOfStockProductResponse.data;

    const hiddenProductQuery = { publishStatus: PublishStatus.Draft, skip: 0, limit: itemsPerLoading, populate: 'images' };
    const hiddenProductResponse = await getMyProducts(hiddenProductQuery);
    const hiddenProductList = hiddenProductResponse.data;

    const tabData = {
        [InventoryTabName.InStock]: {
            title: TabTitle({ title: InventoryTabName.InStock, total: inStockProductResponse.total }),
            content: <ProductInventory key={InventoryTabName.InStock} initialProductList={inStockProductList} query={inStockProductQuery} />
        },
        [InventoryTabName.OutOfStock]: {
            title: TabTitle({ title: InventoryTabName.OutOfStock, total: outOfStockProductResponse.total }),
            content: <ProductInventory key={InventoryTabName.OutOfStock} initialProductList={outOfStockProductList} query={outOfStockProductQuery} />
        },
        [InventoryTabName.Hidden]: {
            title: TabTitle({ title: InventoryTabName.Hidden, total: hiddenProductResponse.total }),
            content: <ProductInventory key={InventoryTabName.Hidden} initialProductList={hiddenProductList} query={hiddenProductQuery} />
        },
    }

    return (
        <div>
            <InventoryTabData tabData={tabData} defaultTab={defaultTab} />
        </div>

    );
}

function TabTitle({ title, total }: { title: string; total: number; }) {
    return (
        <div className="flex flex-col items-center">
            <div className="text-sm text-black">{title}</div>
            <div className="text-xs">{total}</div>
        </div>
    );
}

