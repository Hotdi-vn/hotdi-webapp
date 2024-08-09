'use client'

import { ShopProfile } from "@/model/market-data-model";
import { List } from "antd-mobile";
import Icon from '@/components/common/icon_component';
import { useRouter } from "next/navigation";

export default function ShopMenu(
    {
        profile,
    }: {
        profile?: ShopProfile,
    }
) {
    const router = useRouter();
    return (
        <List>
            <List.Item arrow={<Icon name='navigateRight' />} onClick={() => {
                router.push(`/seller/shop/product`);
            }}>
                <div className="text-base font-semibold text-black">Quản Lý Sản Phẩm</div>
            </List.Item>
        </List>
    );
}