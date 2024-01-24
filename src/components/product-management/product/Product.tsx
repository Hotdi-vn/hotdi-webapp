import { Button, Divider } from "@/components/common/antd_mobile_client_wrapper";
import { ProductInfo } from "@/model/market-data-model";
import Image from "next/image";
import Icon from "@/components/common/icon_component";
import ProductActions from "./ProductActions";
import Price from "@/components/common/Price";

export default function Product({ productInfo }: { productInfo?: ProductInfo }) {
    if (!productInfo) {
        return <div>No product Info</div>
    }
    return (
        <div className="flex flex-col bg-white p-3">
            <div className="flex flex-row gap-x-2.5">
                <div>
                    <Image width={76} height={76} src={productInfo.imageUrls.at(0) ?? ''} alt="product image" />
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
                        Kho hàng {productInfo.soldCount}
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <div>
                        <Icon name='cardSend' />
                    </div>
                    <div className="text-sm	font-normal text-[#8C8C8C]">
                        Đã bán {productInfo.soldCount}
                    </div>
                </div>
            </div>
            <Divider />
            <ProductActions inventoryStatus={productInfo.inventoryStatus} />
        </div>
    );
}