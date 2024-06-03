import { Button, Divider } from "@/components/common/antd_mobile_client_wrapper";
import { ImageInfo, InventoryStatus, ProductInfo } from "@/model/market-data-model";
import Image from "next/image";
import Icon from "@/components/common/icon_component";
import ProductActions from "./ProductActions";
import Price from "@/components/common/Price";
import { ReactNode } from "react";
import { LOCALE_VN } from "@/constants/locales";

export default function Product({ productInfo }: { productInfo?: ProductInfo }) {
    if (!productInfo) {
        return <div>No product Info</div>
    }

    function displayInventory(productInfo: ProductInfo): ReactNode {
        if (productInfo.inventoryManagementOption) {
            return productInfo.stockQuantity > 0 ? `Còn hàng ${productInfo.stockQuantity.toLocaleString(LOCALE_VN)}` : `Hết hàng ${productInfo.stockQuantity}`;
        } else {
            return productInfo.inventoryStatus === InventoryStatus.InStock ? `Còn hàng` : `Hết hàng`;
        }
    }

    return (
        <div className="flex flex-col bg-white p-3">
            <div className="flex flex-row gap-x-2.5">
                <div>
                    <Image width={76} height={76} src={(productInfo.images.at(0) as ImageInfo)?.url ?? ''} alt="product image" />
                </div>
                <div className="flex flex-col justify-between">
                    <div className="text-base font-normal">
                        {productInfo.name}
                    </div>
                    <div>
                        <Price price={productInfo.price} />
                    </div>
                </div>
            </div>
            <Divider />
            <div className="grid grid-flow-col justify-items-start">
                <div className="flex flex-row gap-2">
                    <div>
                        <Icon name='cardReceive' />
                    </div>
                    <div className="text-sm	font-normal text-[#8C8C8C]">
                        {
                            displayInventory(productInfo)
                        }
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <div>
                        <Icon name='cardSend' />
                    </div>
                    <div className="text-sm	font-normal text-[#8C8C8C]">
                        Đã bán {productInfo.soldCount.toLocaleString(LOCALE_VN)}
                    </div>
                </div>
            </div>
            <Divider />
            <ProductActions productInfo={productInfo} />
        </div>
    );
}