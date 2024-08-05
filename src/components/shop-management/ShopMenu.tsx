'use client'

import { ShopProfile, ShopProfileStatus } from "@/model/market-data-model";
import { List, Modal } from "antd-mobile";
import Icon from '@/components/common/icon_component';
import { useRouter } from "next/navigation";
import { ExclamationCircleFill } from "antd-mobile-icons";

export default async function ShopMenu(
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
                if (!profile || profile.status === ShopProfileStatus.New) {
                    Modal.show({
                        closeOnAction: true,
                        header: <ExclamationCircleFill
                            style={{
                                fontSize: 64,
                                color: 'var(--adm-color-warning)',
                            }}
                        />,
                        title: 'Hồ sơ chưa được nộp',
                        content: 'Bạn chưa nộp hồ sơ, vui lòng cập nhật và nộp hồ sơ.',
                        actions: [
                            {
                                key: 'cancel',
                                text: 'Bỏ qua',
                            },
                            {
                                key: 'confirm',
                                text: 'Cập nhật hồ sơ',
                                primary: true,
                                onClick: () => { router.push('/seller/shop/profile') }
                            },
                        ]
                    })
                } else {
                    router.push(`/seller/shop/product`);
                }
            }}>
                <div className="text-base font-semibold text-black">Quản Lý Sản Phẩm</div>
            </List.Item>
        </List>
    );
}