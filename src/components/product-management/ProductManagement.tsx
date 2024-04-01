import { Tab, Tabs } from "@/components/common/antd_mobile_client_wrapper";
import ProductInventory from "./product-inventory/ProductInventory";
import { CollectionType, InventoryStatus, InventoryStatusDisplayValue, ProductInfo, PublishStatus, PublishStatusDisplayValue } from "@/model/market-data-model";
import { getMyProducts } from "@/api-services/market-service";

function TabTitle({ title, total }: { title: string, total: number }) {
    return (
        <div className="flex flex-col items-center">
            <div className="text-sm text-black">{title}</div>
            <div className="text-xs">{total}</div>
        </div>
    );
}

export default async function ProductManagement() {
    // TODO fetching product list by in inventory status
    const response = {
        "data": [
            {
                "_id": "string",
                "name": "string",
                "description": "string",
                "imageUrls": [
                    "string"
                ],
                "price": 0,
                "location": "string",
                "colectionType": "NoiBatPhanPhat",
                "soldCount": 0,
                "createdBy": "string",
                "createdAt": 0,
                "updatedBy": "string",
                "updatedAt": 0
            }
        ],
        "skip": 0,
        "limit": 0,
        "total": 10
    };

    const inStockProductResponse = await getMyProducts({ inventoryStatus: InventoryStatus.InStock, publishStatus: PublishStatus.Published, skip: 0, limit: 20 });
    const inStockProductList = inStockProductResponse.data;

    const outOfStockProductResponse = await getMyProducts({ inventoryStatus: InventoryStatus.OutOfStock, publishStatus: PublishStatus.Published, skip: 0, limit: 20 });
    const outOfStockProductList = outOfStockProductResponse.data;

    const hiddenProductResponse = await getMyProducts({ publishStatus: PublishStatus.Draft, skip: 0, limit: 20 });
    const hiddenProductList = hiddenProductResponse.data;

    const tabs = [
        {
            title: TabTitle({ title: InventoryStatusDisplayValue[InventoryStatus.InStock], total: inStockProductResponse.total }),
            content: <ProductInventory inventoryStatus={InventoryStatus.InStock} initialProductList={inStockProductList} />
        },
        {
            title: TabTitle({ title: InventoryStatusDisplayValue[InventoryStatus.OutOfStock], total: outOfStockProductResponse.total }),
            content: <ProductInventory inventoryStatus={InventoryStatus.OutOfStock} initialProductList={outOfStockProductList} />
        },
        {
            title: TabTitle({ title: PublishStatusDisplayValue[PublishStatus.Hidden], total: hiddenProductResponse.total }),
            content: <ProductInventory inventoryStatus={InventoryStatus.InStock} initialProductList={hiddenProductList} />
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