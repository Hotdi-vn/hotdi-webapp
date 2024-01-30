import { InventoryStatus, ProductInfo } from "@/model/market-data-model";
import Product from "../product/Product";

export default async function ProductInventory(
    { inventoryStatus, initialProductList = [] }:
        { inventoryStatus: InventoryStatus, initialProductList?: ProductInfo[] }
) {
    return (
        <div className="flex flex-col gap-2">
            {
                initialProductList.map(product =>
                    <Product key={product._id} productInfo={product} />
                )
            }
        </div>
    );
}
