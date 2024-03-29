import { Tab, Tabs } from "@/components/common/antd_mobile_client_wrapper";
import ProductInventory from "./product-inventory/ProductInventory";
import { CollectionType, InventoryStatus, InventoryStatusDisplayValue, ProductInfo, PublishStatus, PublishStatusDisplayValue } from "@/model/market-data-model";

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

    const inStockProductList = [
        new ProductInfo("1", "Product 1", "description", ['/product-collection/demoProduct1.jpg'], 100, "HCM", CollectionType.NoiBatPhanPhat, 10, "", 0, "", 0, InventoryStatus.InStock, PublishStatus.Published, 'On'),
        new ProductInfo("2", "Product 2", "description", ['/product-collection/demoProduct2.jpg'], 100, "HCM", CollectionType.NoiBatPhanPhat, 10, "", 0, "", 0, InventoryStatus.InStock, PublishStatus.Published, 'On'),
        new ProductInfo("3", "Product 3", "description", ['/product-collection/demoProduct3.jpg'], 100, "HCM", CollectionType.NoiBatPhanPhat, 10, "", 0, "", 0, InventoryStatus.InStock, PublishStatus.Published, 'On'),
    ]

    const outOfStockProductList = [
        new ProductInfo("4", "Product 4", "description", ['/product-collection/demoProduct4.jpg'], 100, "HCM", CollectionType.NoiBatPhanPhat, 10, "", 0, "", 0, InventoryStatus.OutOfStock, PublishStatus.Published, 'On'),
        new ProductInfo("5", "Product 5", "description", ['/product-collection/demoProduct5.jpg'], 100, "HCM", CollectionType.NoiBatPhanPhat, 10, "", 0, "", 0, InventoryStatus.OutOfStock, PublishStatus.Published, 'On'),
        new ProductInfo("6", "Product 6", "description", ['/product-collection/demoProduct1.jpg'], 100, "HCM", CollectionType.NoiBatPhanPhat, 10, "", 0, "", 0, InventoryStatus.OutOfStock, PublishStatus.Published, 'On'),
        new ProductInfo("7", "Product 7", "description", ['/product-collection/demoProduct2.jpg'], 100, "HCM", CollectionType.NoiBatPhanPhat, 10, "", 0, "", 0, InventoryStatus.OutOfStock, PublishStatus.Published, 'On'),
    ]

    const hiddenProductList = [
        new ProductInfo("8", "Product 8", "description", ['/product-collection/demoProduct3.jpg'], 100, "HCM", CollectionType.NoiBatPhanPhat, 10, "", 0, "", 0, InventoryStatus.InStock, PublishStatus.Hidden, 'On'),
        new ProductInfo("9", "Product 9", "description", ['/product-collection/demoProduct4.jpg'], 100, "HCM", CollectionType.NoiBatPhanPhat, 10, "", 0, "", 0, InventoryStatus.InStock, PublishStatus.Hidden, 'On'),
        new ProductInfo("10", "Product 10", "description", ['/product-collection/demoProduct5.jpg'], 100, "HCM", CollectionType.NoiBatPhanPhat, 10, "", 0, "", 0, InventoryStatus.InStock, PublishStatus.Hidden, 'On'),
        new ProductInfo("11", "Product 11", "description", ['/product-collection/demoProduct1.jpg'], 100, "HCM", CollectionType.NoiBatPhanPhat, 10, "", 0, "", 0, InventoryStatus.InStock, PublishStatus.Hidden, 'On'),
        new ProductInfo("12", "Product 12", "description", ['/product-collection/demoProduct2.jpg'], 100, "HCM", CollectionType.NoiBatPhanPhat, 10, "", 0, "", 0, InventoryStatus.InStock, PublishStatus.Hidden, 'On'),
    ]

    const tabs = [
        {
            title: TabTitle({ title: InventoryStatusDisplayValue[InventoryStatus.InStock], total: inStockProductList.length }),
            content: <ProductInventory inventoryStatus={InventoryStatus.InStock} initialProductList={inStockProductList} />
        },
        {
            title: TabTitle({ title: InventoryStatusDisplayValue[InventoryStatus.OutOfStock], total: outOfStockProductList.length }),
            content: <ProductInventory inventoryStatus={InventoryStatus.OutOfStock} initialProductList={outOfStockProductList} />
        },
        {
            title: TabTitle({ title: PublishStatusDisplayValue[PublishStatus.Hidden], total: hiddenProductList.length }),
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