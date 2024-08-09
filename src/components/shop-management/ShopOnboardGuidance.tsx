import { ImageInfo, ShopProfile, ShopProfileStatus } from "@/model/market-data-model";
import { Avatar, Badge } from "@/components/common/antd_mobile_client_wrapper";
import { NavigationButton } from "../button/NavigationButton";
import { UserProfile } from "@/libs/session-options";
import { CheckCircleFill, ExclamationCircleFill, ForbidFill } from "antd-mobile-icons";
import clsx from "clsx";
import { ReactNode } from "react";

export default async function ShopOnboardGuidance(
    {
        shopProfile,
        userProfile,
        hasProductCreated = false,
    }: {
        shopProfile?: ShopProfile,
        userProfile?: UserProfile,
        hasProductCreated?: boolean,
    }
) {
    function getStepOneMessageButtonNameAndBadge(): [string, string, ReactNode] {
        let message, buttonName: string;
        let badge: ReactNode;
        switch (shopProfile?.status) {
            case ShopProfileStatus.New:
                message = 'Cập nhật thông tin shop và nộp hồ sơ để bắt đầu.';
                buttonName = 'Nộp hồ sơ';
                badge = undefined;
                break;
            case ShopProfileStatus.WaitingApproval:
                message = 'Hồ sơ đang được duyệt. Chúng tôi sẽ thông báo kết quả trong thời gian sớm nhất.';
                buttonName = 'Nộp lại hồ sơ';
                badge = <ForbidFill color="#FF8F1F" />;
                break;
            case ShopProfileStatus.Rejected:
                message = 'Hồ sơ chưa đạt yêu cầu, vui lòng nộp lại.';
                buttonName = 'Nộp lại hồ sơ';
                badge = <ExclamationCircleFill color="#FF3141" />;
                break;
            default:
                message = '';
                buttonName = '';
                badge = undefined;
                break;
        }

        return [message, buttonName, badge];
    }

    const [message, buttonName, badge] = getStepOneMessageButtonNameAndBadge();

    const shopIcon = shopProfile?.avatarImageId ? (shopProfile.avatarImageId as ImageInfo)?.url : '/icons/shop_active.svg';
    return (
        <div className="flex flex-col gap-2">
            <div className="pl-3">
                <div className="text-sm font-medium">Chào mừng <strong>{userProfile?.name}</strong> đến với Hotdi!</div>
                <div className="text-xs font-normal text-[#999999]">Bắt đầu bán hàng với các bước dưới đây</div>
            </div>
            <div className="flex flex-col p-3 bg-white gap-6 h-32 justify-center">
                <div className="flex flex-row gap-5 items-center">
                    <Badge color="white" content={badge} style={{ '--right': '100%' }}>
                        <Avatar src={shopIcon}
                            style={{
                                '--border-radius': '24px',
                                '--size': '48px',
                                border: `solid 1px #FFD8BF`,
                                padding: '4px',
                                backgroundColor: '#FFD8BF'
                            }}
                        />
                    </Badge>
                    <div className="flex flex-col gap-2 basis-5/6">
                        <div className="flex flex-row text-sm font-medium">
                            1. Cập nhật và nộp hồ sơ
                        </div>
                        <div className="text-xs font-normal text-[#999999]">
                            {message}
                        </div>
                        <div className="flex flex-row">
                            <NavigationButton className="basis-1/2" size="middle" path={`/seller/shop/profile`} color="primary">{buttonName}</NavigationButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col p-3 bg-white gap-6 h-32 justify-center">
                <div className="flex flex-row gap-5 items-center">
                    <Badge color="white" content={hasProductCreated ? <CheckCircleFill color="#00B578" /> : undefined} style={{ '--right': '100%' }}>
                        <Avatar src={'/icons/card_receive.svg'}
                            style={{
                                '--border-radius': '24px',
                                '--size': '48px',
                                border: `solid 1px #FFFFB8`,
                                padding: '4px',
                                backgroundColor: '#FFFFB8'
                            }}
                        />
                    </Badge>
                    <div className="flex flex-col gap-2 basis-5/6">
                        <div className="flex flex-row text-sm font-medium">
                            2. Thêm sản phẩm
                        </div>
                        <div className="text-xs font-normal text-[#999999]">
                            {hasProductCreated ? `Chúc mừng bạn đã thêm sản phẩm thành công` : `Tạo và quản lý sản phẩm`}
                        </div>
                        <div className={clsx('flex flex-row', {
                            ['hidden']: hasProductCreated
                        })}>
                            <NavigationButton className="basis-1/2" size="middle" path={`/seller/shop/product/create`} color="primary">Tạo sản phẩm</NavigationButton>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}