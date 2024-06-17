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

    return (
        <div>
            <InventoryTabData tabData={inventoryTabData} defaultTab={defaultTab} />
        </div>

    );
};

